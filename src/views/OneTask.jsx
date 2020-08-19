import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../services/apiHandler";
import NewSubTask from "../components/NewSubTask";
import OneSubTask from "../components/OneSubTask";
import Navbar from "../components/Navbar"
import UpdateProjectModal from "../components/UpdateProjectModal";
import RemoveProjectModal from "../components/removeProjectModal";
import { useHistory } from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";

function OneTask(props) {
  const authContext = useContext(AuthContext);
  const [task, setTask] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [allSubTodos, setAllSubTodos] = useState(undefined);
  const [subTodos, setSubTodos] = useState(undefined);
  const [toggleNewTask, setToggleNewTask] = useState(false);
  const [comments, setComments] = useState([]);

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

  const handleToggleNewTask = (e) => {
    toggleNewTask === false ? setToggleNewTask(true) : setToggleNewTask(false);
  };

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



  return (
    <div>
      <div>
        <Navbar />
        <div className="container-fluid">
          {task && (
            <div className="container-fluid oneProject-header mt-4 pb-2 shadow d-flex ">
              <div className="row">
              <div className="">
                <div className="display-1 mb-3 mt-2 pl-3 pr-3 text-left">{task.name}</div>

                <div className="pl-3 pr-3">
                  <p className="text-body text-break text-justify">{task.description}</p>

                  <h5 className="font-weight-light mb-3">
                    Created by {task.creator.username}
                  </h5>
                </div>
                </div>

                <div className="container buttons">

            {task && (task.creator._id===authContext.user._id) ? 
            <>
                <div>
                  <button
                    className="btn btn-warning btn-block mt-1"
                    data-toggle="modal"
                    data-target="#editProject"
                  >
                    Edit this project
                  </button>
                  </div>
                  <div>
                  <button
                    className="btn btn-danger mt-2 mb-1 btn-block"
                    data-toggle="modal"
                    data-target="#removeProjectWarning"
                  >
                    Remove this project
                  </button>
                  </div>
                  </>
:
<p className="text-info">Only the creator of the project can edit or remove it</p>
            }
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

          <div className="container-fluid oneProject-body ">
            <OneSubTask
              subTodos={subTodos}
              comments={comments}
              setComments={setComments}
              users={users}
              setAllSubTodos={setAllSubTodos}
              projectId={props.match.params.id}
            />
          </div>
          <div className="container-fluid">
            <button onClick={handleToggleNewTask}>
              {toggleNewTask ? <>Cancel</> : <>Create a new task</>}
            </button>
            {toggleNewTask ? (
              <>
                <h2>Add tasks</h2>
                <NewSubTask
                  users={users}
                  id={props.match.params.id}
                  subTaskSubmitted={subTaskSubmitted}
                  setAllSubTodos={setAllSubTodos}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>

  );
}

export default OneTask;
