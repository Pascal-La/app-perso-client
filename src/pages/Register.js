import axios from "axios";
import React, { useRef, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import {
  PasswordInput,
  SubmitButton,
  UserInput,
} from "../components/FormInput";
import { useAuthDispatch } from "../context/auth";

const Register = () => {
  const dispatch = useAuthDispatch();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPictureInfos, setShowPictureInfos] = useState(false);
  const [updatePreview, setUpdatePreview] = useState(newUser.picture);

  const imageInput = useRef();

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register/",
        newUser,
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

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handlePicture = (e) => {
    let reader = new FileReader();
    let imageSize;
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    reader.onload = (e) => {
      setNewUser({ ...newUser, picture: e.target.result });
      setUpdatePreview(e.target.result);
      imageSize = new TextEncoder().encode(e.target.result).length / 1000;
      checkSize(imageSize);
    };
  };

  const checkSize = (size) => {
    if (size > 1000) {
      setErrors({
        ...errors,
        picture: "L'image est trop lourde (1 Mo maximum)",
      });
    } else setErrors({ ...errors, picture: "" });
  };

  const handleSelectPicture = () => {
    imageInput.current.click();
    setShowPictureInfos(true);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-3
    text-white bg-gradient-to-br from-sky-800 via-purple-800
    to-pink-800"
    >
      <form
        className="bg-sky-300/20 p-10 rounded-sm shadow-md w-full
        sm:w-1/2 lg:w-1/3 xl:w-1/4"
        onSubmit={submitRegisterForm}
        encType="multipart/form-data"
      >
        <h1 className="text-center text-2xl mb-5">Créer un compte</h1>

        {/* //* ============== USERNAME INPUT ============== */}

        <UserInput
          label="Pseudo"
          type="text"
          name="username"
          placeholder="Choisissez un pseudo"
          // username will be uppercased to to avoid issues
          value={newUser.username.toUpperCase()}
          handleChange={handleChange}
          disableErrors={() => setErrors({})}
          errors={errors.errors && errors.errors.username}
          infos='Les espaces seront remplacés par "_"'
        />

        {/* //* ============== EMAIL INPUT ============== */}

        <UserInput
          label="Email"
          type="email"
          name="email"
          placeholder="Entrez votre email"
          // email will be lowercased to avoid issues
          value={newUser.email.toLowerCase()}
          handleChange={handleChange}
          disableErrors={() => setErrors({})}
          errors={errors.errors && errors.errors.email}
        />

        {/* //* ============== PASSWORD INPUT ============== */}

        <PasswordInput
          label="Mot de passe"
          type={passwordVisible ? "text" : "password"}
          name="password"
          placeholder="Entrez votre mot de passe"
          value={newUser.password}
          handleChange={handleChange}
          errors={errors.errors && errors.errors.password}
          disableErrors={() => setErrors({})}
          isVisible={() => setPasswordVisible(!passwordVisible)}
          isEyeOpen={passwordVisible ? <VscEyeClosed /> : <VscEye />}
        />

        {/* //* ============== CONFIRM INPUT ============== */}

        <PasswordInput
          label="Confirmation du mot de passe"
          type={confirmVisible ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          value={newUser.confirmPassword}
          handleChange={handleChange}
          errors={errors.errors && errors.errors.confirmPassword}
          disableErrors={() => setErrors({})}
          isVisible={() => setConfirmVisible(!confirmVisible)}
          isEyeOpen={confirmVisible ? <VscEyeClosed /> : <VscEye />}
        />

        {/* //* ============== PICTURE INPUT ============== */}

        <label className="w-full">Photo de profil</label>
        <p className="text-sm text-red-600 mb-0">{errors.picture}</p>

        {showPictureInfos && !errors.picture && (
          <p className="text-sm text-green-400 mb-0">
            png, jpg, jpeg / 1 Mo maximum
          </p>
        )}
        <input
          ref={imageInput}
          hidden
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handlePicture}
        />
        <div className="flex justify-center">
          <img
            src={updatePreview}
            alt="profil"
            onClick={handleSelectPicture}
            className={`w-32 h-32 rounded-full object-cover mb-5
            ${showPictureInfos ? "mt-3" : "mt-8"} `}
          />
        </div>

        {/* //* ============== SUBMIT BUTTON ============== */}

        <SubmitButton
          loading={loading}
          accountInfo="Vous avez déjà un compte ?"
          pageInfo="Se connecter"
          page="/login"
          color="text-sky-200 hover:text-pink-200 focus:outline-none
          focus:text-pink-200"
        />
      </form>
    </div>
  );
};

export default Register;
