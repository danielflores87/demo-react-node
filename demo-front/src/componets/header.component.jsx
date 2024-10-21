import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../app.context";
import { ImHome } from "react-icons/im";

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
    <div className="text-gray-50 bg-gray-700 p-4 flex justify-between">
      <div
        className="font-bold hover:cursor-pointer block px-4  text-2xl hover:text-blue-500"
        onClick={() => navigate("/")}
      >
        <ImHome />
      </div>
      <label className="text-base font-bold">
        Bienvenido, {authorization.name}
      </label>
    </div>
  );
}
