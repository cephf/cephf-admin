import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/auth/LogIn";
import EmailConfirm from "./pages/auth/EmailConfirm";
import ResetPassword from "./pages/auth/ResetPassword";
import DashboardLayout from "./components/layouts/admin-layout/Index";
import UsersPage from "./pages/admin/users/Index";
import ContentManagement from "./pages/admin/content-management/Index";
import EditBlog from "./pages/admin/content-management/create/new-blog/Index";

function App() {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="login" element={<LogIn />} />
        <Route path="email-confirm" element={<EmailConfirm />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<DashboardLayout />}>
          <Route path="/" element={<UsersPage />} />
          <Route
            path="/content-management"
            element={<ContentManagement />}
          />
           <Route
            path="/content-management/edit-blog"
            element={<EditBlog />}
          />
        </Route>
    </Routes>
  );
}

export default App;