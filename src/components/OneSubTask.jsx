import React, { useState } from "react";
import Comments from "../components/Comments";
import SubTaskInfos from "../components/SubtaskInfos";
import apiHandler from "../services/apiHandler";

function OneSubTask(props) {
  const [toggleMoreInfos, setToggleMoreInfos] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});

  const toggleSubTask = (x) => {
    setToggleMoreInfos(true);
    setTaskClicked(x);
  };

  const handleTaskRemove = (x) => {
    setToggleMoreInfos(false);
    apiHandler
      .deletSubTodoComments(x._id)
      .then(() => {
        apiHandler
          .deleteSubTodo(x._id)
          .then(() =>
            apiHandler
              .getSubtodos()
              .then((data) => props.setAllSubTodos(data))
              .catch((error) => {
                console.log(error);
              })
          )
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="row">
      <div className="col">
        <h2>Tasks</h2>
        {props.subTodos &&
          props.subTodos.map((x, i) => (
            <div key={i}>
              <div className="subTaskFrame" onClick={() => toggleSubTask(x)}>
                <h4>TITLE: : {x.name}</h4>
                <p>Status: {x.status}</p>
              </div>

{/* ///---------Modal */}
              <div
                className="modal fade"
                id="removeWarning"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Remove {x.name} ?
                      </h5>
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
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={() => handleTaskRemove(x)}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          ))}
      </div>

      <div className="col">
        {toggleMoreInfos && (
          <>
            <SubTaskInfos
              setToggleMoreInfos={setToggleMoreInfos}
              taskClicked={taskClicked}
              setAllSubTodos={props.setAllSubTodos}
              subTodo={props.subTodos}
            />
            <Comments
              projectId={props.projectId}
              comments={props.comments}
              taskClickedId={taskClicked._id}
              setComments={props.setComments}
              users={props.users}
            />

            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#removeWarning"
            >
              Remove this task
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OneSubTask;
