import React, { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";
import NewSubTask from "../components/NewSubTask";
import OneSubTask from "../components/OneSubTask";
import TaskHeader from "../components/TaskHeader";
import UpdateProjectModal from "../components/UpdateProjectModal";
import { useHistory } from "react-router-dom";

function OneTask(props) {
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
                history.push("/dashboard")
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };


  return (
    <>
      <div className="row">
        <TaskHeader />
        <div className="container">
          {task && (
            <>
              <div className="display-3">{task.name}</div>
              <h4>{task.description}</h4>
              <h4>Created by {task.creator.username}</h4>

              <button
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#removeProjectWarning"
              >
                Remove this project
              </button>

              {/* ///---------------------Modal */}
              <div
                className="modal fade"
                id="removeProjectWarning"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Remove '{task.name}' ?
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
                        onClick={() => handleProjectRemove(task)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target="#editProject"
              >
                Edit this project
              </button>
              <UpdateProjectModal
              projectId={props.match.params.id}
              setTask={setTask}
              task={task}
               / >
            </>
          )}

          <div>
          {/* {subTodos===false ?
          <div>
            <h3>Create a task </h3>
          </div>
          :
          null
          } */}
            <OneSubTask
              subTodos={subTodos}
              comments={comments}
              setComments={setComments}
              users={users}
              setAllSubTodos={setAllSubTodos}
              projectId={props.match.params.id}
            />
          </div>

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
    </>
  );
}

export default OneTask;
