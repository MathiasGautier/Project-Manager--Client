import React, { useState, useEffect } from "react";

function New_sub_task(props) {
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

  console.log(workerNames && workerNames);

  return (
    <div>
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
        name="name"
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
        value={workersId}
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
        <p>{workerNames && workerNames}</p>
      </div>

      <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">
        Add the task
      </button>
    </div>
  );
}

export default New_sub_task;
