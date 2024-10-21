import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AppContextProvider } from "./app.context";
import { HeaderComponent } from "./componets/header.component";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";

const CreateEmployeePage = lazy(() =>
  import("./pages/employee/create-employee.page")
);
const SearchEmployeePage = lazy(() =>
  import("./pages/employee/search-employee.page")
);
const CreateApplicationPage = lazy(() =>
  import("./pages/application/create-application.page")
);
const SearchApplicationPage = lazy(() =>
  import("./pages/application/search-application.page")
);

function App() {
  return (
    <AppContextProvider>
      <Router>
        <HeaderComponent />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/employees/create" element={<CreateEmployeePage />} />
            <Route path="/employees" element={<SearchEmployeePage />} />
            <Route path="/applications/create" element={<CreateApplicationPage />}/>
            <Route path="/applications" element={<SearchApplicationPage />} />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </Router>
    </AppContextProvider>
  );
}

export default App;
