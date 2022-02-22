import { createContext, useContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

let user = null;

const token = localStorage.getItem("userInfo");
if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) {
    localStorage.removeItem("userInfo");
  } else {
    user = decodedToken;
  }
}

const picture = localStorage.getItem("profilePicture");

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userInfo", action.payload.token);
      localStorage.setItem("profilePicture", action.payload.picture);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("userInfo");
      localStorage.removeItem("profilePicture");
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Action type inconnu: ${action.type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user, token, picture });
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
