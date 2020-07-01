import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function Landing(props) {
  const [registerForm, setRegisterForm] = useState(false);
  const createAccountBtn = (e) => {
    e.preventDefault();
    setRegisterForm(true);
  };
  const backToLoginBtn = (e) => {
    e.preventDefault();
    setRegisterForm(false);
  }
  return (
    <div className="container-fluid">
      
      <div className="container-fluid">
        <div className="d-flex justify-content-center header-home mt-2">
          <svg
            width="100"
            height="100"
            viewBox="0 0 16 16"
            className="bi bi-check-all"
            fill="rgb(0, 174, 255)"
          >
            <path
              fillRule="evenodd"
              d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
            />
          </svg>
          <h1 className="align-self-center text-secondary display-4">Manager</h1>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <img
              src="/images/team_work_monochromatic.svg"
              className="img-fluid"
              alt="home"
            />
          </div>
          <div className="col-sm mt-5">
            {registerForm === true ? (
              <Register backToLoginBtn={backToLoginBtn} />
            ) : (
              <Login createAccountBtn={createAccountBtn} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
