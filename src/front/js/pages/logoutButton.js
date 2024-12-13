import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/"); // Redirect to homepage or login page
  };

  return (
    <button className="btn btn-info" onClick={handleLogout}>
      Log Out
    </button>
  );
};

