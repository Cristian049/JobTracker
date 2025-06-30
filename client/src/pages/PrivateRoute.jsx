import { Navigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
function PrivateRoute({ children, isLoggedIn, isUserLoading }) {
  if (isUserLoading) return <Loader />;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
