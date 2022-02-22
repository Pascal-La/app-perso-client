import { Link } from "react-router-dom";
import { useAuthState } from "../context/auth";

import Navbar from "../components/Navbar";

const Account = () => {
  const { user, picture } = useAuthState();

  const date = new Date(user.createdAt).toLocaleDateString();

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen pt-14 text-white bg-gradient-to-br from-sky-800 via-purple-800 to-pink-800">
        <div className="w-full my-16 bg-sky-300/20 p-10 rounded-sm shadow-md md:w-10/12 lg:w-2/3 xl:w-1/2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={picture}
                alt="profil"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div className="px-5">
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>Compte créé le : {date}</p>
              </div>
            </div>
            <Link
              to="/account/update"
              className="p-3 rounded-sm bg-blue-500 hover:bg-blue-400 transition-all"
            >
              Modifier
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
