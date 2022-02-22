import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

export const UserInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  handleChange,
  errors,
  disableErrors,
  infos,
  disabled,
}) => {
  return (
    <>
      <label className="w-full">
        {label} <span className="text-red-600">*</span>
      </label>
      <input
        disabled={disabled}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={disableErrors}
        className={`text-black h-8 w-full mt-1 rounded-sm px-2 focus:outline-none focus:bg-purple-200
        ${errors && "text-red-700 bg-red-200/70"}
        ${errors || value.includes(" ") ? "mb-0" : "mb-5"}
        `}
      />
      <p className="text-sm text-red-600">{errors}</p>
      {!errors && value.includes(" ") && (
        <p className="text-sm text-green-400">{infos}</p>
      )}
    </>
  );
};

export const PasswordInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  handleChange,
  disableErrors,
  errors,
  isVisible,
  isEyeOpen,
}) => {
  return (
    <>
      <label className="w-full">
        {label} <span className="text-red-600">*</span>
      </label>
      <div
        className={`flex items-center w-full mt-1 ${errors ? "mb-0" : "mb-5"}
      `}
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={disableErrors}
          className={`text-black h-8 w-full rounded-sm px-2 focus:outline-none focus:bg-purple-200 ${
            errors && "text-red-700 bg-red-200/70"
          }
          `}
        />
        {value && (
          <button
            type="button"
            className="flex justify-center items-center w-1/12 h-8 bg-pink-400/30 hover:bg-sky-500/20 focus:outline-none focus:bg-sky-500/20 rounded-sm transition-all"
            onClick={isVisible}
          >
            {isEyeOpen}
          </button>
        )}
      </div>
      <p className="text-sm text-red-600">{errors}</p>
    </>
  );
};

export const SubmitButton = ({
  loading,
  accountInfo,
  pageInfo,
  page,
  color,
}) => {
  return (
    <>
      <button
        type="submit"
        className="flex items-center justify-center w-full h-10 p-2 rounded-sm mt-5 shadow-md bg-gradient-to-r from-sky-400/20 to-pink-400/20 hover:bg-sky-600/20 focus:outline-none focus:bg-sky-600/20 transition-all"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Valider"
        )}
      </button>
      <p className="text-sm text-gray-200 text-center mt-5">
        {accountInfo}{" "}
        <Link
          to={page}
          className={`text-base font-semibold transition-all ${color}`}
        >
          {pageInfo}
        </Link>
      </p>
    </>
  );
};
