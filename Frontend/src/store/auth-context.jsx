import { createContext, useContext, useReducer } from "react";

/* ---------- INITIAL STATE ---------- */
const storedUser = localStorage.getItem("user");
const storedRoles = localStorage.getItem("roles");

const initialState = {
  token: localStorage.getItem("token"),
  user: storedUser ? JSON.parse(storedUser) : null,
  roles: storedRoles ? JSON.parse(storedRoles) : [],
};

/* ---------- REDUCER ---------- */
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      const { user, roles, token } = action.payload;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("roles", JSON.stringify(roles));

      return { token, user, roles };
    }

    case "LOGOUT": {
      localStorage.clear();
      return { token: null, user: null, roles: [] };
    }

    default:
      return state;
  }
}

/* ---------- CONTEXT ---------- */
const AuthContext = createContext();

/* ---------- PROVIDER ---------- */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (loginResponse) => {
    dispatch({
      type: "LOGIN",
      payload: {
        token: loginResponse.token,
        user: loginResponse.name,
        roles: loginResponse.roles,
      },
    });
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  const isAuthenticated = !!state.token;

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        roles: state.roles,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ---------- HOOK ---------- */
export const useAuth = () => useContext(AuthContext);
