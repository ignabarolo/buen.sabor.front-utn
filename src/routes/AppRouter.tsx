import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Login } from "../components/Screens/Login/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import ResponsiveDrawer from "../components/Common/ResponsiveDrawer";

export const AppRouter = () => {
  //const isLogged = useAppSelector(state => state.auth.isLogged);
  const isLogged = true;
  return (
    <>
      <Router>
        {isLogged ? <ResponsiveDrawer /> : <></>}
        <Routes>
          {isLogged ? (
            <Route path="/*" element={<ProtectedRoutes />} />
          ) : (
            <Route path="/*" element={<Navigate to={"/login"} />} />
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};
