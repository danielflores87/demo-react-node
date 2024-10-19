import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import LoginPage from "./pages/login.page";
import { AppContextProvider } from "./app.context";


function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
