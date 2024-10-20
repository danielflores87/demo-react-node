import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import { AppContextProvider } from "./app.context";
import CreateEmployeePage from "./pages/employee/create-employee.page";
import CreateApplicationPage from "./pages/application/create-application.page";
import SearchEmployeePage from "./pages/employee/search-employee.page";
import { HeaderComponent } from "./componets/header.component";
import SearchApplicationPage from "./pages/application/search-application.page";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <HeaderComponent />

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/employees/create" element={<CreateEmployeePage />} />
          <Route path="/employees" element={<SearchEmployeePage />} />

          <Route
            path="/applications/create"
            element={<CreateApplicationPage />}
          />

          <Route path="/applications" element={<SearchApplicationPage />} />

          <Route path="/*" element={<HomePage />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
