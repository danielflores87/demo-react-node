import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import { AppContextProvider } from "./app.context";
import CreateEmployeePage from "./pages/employee/create-employee.page";
import CreateAplicationPage from "./pages/aplication/create-aplication.page";


function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/employees/create" element={<CreateEmployeePage />} />

          <Route path="/aplications/create" element={<CreateAplicationPage />} />

          <Route path="/**" element={<div> 404 </div>} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
