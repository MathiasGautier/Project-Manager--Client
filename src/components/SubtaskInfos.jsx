import React, { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";

function SubtaskInfos(props) {
    const [status, setStatus]=useState(undefined);


  
  const id = props.taskClicked._id;
useEffect(()=>{
    
    apiHandler
    .getOneSubTodo(id)
    .then((data)=>{
        setStatus(data.status)
    })
    .catch((error)=>{console.log(error)})
})
  

  const setToDo = () => {
    const subTodo = { status: "To Do" };
    apiHandler
      .updateSubTodo(subTodo, id)
      .then((data)=>{
          apiHandler
          .getSubtodos()
          .then((data)=>{
              console.log(data)
              props.setAllSubTodos(data)
            })
          .catch((error)=>{console.log(error)})
        })
      .catch((error) => console.log(error));
  };

  const setInProgress = () => {
    const subTodo = { status: "In Progress" };
    apiHandler
      .updateSubTodo(subTodo, id)
      .then((res) => {
        apiHandler
        .getSubtodos()
        .then((data)=>{
            console.log(data)
            props.setAllSubTodos(data)
          })
        .catch((error)=>{console.log(error)})
      })
      .catch((error) => console.log(error));
  };

  const setDone = () => {
    const subTodo = { status: "Done" };
    apiHandler
      .updateSubTodo(subTodo, id)
      .then((res) => {
        apiHandler
        .getSubtodos()
        .then((data)=>{
            console.log(data)
            props.setAllSubTodos(data)
          })
        .catch((error)=>{console.log(error)})
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => props.setToggleMoreInfos(false)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <h2>Title :{props.taskClicked.name}</h2>
      <h3>Description:{props.taskClicked.description}</h3>
      <h3>Current status: {status}</h3>

      <div className="d-flex">
        <button
          onClick={setToDo}
          className={
            status === "To Do"
              ? "btn btn-success statusButton"
              : "btn btn-secondary"
          }
        >
          To do
        </button>
        <button
          onClick={setInProgress}
          className={
            status === "In Progress"
              ? "btn btn-success statusButton"
              : "btn btn-secondary"
          }
        >
          In progress
        </button>
        <button
          onClick={setDone}
          className={
            status === "Done"
              ? "btn btn-success statusButton"
              : "btn btn-secondary"
          }
        >
          Done
        </button>
      </div>

      <div>
        Users:
        {props.taskClicked.workers &&
          props.taskClicked.workers.map((x, i) => (
            <div key={i}>{x.username}</div>
          ))}
      </div>
    </>
  );
}

export default SubtaskInfos;
