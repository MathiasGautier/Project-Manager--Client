import React, { useState, useEffect } from "react";
import apiHandler from "../../services/apiHandler";

function EditTaskModal(props) {
  const [title, setTitle] = useState("");
  const [descr, setDescription] = useState("");

  const [newWorkers, setWorkers] = useState();
  const [userSelection, setUserSelection] = useState();

  const task = props.task;
  const usernames = props.users.map((x) => x.username);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDescritpion = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    setTitle(task.name);
    setDescription(task.description);
    let workersArray = [task.workers];
    setWorkers(workersArray);
    let workerNames = task.workers.map((x) => x.username);
    const usernames = props.users.map((x) => x.username);
    let optionsArray = usernames.filter((e) => !workerNames.includes(e));
    setUserSelection(optionsArray);
  }, [task.workers, props.users, task.description, task.name]);

  const removeUser = (x, e) => {
    e.preventDefault();
    let name = x.username;
    setWorkers(newWorkers.map((x) => x.filter((x) => x.username !== name)));
    let res = userSelection.concat(name);
    setUserSelection(res);
  };

  const onChangeWorkers = (e) => {
    let currentWorkers = newWorkers.map((x) => x.map((x) => x));
    let user = props.users.find((u) => u.username === e.target.value);
    let alreadyHere;
    newWorkers.map((x) =>
      x.filter((x) => x.username === user.username).length === 0
        ? (alreadyHere = false)
        : (alreadyHere = true)
    );
    !alreadyHere && currentWorkers.map((x) => x.push(user));
    setWorkers(currentWorkers);

    let workerNames = currentWorkers.map((x) => x.map((x) => x.username))[0];

    let optionsArray = usernames.filter((e) => !workerNames.includes(e));

    setUserSelection(optionsArray);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const description = descr;
    const name = title;
    const workers = newWorkers[0];
    const todoParent_id = task.todoParent_id._id;
    const _id = task._id;
    const subTodo = { name, description, workers, todoParent_id };
    const newSubTodo={name, description, workers, todoParent_id, _id}
    apiHandler
      .updateSubTodo(subTodo, task._id)
      .then((data) => {
       
        props.modified(newSubTodo);
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
                value={title}
                className="form-control"
                placeholder={title}
                onChange={onChangeTitle}
              />

              <label htmlFor="project-description" className="mr-sm-2">
                Change description :
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={descr}
                placeholder={descr}
                onChange={onChangeDescritpion}
              />

              <p className="mt-2">Current Users :</p>
              {newWorkers && newWorkers[0].length === 0 && (
                <p className="text-danger">You must add at least one user</p>
              )}
              {newWorkers &&
                newWorkers.map((users) =>
                  users.map((x, i) => (
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
                  ))
                )}

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
                {userSelection &&
                  userSelection.map((user, index) => {
                    return (
                      <option value={user} key={index}>
                        {user}
                      </option>
                    );
                  })}
              </select>
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
              onClick={onSubmit}
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
