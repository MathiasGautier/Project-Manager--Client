import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../auth/AuthContext";

function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(false);
  let timerID = useRef(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push("/");
    }
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .login(user)
      .then((data) => {
        setMessage("yes");
        const { isAuthenticated, user } = data;
        resetForm();
        timerID = setTimeout(() => {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          props.history.push("/");
        }, 2000);
      })
      .catch((error) => {
        setMessage("no");
        resetForm();
        timerID = setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container-fluid mt-5 ">
        <form onSubmit={onSubmit}>
          <h3>Please sign in</h3>
          <label htmlFor="username" className="sr-only">
            Username :
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
            className="form-control"
            placeholder="Enter user name"
          />
          <label htmlFor="password" className="sr-only">
            Password :
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter password"
          />
          <button
            className="btn btn-lg btn-primary btn-block mt-4"
            type="submit"
          >
            Log in
          </button>
        </form>
        {message === "yes" ? (
          <div className="alert alert-success text-center" role="alert">
            Welcome {authContext.user.username} !
          </div>
        ) : null}
        {message === "no" ? (
          <div className="alert alert-danger text-center" role="alert">
            Wrong username or password. Please try again or register a account.
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
