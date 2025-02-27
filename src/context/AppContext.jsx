import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export function AppProvider({ children }) {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);

  useEffect(
    function () {
      setToken(localStorage.getItem("token") || null);
    },
    [token]
  );

  useEffect(
    function () {
      if (!localStorage.getItem("token")) {
        navigate("/");
      }
    },
    [token, navigate]
  );

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
