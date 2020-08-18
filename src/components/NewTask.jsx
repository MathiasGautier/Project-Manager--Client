import React, { useState, useRef, useEffect } from "react";
import apiHandler from "../services/apiHandler";

function New_task(props) {
  const [task, setTask] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState(false);

  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setTask({ name: "", description: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    apiHandler
      .createTodo(task)
      .then((data) => {
        resetForm();
        setMessage("yes");
        timerID = setTimeout(() => {
          props.handleCurrentProject();
          // history.push("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        setMessage("no");
        timerID = setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log(error);
      });
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={onSubmit}>
        <h3>New Project</h3>

        <div className="form-group">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={onChange}
            className="form-control"
            placeholder="Enter a title for your project"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
            type="text"
            name="description"
            value={task.description}
            onChange={onChange}
            className="form-control"
            placeholder="Enter a description for your project"
          />
        </div>

        <button className="btn btn-primary btn-lg btn-block mt-4" type="submit">
          Create the project
        </button>

        <button
          className="btn btn-danger btn-lg btn-block mt-4"
          type="submit"
          onClick={() => props.handleCurrentProject()}
        >
          Cancel
        </button>
      </form>
      {message === "yes" ? (
        <div className="mt-2 alert alert-success text-center" role="alert">
          Project successfully created !
        </div>
      ) : null}
      {message === "no" ? (
        <div className="mt-2 alert alert-danger text-center" role="alert">
          Please verify the title and description fields
        </div>
      ) : null}
    </div>
  );
}

export default New_task;
