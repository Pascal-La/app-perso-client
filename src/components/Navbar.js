import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../context/auth";
import { TransparentModal } from "./Modals";

const Navbar = () => {
  const dispatch = useAuthDispatch();
  const { user, picture } = useAuthState();

  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  const UserInfoModal = () => {
    return (
      <div
        className="bg-gray-800/70 absolute top-14 -right-6
      text-center shadow-md z-20"
      >
        {/* //* Username */}
        <p
          className="py-3 px-8 border-b border-gray-500/70
        hover:bg-cyan-500/30 transition-all"
        >
          {user?.username}
        </p>

        {/* //* Email */}
        <p
          className="py-3 px-8 border-b border-gray-500/70
        hover:bg-sky-500/30 transition-all"
        >
          {user?.email}
        </p>

        {/* //* Tasks */}
        <Link to="/tasks">
          <p
            className="py-3 px-8 border-b border-gray-500/70
          hover:bg-purple-500/30 transition-all"
          >
            Mes tâches
          </p>
        </Link>

        {/* //* Account */}
        <Link to="/account">
          <p
            className="py-3 px-8 border-b border-gray-500/70
          hover:bg-pink-500/30 transition-all"
          >
            Mon compte
          </p>
        </Link>

        {/* //* Logout */}
        <p
          className="py-3 px-8 cursor-pointer hover:bg-red-500/30
          transition-all"
          onClick={logout}
        >
          Déconnexion
        </p>
      </div>
    );
  };

  return (
    <>
      {menuOpen && <TransparentModal onClick={() => setMenuOpen(false)} />}
      <nav
        className="flex items-center justify-between w-full h-20 px-9
      bg-gray-900/80 text-white shadow-md fixed"
      >
        {/* //* Home */}
        <Link to="/">
          <p
            className="flex items-center justify-center border-2
          font-semibold border-sky-700 text-sky-700 rounded-full p-3
          text-lg w-12 h-12 hover:text-gray-900/80 hover:bg-sky-700
          transition-all"
          >
            PL
          </p>
        </Link>
        <div
          className="flex items-center relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen && <UserInfoModal />}

          {/* //* Picture */}
          {picture && (
            <img
              className={`w-12 h-12 mx-3 rounded-full object-cover
              hover:animate-pulse ${menuOpen && "animate-pulse"}`}
              src={picture}
              alt="profil"
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
