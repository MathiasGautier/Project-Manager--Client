import React, { useContext } from "react";
import apiHandler from "../services/apiHandler";
import AuthContext from "../auth/UserContext";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  


  const onClickLogoutHandled = () => {
    apiHandler.logout().then((data) => {
      console.log(data);
    });
  };

  const history = useHistory();
  const redirect = () => {
    history.push("/dashboard");
    props.toggleTasks === false && props.handleCurrentProject();
  };

  return (
    <div className="container-fluid navBar">
      <nav className="navbar navbar-expand-sm navbar-light navBar row bg-nav">
        <div className="d-flex" onClick={redirect}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 16 16"
            className="bi bi-check-all ml-sm-3 mr-3 mr-sm-0 mt-2 navbarLogo"
            fill="rgb(0, 174, 255)"
          >
            <path
              fillRule="evenodd"
              d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
            />
          </svg>
          <div
            className=" text-secondary display-4 title align-self-center cursor navBarHeader"
            href="#"
          >
            Manager
          </div>
        </div>

        <button
          className="navbar-toggler toggleNav mt-3 ml-3 ml-sm-0 mb-1 mb-sm-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-autor navInfos d-flex justify-content-between ">
            <div></div>
            <div className="d-md-flex d-sm-flex flex-column flex-md-row btnNav">
              <li className="nav-item">
                <a className=" nav-link disabled userName" href=" ">
                  Connected as {props.authContext && props.authContext.isLoggedIn && props.authContext.user.username}
                </a>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-danger logout"
                  exact
                  to="/"
                  onClick={onClickLogoutHandled}
                >
                  Logout
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
