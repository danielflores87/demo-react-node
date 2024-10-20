import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../app.context";

export function HeaderComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authorization } = useContext(AppContext);

  useEffect(() => {
    if (
      (!authorization.token || authorization.token.length == 0) &&
      location.pathname !== "/login"
    )
      navigate("/login");
  }, [authorization]);

  if (location.pathname === "/login") {
    return null;
  }
  return (
    <div className="text-gray-50 bg-gray-700 p-4 flex flex-row justify-between ">
      <div onClick={() => navigate("/")}>
        <label className="text-lg font-bold hover:cursor-pointer">Home</label>
      </div>
      <label className="text-base font-bold">
        Bienvenido, {authorization.name}
      </label>
    </div>
  );
}
