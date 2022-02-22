import axios from "axios";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import {
  PasswordInput,
  SubmitButton,
  UserInput,
} from "../components/FormInput";
import { useAuthDispatch } from "../context/auth";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useAuthDispatch();

  // Switch to connect with email or username
  const handleSwitchInput = () => {
    setLoginEmail(!loginEmail);
    setEmail("");
    setUsername("");
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login/",
        { email, username, password },
        config
      );

      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      window.location.reload();
      window.location.href("/");
    } catch (error) {
      setLoading(false);
      setErrors(JSON.parse(error.request.response));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-3 text-white bg-gradient-to-br from-sky-800 via-purple-800 to-pink-800">
      <form
        className="bg-sky-300/20 p-10 rounded-sm shadow-md w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        onSubmit={submitLoginForm}
      >
        <h1 className="text-center text-2xl">Connexion</h1>

        <p className="text-xs text-center text-gray-200 mb-5">
          avec{" "}
          <span
            className="text-sky-200 text-base font-semibold cursor-pointer hover:text-pink-200 transition-all"
            onClick={handleSwitchInput}
          >
            {loginEmail ? "pseudo " : "email "}
          </span>
          ?
        </p>

        {/* //* ============== EMAIL/USERNAME INPUT ============== */}

        {loginEmail ? (
          <UserInput
            label="Email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            value={email}
            handleChange={(e) => setEmail(e.target.value.toLowerCase())}
            errors={errors.errors && errors.errors.email}
            disableErrors={() => setErrors({})}
          />
        ) : (
          <UserInput
            label="Pseudo"
            type="text"
            name="username"
            placeholder="Entrez votre pseudo"
            value={username}
            handleChange={(e) => setUsername(e.target.value.toUpperCase())}
            errors={errors.errors && errors.errors.username}
            disableErrors={() => setErrors({})}
          />
        )}

        {/* //* ============== PASSWORD INPUT ============== */}

        <PasswordInput
          label="Mot de passe"
          type={passwordVisible ? "text" : "password"}
          name="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          errors={errors.errors && errors.errors.password}
          disableErrors={() => setErrors({})}
          isVisible={() => setPasswordVisible(!passwordVisible)}
          isEyeOpen={passwordVisible ? <VscEyeClosed /> : <VscEye />}
        />

        <p
          className={errors.errors && errors.errors.password ? "mb-5" : "mb-10"}
        />

        {/* //* ============== SUBMIT BUTTON ============== */}

        <SubmitButton
          loading={loading}
          accountInfo="Vous n'avez pas de compte ?"
          pageInfo="S'inscrire"
          page="/register"
          color="text-sky-200 hover:text-pink-200 focus:outline-none focus:text-pink-200"
        />
      </form>
    </div>
  );
};

export default Login;
