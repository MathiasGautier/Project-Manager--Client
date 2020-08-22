import React, { useState } from "react";
import apiHandler from "../services/apiHandler";

function EditTaskModal(props) {
  const [title, setTitle] = useState("");
  const [descr, setDescription] = useState("");
  const [workersId, setWorkers] = useState([]);
  const [workerNames, setWorkerNames] = useState([]);

  const task = props.task;

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescritpion = (e) => {
    setDescription(e.target.value);
  };

  const onChangeWorkers = (e) => {
    const userId = e.target.value;
    const user = props.users.find((u) => u._id === userId);
    const oneUserId = user._id;
    const oneUserName = user.username;
    setWorkers([...workersId, oneUserId]);
    setWorkerNames([...workerNames, oneUserName]);
  };

  const removeUser = (x, e) => {
    e.preventDefault();
   
    const workers = task.workers.filter((y) => y._id !== x._id);
    const id = task._id;
    const subTodo = { workers: workers };
    apiHandler
      .updateSubTodo(subTodo, id)
      .then((apiRes) => {    
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="modal fade"
      id="editTaskWarning"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit task infos
            </h5>
          </div>
          <div className="modal-body">
            <p>Leave the field empty if you don't want to change its value</p>
            <form>
              <label htmlFor="project-title" className="mr-sm-2">
                Change title :
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={task.name}
                onChange={onChangeTitle}
              />

              <label htmlFor="project-description" className="mr-sm-2">
                Change description :
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={task.description}
                onChange={onChangeDescritpion}
              />

              <p className="mt-2">Current Users :</p>

              {task.workers &&
                task.workers.map((x, i) => (
                  <div className="mr-1 d-flex" key={i}>
                    {" "}
                    {x.username}
                    <button
                      className="btn btn-link text-danger p-0 ml-1"
                      onClick={(e) => removeUser(x, e)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

              <label htmlFor="project-description" className="mr-sm-2 mt-2">
                Select users :
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

              <div className="containe ml-3">
                {workerNames &&
                  [...new Set(workerNames)].map((name, index) => (
                    <div key={index}>{name}</div>
                  ))}
              </div>
            </form>
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
              type="submit"
              className="btn btn-danger"
              data-dismiss="modal"
              //   onClick={onSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
