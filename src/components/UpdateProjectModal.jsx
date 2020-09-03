import React, { useState } from "react";
import apiHandler from "../services/apiHandler";

function UpdateProjectModal(props) {
  const [name, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const onSubmit = () => {
    let todoUpdate;
    let id = props.projectId;
    if (name.length > 0 && description.length > 0) {
      todoUpdate = { name: name, description: description };
    } else if (name.length > 0 && description.length === 0) {
      todoUpdate = { name: name };
    } else if (name.length === 0 && description.length > 0) {
      todoUpdate = { description: description };
    }
    apiHandler
      .updateTodo(todoUpdate, id)
      .then((data) => {
        apiHandler
          .getOneTodo(id)
          .then((res) => {
            props.setTask(res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div
      className="modal fade"
      id="editProject"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit project infos
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
                placeholder={props.task.name}
                onChange={titleChange}
              />

              <label htmlFor="project-title" className="mr-sm-2">
                Change description :
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={props.task.description}
                onChange={descriptionChange}
              />
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

export default UpdateProjectModal;
