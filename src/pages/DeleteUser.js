import axios from "axios";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import { PasswordInput, UserInput } from "../components/FormInput";
import { TransparentModal } from "../components/Modals";
import Navbar from "../components/Navbar";
import { useAuthDispatch, useAuthState } from "../context/auth";

const DeleteUser = () => {
  const dispatch = useAuthDispatch();
  const { user, token } = useAuthState();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/confirmDelete/",
        { email, username, password, token },
        config
      );

      dispatch({ type: "LOGIN", payload: data });
      setLoading(false);
      setShowDeleteModal(true);
    } catch (error) {
      setLoading(false);
      setErrors(JSON.parse(error.request.response));
    }
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/users/delete/${user._id}`,
        config
      );

      dispatch({ type: "LOGOUT" });
      setLoading(false);
      setShowDeleteModal(false);
      alert("Compte supprimé");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const ConfirmationModal = () => {
    return (
      <TransparentModal onClick={() => setShowDeleteModal(false)}>
        <div className="flex flex-wrap items-center justify-center m-3 p-8 w-full md:w-8/12 lg:w-6/12 h-2/5 bg-gradient-to-br from-sky-600/90 to-purple-600 rounded-md shadow-lg">
          <div className="w-full text-center ">
            <h1 className="text-2xl font-bold mb-6">
              Supprimer votre compte ?
            </h1>
            <p>Cette opération est irréversible!</p>
          </div>

          <button
            className="w-36 p-3 m-1 rounded-sm shadow-md bg-red-600/80 hover:bg-red-600 focus:outline-none transition-all"
            onClick={confirmDelete}
          >
            Oui, je confirme
          </button>
          <button
            className="w-36 p-3 m-1 rounded-sm shadow-md bg-sky-600/80 hover:bg-sky-600 focus:outline-none transition-all"
            onClick={() => setShowDeleteModal(false)}
          >
            Non, j'annule
          </button>
        </div>
      </TransparentModal>
    );
  };

  return (
    <>
      {showDeleteModal && <ConfirmationModal />}
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-3 text-white bg-gradient-to-br from-sky-800 via-purple-800 to-pink-800">
        <form
          className="bg-sky-300/20 p-10 rounded-sm shadow-md w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          onSubmit={submitLoginForm}
        >
          <h1 className="text-center text-2xl mb-5">
            Suppression de votre compte
          </h1>

          {/* //* ============== EMAIL INPUT ============== */}

          <UserInput
            label="Email"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            // email will be lowercased to avoid issues
            value={email.toLowerCase()}
            handleChange={(e) => setEmail(e.target.value.toLowerCase())}
            disableErrors={() => setErrors({})}
            errors={errors.errors && errors.errors.email}
          />

          {/* //* ============== USERNAME INPUT ============== */}

          <UserInput
            label="Pseudo"
            type="text"
            name="username"
            placeholder="Choisissez un pseudo"
            // username will be uppercased to to avoid issues
            value={username.toUpperCase()}
            handleChange={(e) => setUsername(e.target.value.toUpperCase())}
            disableErrors={() => setErrors({})}
            errors={errors.errors && errors.errors.username}
            infos='Les espaces seront remplacés par "_"'
          />

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

          {/* //* ============== SUBMIT BUTTON ============== */}

          <button
            type="submit"
            className={`flex items-center justify-center w-full h-10 p-2 rounded-sm shadow-md bg-red-600/80 hover:bg-red-600 focus:outline-none focus:bg-red-600 transition-all
            ${errors.errors && errors.errors.password ? "mt-5" : "mt-10"}
            `}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Supprimer"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default DeleteUser;
