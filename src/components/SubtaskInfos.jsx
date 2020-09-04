import React, { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";
import RemoveTaskModal from "./RemoveTaskModal";
import EditTaskModal from "./EditTaskModal";

function SubtaskInfos(props) {
  const [status, setStatus] = useState(undefined);
  const [taskClicked, setTaskClicked]=useState(undefined)
  
  const modified=((e)=>{
    setTaskClicked(e)
  })

  useEffect(()=>{
    setTaskClicked(props.taskClicked)
  },[props.taskClicked])

  const id = taskClicked && taskClicked._id;

  
  useEffect(() => {
    id &&
    apiHandler
      .getOneSubTodo(id)
      .then((data) => {
        setStatus(data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  },[id]);



  const setToDo = () => {
    const subTodo = { status: "To Do" };
    apiHandler
      .updateSubTodo(subTodo, id)
      .then((data) => {
        apiHandler
          .getSubtodos()
          .then((data) => {
            props.setAllSubTodos(data);
            setStatus('To Do')
          })
          .catch((error) => {
            console.log(error);
          });
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
          .then((data) => {
            props.setAllSubTodos(data);
            setStatus('In Progress')
          })
          .catch((error) => {
            console.log(error);
          });
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
          .then((data) => {
            props.setAllSubTodos(data);
            setStatus('Done')
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <RemoveTaskModal
        handleTaskRemove={props.handleTaskRemove}
        taskClicked={props.taskClicked}
      />
      <EditTaskModal
        setAllSubTodos={props.setAllSubTodos}
        task={props.taskClicked}
        users={props.users}
        modified={modified}
      />
      <div className="d-flex justify-content-between">
        <h2 className="display-1 mb-3 mt-2 pr-3 text-left">
          {taskClicked?.name}
        </h2>

        <button
          type="button"
          className=" btn btn-primary backButton mt-3"
          aria-label="Close"
          onClick={() => props.setToggleMoreInfos(false)}
        >
          Back ⮌
        </button>
      </div>

      <p className="text-body text-break text-justify">
        {taskClicked?.description}
      </p>

      <p className="text-primary">Click on a button to change the status.</p>

      <div className="d-flex justify-content-center justify-content-sm-start">
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
          className={`ml-2 mr-2 
            ${
              status === "In Progress"
                ? "btn btn-success statusButton"
                : "btn btn-secondary"
            }
          `}
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
        <h2 className="display-1 mt-3">Users</h2>

        <div className="d-flex flex-wrap ">
          <div className="mr-1">|</div>
          {taskClicked?.workers &&
            taskClicked.workers.map((x, i) => (
              <div className="mr-1" key={i}>
                {" "}
                {x.username} |
              </div>
            ))}
        </div>
      </div>

      <button
        className="btn btn-warning btn-sm mt-3 btnRemove mr-sm-2"
        data-toggle="modal"
        data-target="#editTaskWarning"
      >
        Edit this task
      </button>

      <button
        className="btn btn-danger btn-sm mt-2 mt-sm-3 btnRemove"
        data-toggle="modal"
        data-target="#removeTaskWarning"
      >
        Remove this task
      </button>
    </>
  );
}
export default SubtaskInfos;
