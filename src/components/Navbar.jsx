import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  const [message, setMessage] = useState(false);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onClickLogoutHandled = () => {
    apiHandler.logout().then((data) => {
      setUser(data.user);
      setIsAuthenticated(false);
      setMessage(true);
      timerID = setTimeout(() => {
        setMessage(false);
      }, 3000);
    });
  };

  return (
    <>
      <nav className="nav nav-pills flex-column flex-sm-row">
        <NavLink className="flex-sm-fill text-sm-center nav-link" exact to="/">
          Home
        </NavLink>

        {!isAuthenticated && (
          <>
            <NavLink
              className="flex-sm-fill text-sm-center nav-link"
              exact
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="flex-sm-fill text-sm-center nav-link"
              exact
              to="/register"
            >
              Register
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <NavLink
              className="flex-sm-fill text-sm-center nav-link"
              to="/new-task"
            >
              New Task
            </NavLink>
            <a
              className="flex-sm-fill text-sm-center nav-link disabled"
              href=" "
            >
              Connected as {authContext.user.username}
            </a>
            <NavLink
              className="btn btn-danger nav-item nav-lin"
              exact
              to="/"
              onClick={onClickLogoutHandled}
            >
              Logout
            </NavLink>
          </>
        )}
      </nav>
      {message === true ? (
        <div className="alert alert-success text-center mt-4" role="alert">
          See you next time !
        </div>
      ) : null}
    </>
  );
}

export default Navbar;
