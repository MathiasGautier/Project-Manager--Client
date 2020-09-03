import React from "react";

function RemoveComModal(props) {
  return (
    <div>
      <div
        className="modal fade"
        id="removeComWarning"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete comment ?
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
                onClick={props.removeCom}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveComModal;
