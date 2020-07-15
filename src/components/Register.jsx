import React, { useState, useContext, useEffect, useRef } from "react";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../auth/AuthContext";
import { useHistory} from 'react-router-dom';

function Register(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState(false);
const history=useHistory();
  const authContext = useContext(AuthContext);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

 

  const login = () => {
    apiHandler
      .login(user)
      .then((data) => {
        const { isAuthenticated, user } = data;
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .register(user)
      .then((data) => {
        resetForm();
        setMessage("yes");
        timerID = setTimeout(() => {
          login();
          history.push("/dashboard");
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
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
        <h3>Register an account</h3>
        <div className="form-group">
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
            className="form-control"
            placeholder="Enter user name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={user.password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        {message === "yes" ? (
          <div className="alert alert-success text-center mt-2" role="alert">
            Account successfully created !
          </div>
        ) : null}
        {message === "no" ? (
          <div className="alert alert-danger text-center mt-2" role="alert">
            We couldn't create your account... please verify your informations.
          </div>
        ) : null}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
        <p className="text-right mt-2">
          <button className="btn btn-link" onClick={props.backToLoginBtn}>
            Allready ave an account ?
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
