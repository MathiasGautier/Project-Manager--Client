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
    <div className="container-fluid navBar">
      <nav class="navbar navbar-expand-lg navbar-light navBar row bg-nav">
        <svg
          width="80"
          height="80"
          viewBox="0 0 16 16"
          className="bi bi-check-all ml-3"
          fill="rgb(0, 174, 255)"
        >
          <path
            fillRule="evenodd"
            d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
          />
        </svg>
        <div
          class="align-self-center text-secondary display-4 title mb-2"
          href="#"
        >
          Manager
        </div>
        <button
          class="navbar-toggler toggleNav"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <div className="navItems ml-4 mt-2">
              <div className="d-sm-inline-flex ">
                <li className="nav-item mr-3">
                  <NavLink className="flex-sm-fill nav-link" to="/new-task">
                    New Project
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="flex-sm-fill nav-link" to="/tasks">
                    Current Projects
                  </NavLink>
                </li>
              </div>
              <div className="d-sm-inline-flex test">
                <li class="nav-item">
                  <a className="flex-sm-fill nav-link disabled" href=" ">
                    Connected as {authContext.user.username}
                  </a>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-danger"
                    exact
                    to="/"
                    onClick={onClickLogoutHandled}
                  >
                    Logout
                  </NavLink>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </div>

    // <>
    /* <NavLink className="flex-sm-fill text-sm-center nav-link" exact to="/">
          Home
        </NavLink>

          <>
            <NavLink
              className="flex-sm-fill text-sm-center nav-link"
              to="/new-task"
            >
              New Task
            </NavLink>
            <NavLink
              className="flex-sm-fill text-sm-center nav-link"
              to="/tasks"
            >
              Current Tasks
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
      </nav>
      {message === true ? (
        <div className="alert alert-success text-center mt-4" role="alert">
          See you next time !
        </div>
      ) : null} 
    </> */
  );
}

export default Navbar;
