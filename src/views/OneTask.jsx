import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../services/apiHandler";
import OneSubTask from "../components/OneSubTask";
import Navbar from "../components/Navbar";
import UpdateProjectModal from "../components/UpdateProjectModal";
import RemoveProjectModal from "../components/removeProjectModal";
import SubTaskInfos from "../components/SubtaskInfos";
import Comments from "../components/Comments";
import CreateTaskModal from "../components/CreateTaskModal";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

function OneTask(props) {
  const authContext = useContext(AuthContext);
  const [task, setTask] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [allSubTodos, setAllSubTodos] = useState(undefined);
  const [subTodos, setSubTodos] = useState(undefined);
  const [toggleNewTask, setToggleNewTask] = useState(false);
  const [comments, setComments] = useState([]);
  const [toggleMoreInfos, setToggleMoreInfos] = useState(false);

  const history = useHistory();

  useEffect(() => {
    apiHandler
      .getComments()
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    apiHandler
      .get("/user/users")
      .then((apiRes) => {
        setUsers(apiRes.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    apiHandler
      .getSubtodos()
      .then((data) => {
        setAllSubTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const id = props.match.params.id;
    apiHandler
      .getOneTodo(`${id}`)
      .then((apiRes) => {
        setTask(apiRes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  useEffect(() => {
    let subTodosId = allSubTodos && allSubTodos.map((x) => x.todoParent_id._id);
    let taskId = task && task._id;
    const res =
      subTodosId &&
      taskId &&
      allSubTodos.filter((x) => {
        return x.todoParent_id._id === taskId;
      });
    setSubTodos(res);
  }, [task, allSubTodos]);

  const subTaskSubmitted = (data) => {
    setToggleNewTask(false);
  };

  const handleProjectRemove = (task) => {
    apiHandler
      .deleteProjectComments(task._id)
      .then(() => {
        apiHandler
          .deleteProjectSubtodos(task._id)
          .then(() => {
            apiHandler
              .deleteTodo(task._id)
              .then(() => {
                history.push("/dashboard");
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

 
  const redirect = () => {
    history.push("/dashboard");
    props.toggleTasks===false &&
    props.handleCurrentProject();
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className="container-fluid mb-4">
          {task && !toggleMoreInfos && (
            <div className="container-fluid oneProject-header mt-4 pb-2 shadow d-flex ">
              <div className="row">
                <div className="">

                <div className="titleHeader d-flex justify-content-between">
                  
                    <div className="display-1 mb-3 mt-2 pl-3 pr-3 text-left text-break titleOneTask">
                      {task.name}
                    </div>
  
                    <button
          type="button"
          className=" btn btn-primary backButton mt-3 mr-4 mr-sm-3 mr-lg-0"
          aria-label="Close"
          onClick={redirect}
        >
        Back ⮌
        </button>
                   

                </div> 
                  <div className="pl-3 pr-3">
                    <p className="text-body text-break text-justify pr-3 pr-sm-0">
                      {task.description}
                    </p>

                    <h5 className="font-weight-light mb-3">
                      Created by {task.creator.username}
                    </h5>
                  </div>
                </div>

                <div className="container-fluid d-flex flex-column flex-sm-row mb-1 buttonsGroup">
                  {task && task.creator._id === authContext.user._id ? (
                    <>
                      <div>
                        <button
                          className="btn btn-sm btn-warning mr-sm-2 mb-2 mb-sm-0 buttons"
                          data-toggle="modal"
                          data-target="#editProject"
                        >
                          Edit this project
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-danger buttons"
                          data-toggle="modal"
                          data-target="#removeProjectWarning"
                        >
                          Remove this project
                        </button>
                      </div>
                    </>
                  ) : (
                    <p className="text-info">
                      Only the creator of the project can edit or remove it
                    </p>
                  )}
                </div>

                <UpdateProjectModal
                  projectId={props.match.params.id}
                  setTask={setTask}
                  task={task}
                />
                <RemoveProjectModal
                  name={task.name}
                  handleProjectRemove={() => handleProjectRemove(task)}
                />
              </div>
              
            
            </div>
          )}

          {!toggleMoreInfos && (
            <button
              className="btn btn-block btn-sm mt-2 btn-outline-primary"
              data-toggle="modal"
              data-target="#createTask"
            >
              Create a new task
            </button>
          )}

          <div>
            <CreateTaskModal
              users={users}
              id={props.match.params.id}
              subTaskSubmitted={subTaskSubmitted}
              setAllSubTodos={setAllSubTodos}
            />
          </div>

          <div className="container-fluid oneProject-body ">
            <OneSubTask
            setAllSubTodos={setAllSubTodos}
              users={users}
              subTodos={subTodos}
              comments={comments}
              setToggleMoreInfos={setToggleMoreInfos}
              toggleMoreInfos={toggleMoreInfos}
              setComments={setComments}
              users={users}
              setAllSubTodos={setAllSubTodos}
              projectId={props.match.params.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneTask;
