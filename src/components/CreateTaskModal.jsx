import React, { useState } from "react";
import apiHandler from "../services/apiHandler";

function CreateTaskModal(props) {
  const [title, setTitle] = useState("");
  const [descr, setDescription] = useState("");
  const [workersId, setWorkers] = useState([]);
  const [workerNames, setWorkerNames] = useState([]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const name = title;
    const description = descr;
    const workers = [...new Set(workersId)];
    const todoParent_id = props.id;
    const subTodo = { name, description, workers, todoParent_id };

    workers.length === 0
      ? resetForm()
      : apiHandler
          .postSubTodo(subTodo)
          .then((data) => {
            resetForm();
            //props.subTaskSubmitted(data);
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
    setTitle("");
    setDescription("");
    setWorkerNames([]);
    setWorkers([]);
  };

  return (
    <div
      className="modal fade"
      id="createTask"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Task
              </h5>
            </div>
            <div className="modal-body">
              <p>
                Fill in the details of the task and the people select that will
                work on it.
              </p>

              <label htmlFor="project-title" className="mr-sm-2">
                Title
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Title"
                onChange={onChangeTitle}
                value={title}
              />

              <label htmlFor="project-title" className="mr-sm-2">
                Description :
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Description"
                onChange={onChangeDescritpion}
                value={descr}
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
            </div>

            <div className="containe ml-3">
              {workerNames &&
                [...new Set(workerNames)].map((name, index) => (
                  <div key={index}>{name}</div>
                ))}
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
                className="btn btn-danger"
                data-dismiss={title && descr && workersId.length > 0 && "modal"}
                onClick={onSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskModal;
