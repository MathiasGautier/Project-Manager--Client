import React, { useState, useEffect } from "react";
import apiHandler from "../services/apiHandler";
import NewSubTask from "../components/NewSubTask";
import OneSubTask from "../components/OneSubTask";
import TaskHeader from "../components/TaskHeader";

function OneTask(props) {
  const [task, setTask] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const [allSubTodos, setAllSubTodos] = useState(undefined);
  const [subTodos, setSubTodos] = useState(undefined);
  const [toggleNewTask, setToggleNewTask] = useState(false);
  const [comments, setComments] = useState([]);

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
    if (allSubTodos && task !== undefined) {
      const res = allSubTodos.filter((x) => {
        if (x.todoParent_id._id === task._id) {
          return x;
        } else {
          return null;
        }
      });
      setSubTodos(res);
    }
  }, [task, allSubTodos]);

  const handleToggleNewTask = (e) => {
    toggleNewTask === false ? setToggleNewTask(true) : setToggleNewTask(false);
  };

  const subTaskSubmitted = (data) => {
    setToggleNewTask(false);
  };

  return (
    <>
      <div className="row">
        <TaskHeader />
        <div className="container">
          {task && (
            <>
              <h1>{task.name}</h1>
              <p>{task.description}</p>
              <p>Created by {task.creator.username}</p>
            </>
          )}

          <div>
            <OneSubTask
              subTodos={subTodos}
              comments={comments}
              setComments={setComments}
              users={users}
              setAllSubTodos={setAllSubTodos}
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
