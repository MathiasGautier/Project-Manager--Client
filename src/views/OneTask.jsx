import React, { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";
import NewSubTask from "../components/NewSubTask";
import OneSubTask from "../components/OneSubTask";
import TaskHeader from "../components/TaskHeader";
import UpdateProjectModal from "../components/UpdateProjectModal";
import RemoveProjectModal from "../components/removeProjectModal";
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
                history.push("/dashboard");
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
   
  };

  return (
    <>
      <div>
        <TaskHeader />
        <div className="container-fluid">
          {task && (
            <div className="container-fluid oneProject-header mt-4 pb-2">
              <div className="d-flex justify-content-between">
                <div className="display-4 mb-3">{task.name}</div>
                <div className="align-self-center">
                <div className="d-flex flex-column">
                <button
                  className="btn btn-outline-danger"
                  data-toggle="modal"
                  data-target="#editProject"
                >
                  Edit this project
                </button>
                <UpdateProjectModal
                  projectId={props.match.params.id}
                  setTask={setTask}
                  task={task}
                />
                 <button
                  className="btn btn-outline-danger"
                  data-toggle="modal"
                  data-target="#removeProjectWarning"
                >
                  Remove this project
                </button>
                </div>
                </div>
                
                <RemoveProjectModal
              name={task.name}
              handleProjectRemove={()=>handleProjectRemove(task)}
            />
              </div>
              <div>
                <h4 className="font-weight-light">{task.description}</h4>
                <h5 className="font-weight-light">
                  Created by {task.creator.username}
                </h5>
              </div>
            </div>
          )}

          <div className="container-fluid oneProject-body">
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
    </>
  );
}

export default OneTask;
