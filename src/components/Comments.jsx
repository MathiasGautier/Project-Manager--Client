import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import apiHandler from "../services/apiHandler";

function Comments(props) {
  const authContext=useContext(AuthContext);  
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const onChange = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userRef= authContext.user._id;
    const text = newComment;
    const subTodoParent_id= props.taskClickedId;
    const toDoRef=props.projectId;
    const comment={userRef, text, subTodoParent_id, toDoRef};
    apiHandler
    .postComment(comment)
    .then((data)=>{
        clearNewComment();
        apiHandler
        .getComments()
        .then((data)=>{
            props.setComments(data);
        })
        .catch((error)=>{
            console.log(error)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
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

  return (
    <div>
      <h4>Comments</h4>
      {comments &&
        comments.map((x, i) => (
          <div key={i}>
            <p>commentaire : {x.text}</p>
            <p>Posted by: {x.userRef.username}</p>
          </div>
        ))}

      <form onSubmit={onSubmit}>
        <label htmlFor="comment">Your comment :</label>
        <input
          type="text"
          name="newComment"
          value={newComment}
          onChange={onChange}
          className="form-control"
          placeholder="Enter your comment here"
        />
        <button className="btn btn-primary" type="submit">
          Submit comment
        </button>
      </form>
    </div>
  );
}

export default Comments;
