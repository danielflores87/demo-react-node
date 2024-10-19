import { useState, createContext, useMemo } from "react";

export const AppContext = createContext({
  authorization: { token: "" },
  setAuthorization: () => {},
  validateActionAccess: () => false,
});

export function AppContextProvider({ children }) {
  // States
  const [authorization, setAuthorization] = useState({ token: "" });

  // Metodo que verifica si el usuario posee permisos sobre un accion
  function validateActionAccess(indicator) {
    return true; // AKIVE authorization.allowedActions?.findIndex((i) => i === indicator) >= 0;
  }

  const values = useMemo(() => {
    return {
      authorization,
      setAuthorization,
      validateActionAccess,
    };
  }, [authorization]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
