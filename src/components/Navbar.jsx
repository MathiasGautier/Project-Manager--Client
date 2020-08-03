import React, { useContext, } from "react";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const authContext = useContext(AuthContext);
  // const { isAuthenticated, setIsAuthenticated, setUser } = useContext(
  //   AuthContext
  // );
  // const [message, setMessage] = useState(false);
  // let timerID = useRef(null);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timerID);
  //   };
  // }, []);

  const onClickLogoutHandled = () => {
    apiHandler
    .logout()
    .then((data) => {
      console.log(data)
    });
  };


  return (
    <div className="container-fluid navBar">
      <nav className="navbar navbar-expand-lg navbar-light navBar row bg-nav">
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
          className="align-self-center text-secondary display-4 title mb-2"
          href="#"
        >
          Manager
        </div>
        <button
          className="navbar-toggler toggleNav"
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
          <ul className="navbar-nav mr-auto">
            <div className="navItems ml-4 mt-2">
              <div className="d-sm-inline-flex ">
                <li className="nav-item">
                  <div 
                  className={`flex-sm-fill nav-link cursor ${props.toggleTasks ? `active` : null}`} 
                  onClick={props.handleCurrentProject}>
                    Current Projects
                  </div>
                </li>
                <li className="nav-item mr-3">
                  <div
                  className= {`flex-sm-fill nav-link cursor ${props.toggleTasks===false ? `active` : null}`}
                  onClick={props.handleNewProject}>
                    New Project
                  </div>
                </li>
              </div>
              <div className="d-sm-inline-flex test">
                <li className="nav-item">
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

  );
}

export default Navbar;
