import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import EmailConfirm from "./pages/auth/EmailConfirm";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<LogIn />} />
        <Route path="email-confirm" element={<EmailConfirm />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
