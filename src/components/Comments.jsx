import React, { useState, useEffect, useContext } from "react";
import RemoveComModal from "./RemoveComModal";
import AuthContext from "../auth/UserContext";
import apiHandler from "../services/apiHandler";

function Comments(props) {
  const authContext = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [comClicked, setComClicked] = useState();

  const onChange = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userRef = authContext.user._id;
    const text = newComment;
    const subTodoParent_id = props.taskClickedId;
    const toDoRef = props.projectId;
    const comment = { userRef, text, subTodoParent_id, toDoRef };

    apiHandler
      .postComment(comment)
      .then(() => {
        clearNewComment();
        apiHandler
          .getComments()
          .then((data) => {
            props.setComments(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const res = props.comments.filter((x) => {
      return x.subTodoParent_id === props.taskClickedId;
    });
    setComments(res);
  }, [props.taskClickedId, props.comments]);

  const clearNewComment = () => {
    setNewComment("");
  };

  const removeCom = () => {
    apiHandler
      .deleteComment(comClicked._id)
      .then(() => {
        apiHandler
          .getComments()
          .then((data) => {
            props.setComments(data);
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
    <div className="mt-3 container">
      <div>
        <h4>Comments</h4>

        {comments &&
          comments.map((x, i) => (
            <div
              className={`
            pt-2 pl-3 pr-3 margin
          ${i % 2 === 0 ? "bgCom" : "bgComTwo"}
          `}
              key={i}
            >
              {i % 2 === 0 ? (
                <>
                  <RemoveComModal removeCom={removeCom} />
                  <div className="d-flex">
                    <p className="font-weight-bold margin ">
                      {x.userRef.username} ↓
                    </p>
                    <button
                      className="ml-2 text-danger btn btn-sm btn-link btnRemoveOne"
                      data-toggle="modal"
                      data-target="#removeComWarning"
                      onClick={() => setComClicked(x)}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-justify pb-2">{x.text}</p>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-end">
                  
                    <p className="font-weight-bold margin">
                      ↓ {x.userRef.username}
                    </p>
                    <button
                      className="ml-2 text-danger btn btn-sm btn-link btnRemoveOne"
                      data-toggle="modal"
                      data-target="#removeComWarning"
                      onClick={() => setComClicked(x)}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-justify pb-2">{x.text}</p>
                </>
              )}
            </div>
          ))}

        <form onSubmit={onSubmit}>
          <label htmlFor="comment">Enter your comment :</label>
          <input
            type="text"
            name="newComment"
            value={newComment}
            onChange={onChange}
            className="form-control mb-3"
            placeholder="Enter your comment here"
          />
          <div className="d-flex d-md-inline justify-content-center button">
            <button className="btn btn-primary mb-3 comButton" type="submit">
              Submit comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Comments;
