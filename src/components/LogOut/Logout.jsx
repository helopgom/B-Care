import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_LOGOUT } from "../../config/urls";

const Logout = ({ onLogoutSuccess, onLogoutError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.warn("No token found. Proceeding with logout anyway.");
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          onLogoutSuccess();
          navigate("/", {
            state: { logoutMessage: "Has cerrado sesión exitosamente." },
          });
          return;
        }

        await axios.post(USER_LOGOUT, null, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        onLogoutSuccess();
        navigate("/", {
          state: { logoutMessage: "Has cerrado sesión exitosamente." },
        });
      } catch (err) {
        console.error("Logout error:", err);
        onLogoutError(
          "Ha sido imposible cerrar la sesión. Inténtelo más tarde."
        );
        navigate("/myaccount");
      }
    };

    logout();
  }, [navigate, onLogoutSuccess, onLogoutError]);

  return null;
};

export default Logout;
