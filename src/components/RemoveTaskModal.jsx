import React from "react";

function RemoveTaskModal(props) {
  const task = props.taskClicked;

  return (
    <div
      className="modal fade"
      id="removeTaskWarning"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Remove {task.name} ?
            </h5>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              data-target="#editProject"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => props.handleTaskRemove(task)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveTaskModal;
