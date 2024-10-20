import { FaRegUser } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-80">
      <div
        onClick={() => navigate("/employees")}
        className="hover:cursor-pointer hover:bg-gray-800 m-6 text-white bg-gray-700 block content-center text-center w-32 h-40 shadow-inner sm:rounded-lg sm:shadow "
      >
        <div className="text-2xl flex items-center justify-center">
          <FaRegUser />
        </div>
        <div className="text-lg">Empleados </div>
      </div>

      <div
        onClick={() => navigate("/applications")}
        className="hover:cursor-pointer hover:bg-gray-800 m-6 text-white bg-gray-700 block content-center text-center w-32 h-40 shadow-inner sm:rounded-lg sm:shadow "
      >
        <div className="text-2xl flex items-center justify-center">
          <GrDocumentUser />
        </div>
        <div className="text-lg">Solicitudes </div>
      </div>
    </div>
  );
}

export default HomePage;
