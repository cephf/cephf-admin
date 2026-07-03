import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import EmailConfirm from "./pages/auth/EmailConfirm";
import ResetPassword from "./pages/auth/ResetPassword";
import { TooltipProvider } from "./components/ui/tooltip";
import DashboardLayout from "./components/layouts/admin-layout/Index";
import UsersPage from "./pages/admin/users/Index";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<LogIn />} />
        <Route path="email-confirm" element={<EmailConfirm />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      <Route
        path="/"
        element={
          <TooltipProvider>
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          </TooltipProvider>
        }
      />
    </Routes>
  );
}

export default App;