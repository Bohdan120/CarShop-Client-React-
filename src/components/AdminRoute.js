import { Navigate } from "react-router-dom";
import { accountsService } from "../services/accounts";

const AdminRoute = ({ children }) => {
  const role = accountsService.getRole();

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
