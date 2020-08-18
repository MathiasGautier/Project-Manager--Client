import React, { useState, useContext } from "react";
import Comments from "../components/Comments";
import SubTaskInfos from "../components/SubtaskInfos";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../auth/AuthContext";
import ReactTooltip from 'react-tooltip';

function OneSubTask(props) {
  const authContext = useContext(AuthContext);
  const [toggleMoreInfos, setToggleMoreInfos] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});

  const toggleSubTask = (x, e) => {
    e.preventDefault();
    setToggleMoreInfos(true);
    setTaskClicked(x);
  };

  const handleTaskRemove = (x) => {
    setToggleMoreInfos(false);
    apiHandler
      .deletSubTodoComments(x._id)
      .then(() => {
        apiHandler
          .deleteSubTodo(x._id)
          .then(() =>
            apiHandler
              .getSubtodos()
              .then((data) => props.setAllSubTodos(data))
              .catch((error) => {
                console.log(error);
              })
          )
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
    
      <div>
        <div className="row">
          <div className="col toDoCol text-center pb-3">
            <h2 className="mt-2"> To Do</h2>
            {props.subTodos &&
              props.subTodos
                .filter((x) => x.status === "To Do")
                .map((x) => {
                  return (
                    <div key={x._id} >
                              <ReactTooltip effect="solid" type="dark" className="opaque"/>
                      <button
                        type="button"
                        data-toggle="button"
                        className="btn btn-info text-truncate mt-2 shadow"
                        style={{ width: "12rem" }}
                        onClick={(e) => toggleSubTask(x, e)}
                      >
                        {x.name}
                        {x.workers.map(
                          (x, i) =>
                            x._id === authContext.user._id && (
                              <svg
                                key={i}
                                data-tip="You are assigned to this task"
                                width="1.7em"
                                height="1.7em"
                                viewBox="0 0 16 16"
                                className="bi bi-person-circle text-danger align-self-center ml-2"
                                
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path
                                  fillRule="evenodd"
                                  d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                />
                              </svg>
                            )
                        )}
                      </button>
                    </div>
                  );
                })}
          </div>
          <div className="col progressCol text-center pb-3">
            <h2 className="mt-2">In Progress</h2>
            {props.subTodos &&
              props.subTodos
                .filter((x) => x.status === "In Progress")
                .map((x, i) => {
                  return (
                    <div key={i}>
                      <button
                        type="button"
                        data-toggle="button"
                        className="btn btn-info text-truncate mt-2 shadow"
                        style={{ width: "12rem" }}
                        onClick={(e) => toggleSubTask(x, e)}
                      >
                        {x.name}
                        {x.workers.map(
                          (x, i) =>
                            x._id === authContext.user._id && (
                              <svg
                                key={i}
                                width="1.7em"
                                height="1.7em"
                                viewBox="0 0 16 16"
                                className="bi bi-person-circle text-danger align-self-center ml-2"
                                data-tip="You are assigned to this task"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path
                                  fillRule="evenodd"
                                  d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                />
                              </svg>
                            )
                        )}
                      </button>
                    </div>
                  );
                })}
          </div>
          <div className="col doneCol text-center pb-3">
            <h2 className="mt-2"> Done</h2>
            {props.subTodos &&
              props.subTodos
                .filter((x) => x.status === "Done")
                .map((x, i) => {
                  return (
                    <div key={i}>
                      <button
                        type="button"
                        data-toggle="button"
                        className="btn btn-info text-truncate mt-2 shadow"
                        style={{ width: "12rem" }}
                        onClick={(e) => toggleSubTask(x, e)}
                      >
                        {x.name}
                        {x.workers.map(
                          (x, i) =>
                            x._id === authContext.user._id && (
                              <svg
                                key={i}
                                width="1.7em"
                                height="1.7em"
                                viewBox="0 0 16 16"
                                className="bi bi-person-circle text-danger align-self-center ml-2"
                                data-tip="You are assigned to this task"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                <path
                                  fillRule="evenodd"
                                  d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                />
                                <path
                                  fillRule="evenodd"
                                  d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                />
                              </svg>
                            )
                        )}
                      </button>
                    </div>
                  );
                })}
          </div>
        </div>

        {props.subTodos &&
          props.subTodos.map((x, i) => (
            <div key={i}>
              <div
                className="modal fade"
                id="removeWarning"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Remove {x.name} ?
                      </h5>
                    </div>
                    <div className="modal-footer justify-content-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={() => handleTaskRemove(x)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="bg-nav row mt-4">
        {toggleMoreInfos && (
          <div className="col">
            <SubTaskInfos
              setToggleMoreInfos={setToggleMoreInfos}
              taskClicked={taskClicked}
              setAllSubTodos={props.setAllSubTodos}
              subTodo={props.subTodos}
            />
            <Comments
              projectId={props.projectId}
              comments={props.comments}
              taskClickedId={taskClicked._id}
              setComments={props.setComments}
              users={props.users}
            />

            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#removeWarning"
            >
              Remove this task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OneSubTask;
