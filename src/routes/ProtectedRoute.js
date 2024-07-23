import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Unauthorized from "../pages/Unauthorized";
import CannotRead from "../pages/CannotRead";
import { useEffect } from "react";
import { addRedirectURItoQueryString } from "../helpers/HELPERS";
const PROJECT_TYPE = process.env.REACT_APP_PROJECT_TYPE;

export const ProtectedRoute = ({ id, element }) => {
  const {
    loggedIn,
    pages = { ALLOWED_PAGES: [], PAGES: {} },
    SETCURRENTPAGE,
  } = useAuth();
  useEffect(() => {
    if (PROJECT_TYPE === "locale" && !localStorage.getItem("jwt")) {
      localStorage.setItem("jwt", "temp");
    }
    SETCURRENTPAGE(id);
  }, [SETCURRENTPAGE, id]);
  if (!loggedIn || !localStorage.getItem("jwt")) {
    return <Navigate to={`/login${addRedirectURItoQueryString()}`} replace />;
  } else if (/*id !== "profile" && */ !pages.ALLOWED_PAGES.includes(id)) {
    return <Unauthorized />;
  } else if (!pages.PAGES[id].read) {
    return <CannotRead />;
  } else return element;
};
