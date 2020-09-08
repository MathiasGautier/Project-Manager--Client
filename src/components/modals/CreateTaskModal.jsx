import React, { useState, useEffect } from "react";
import apiHandler from "../../services/apiHandler";

function CreateTaskModal(props) {
  const [title, setTitle] = useState("");
  const [descr, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [newWorkers, setNewWorkers] = useState([]);

  useEffect(() => {
    setUsers(props.users && props.users.map((x) => x.username));
  }, [props.users]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescritpion = (e) => {
    setDescription(e.target.value);
  };

  const onChangeWorkers = (e) => {
    setNewWorkers([...newWorkers, e.target.value]);
    setUsers(users.filter((x) => x !== e.target.value));
  };

  const removeUser = (name, e) => {
    e.preventDefault();
    setNewWorkers(newWorkers.filter((x) => x !== name));
    setUsers([...users, name]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const name = title;
    const description = descr;
    const todoParent_id = props.id;
    const workers = props.users
      .filter((x) => newWorkers.includes(x.username))
      .map((x) => x._id);
    const subTodo = { name, description, workers, todoParent_id };

    workers.length === 0
      ? resetForm()
      : apiHandler
          .postSubTodo(subTodo)
          .then((data) => {
            resetForm();
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
    setNewWorkers([]);
    setUsers(props.users && props.users.map((x) => x.username));
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
                {users &&
                  users.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="containe ml-3">
              {newWorkers &&
                newWorkers.map((name, index) => (
                  <div key={index}>
                    {name}
                    <button
                      className="btn btn-link text-danger p-0 ml-1 mb-1"
                      onClick={(e) => removeUser(name, e)}
                    >
                      Remove
                    </button>
                  </div>
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
                type="submit"
                className="btn btn-danger"
                data-dismiss="modal"
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
