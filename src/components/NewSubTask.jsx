import React, { useState } from "react";
import apiHander from "../services/apiHandler";
import apiHandler from "../services/apiHandler";

function NewSubTask(props) {
  const [subTask, setSubTask] = useState({
    name: "",
    description: "",
  });

  const [workersId, setWorkers] = useState([]);
  const [workerNames, setWorkerNames] = useState([]);

  const onChangeSubTask = (e) => {
    setSubTask({ ...subTask, [e.target.name]: e.target.value });
  };

  const onChangeWorkers = (e) => {
    const userId = e.target.value;
    const user = props.users.find((u) => u._id === userId);
    const oneUserId = user._id;
    const oneUserName = user.username;
    setWorkers([...workersId, oneUserId]);
    setWorkerNames([...workerNames, oneUserName]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const name = subTask.name;
    const description = subTask.description;
    const workers = [...new Set(workersId)];
    const todoParent_id = props.id;
    const subTodo = { name, description, workers, todoParent_id };

    apiHander
      .postSubTodo(subTodo)
      .then((data) => {
        resetForm();
        props.subTaskSubmitted(data);
        apiHandler
          .getSubtodos()
          .then((data) => {
            props.setAllSubTodos(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setSubTask({ name: "", description: "" });
    setWorkerNames([]);
    setWorkers([]);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h4>Tasks</h4>
        <div>You must create at least one task for your project.</div>
        <label htmlFor="task-title" className="mr-sm-2">
          Title :
        </label>
        <input
          type="text"
          name="name"
          value={subTask.name}
          onChange={onChangeSubTask}
          className="form-control"
          placeholder="Enter a title"
        />

        <label htmlFor="task-title" className="mr-sm-2">
          Description :
        </label>
        <input
          type="text"
          name="description"
          value={subTask.description}
          onChange={onChangeSubTask}
          className="form-control"
          placeholder="You can describe the task here"
        />

        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
          Assign people to this task :
        </label>
        <select
          className="custom-select mr-sm-2"
          id="inlineFormCustomSelect"
          name="workers"
          value={""}
          onChange={onChangeWorkers}
        >
          <option defaultValue>Choose a user</option>
          {props.users &&
            props.users.map((item, index) => {
              return (
                <option value={item._id} key={index}>
                  {item.username}
                </option>
              );
            })}
        </select>

        <div>
          {workerNames &&
            [...new Set(workerNames)].map((name, index) => (
              <div key={index}>{name}</div>
            ))}
        </div>

        <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">
          Add the task
        </button>
      </form>
    </div>
  );
}

export default NewSubTask;
