import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove user token/session from localStorage (or cookies)
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
