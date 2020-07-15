import React, { useState, useEffect } from "react";
import Comments from "../components/Comments";
import SubTaskInfos from "../components/SubtaskInfos";

function OneSubTask(props) {
  const [toggleMoreInfos, setToggleMoreInfos] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});

  const toggleSubTask = (x) => {
    setToggleMoreInfos(true);
    setTaskClicked(x);
  };



  

  return (
    <div className="row">
      <div className="col">
        <h2>Tasks</h2>
        {props.subTodos &&
          props.subTodos.map((x, i) => (
            <div
              key={i}
              className="subTaskFrame"
              onClick={() => toggleSubTask(x)}
            >
              <h4>TITLE: : {x.name}</h4>
              <p>Status: {x.status}</p>
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
              comments={props.comments}
              taskClickedId={taskClicked._id}
              setComments={props.setComments}
              users={props.users}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default OneSubTask;
