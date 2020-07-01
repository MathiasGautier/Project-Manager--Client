import React, { useState, useRef, useEffect } from "react";
import apiHandler from "../services/apiHandler";

function New_task(props) {
  const [task, setTask] = useState({
    name: '',
    description: '',
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

  const onSubmit =(e)=>{
      e.preventDefault();
    //   if ((task.name.length > 1) && (task.description.length >1))
      apiHandler
        .createTodo(task)
        .then((data)=>{
            resetForm();
            setMessage("yes");
            timerID = setTimeout(() => {
             props.history.push("/");
        }, 2000);
      })
      .catch((error)=>{
          setMessage("no");
          timerID = setTimeout(() => {
          setMessage(false);
        }, 2000);
        console.log(error);
      });     
  }

  return (
    <div className="container-fluid mt-5 ">
      <form onSubmit={onSubmit}>
        <h3>New Project</h3>
        <label htmlFor="title" className="sr-only">
          Title :
        </label>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={onChange}
          className="form-control"
          placeholder="Enter a title"
        />
        <label htmlFor="password" className="sr-only">
          Description :
        </label>
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={onChange}
          className="form-control"
          placeholder="Enter a description"
        />
        <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">
          Create the project
        </button>
      </form>
      {message === "yes" ? (
        <div className="alert alert-success text-center" role="alert">
          Project successfully created !
        </div>
      ) : null}
      {message === "no" ? (
        <div className="alert alert-danger text-center" role="alert">
          Please verify the title and description fields
        </div>
      ) : null}
    </div>
  );
}

export default New_task;
