import React, { useState, useContext } from "react";
import Comments from "../components/Comments";
import SubTaskInfos from "../components/SubtaskInfos";
import apiHandler from "../services/apiHandler";
import AuthContext from "../auth/UserContext";

function OneSubTask(props) {
  const authContext = useContext(AuthContext);
  const [taskClicked, setTaskClicked] = useState({});

  const toggleSubTask = (x, e) => {
    e.preventDefault();
    props.setToggleMoreInfos(true);
    setTaskClicked(x);
  };

  const handleTaskRemove = (x) => {
    props.setToggleMoreInfos(false);
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
      {props.toggleMoreInfos && (
        <div className="row subTaskInfos mt-4">
          <div className="container-fluid ">
            <SubTaskInfos
              setAllSubTodos={props.setAllSubTodos}
              users={props.users}
              setToggleMoreInfos={props.setToggleMoreInfos}
              taskClicked={taskClicked}
              subTodo={props.subTodos}
              handleTaskRemove={handleTaskRemove}
            />
            <Comments
              projectId={props.projectId}
              comments={props.comments}
              taskClickedId={taskClicked._id}
              setComments={props.setComments}
              users={props.users}
            />
          </div>
        </div>
      )}
      {!props.toggleMoreInfos && (
        <>
          {props.subTodos?.length === 0 && (
            <div className="alert alert-warning text-center mt-4">
              You must create tasks to start working on this project.
            </div>
          )}

          {props.subTodos?.length > 0 && (
            <>
              <div className="d-flex align-items-center">
                <p>
                  <span className="text-success">Green</span> = you are assigned
                  to this task
                </p>
              </div>
              <div>
                <div className="row progressRow">
                  <div className="col toDoCol text-center pb-3">
                    <h2 className="mt-2 status"> To Do</h2>
                    {props.subTodos &&
                      props.subTodos
                        .filter((x) => x.status === "To Do")
                        .map((x) => {
                          return (
                            <div key={x._id}>
                              <button
                                type="button"
                                data-toggle="button"
                                className={`
                          btn 
                          btn-block text-truncate mt-2 shadow 
                          
                          ${
                            x.workers
                              .map((x) => x._id)
                              .includes(authContext.user._id)
                              ? "btn-success"
                              : "btn-info"
                          }
                          `}
                                onClick={(e) => toggleSubTask(x, e)}
                              >
                                {x.name}
                              </button>
                            </div>
                          );
                        })}
                  </div>
                  <div className="col progressCol text-center pb-3">
                    <h2 className="mt-2 status">In Progress</h2>
                    {props.subTodos &&
                      props.subTodos
                        .filter((x) => x.status === "In Progress")
                        .map((x, i) => {
                          return (
                            <div key={i}>
                              <button
                                type="button"
                                data-toggle="button"
                                className={`
                          btn 
                          btn-block text-truncate mt-2 shadow
                          ${
                            x.workers
                              .map((x) => x._id)
                              .includes(authContext.user._id)
                              ? "btn-success"
                              : "btn-info"
                          }
                          `}
                                onClick={(e) => toggleSubTask(x, e)}
                              >
                                {x.name}
                              </button>
                            </div>
                          );
                        })}
                  </div>
                  <div className="col doneCol text-center pb-3">
                    <h2 className="mt-2 status"> Done</h2>
                    {props.subTodos &&
                      props.subTodos
                        .filter((x) => x.status === "Done")
                        .map((x, i) => {
                          return (
                            <div key={i}>
                              <button
                                type="button"
                                data-toggle="button"
                                className={`
                          btn 
                          btn-block text-truncate mt-2 shadow
                          ${
                            x.workers
                              .map((x) => x._id)
                              .includes(authContext.user._id)
                              ? "btn-success"
                              : "btn-info"
                          }
                          `}
                                onClick={(e) => toggleSubTask(x, e)}
                              >
                                {x.name}
                              </button>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
export default OneSubTask;
