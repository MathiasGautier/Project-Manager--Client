import React, { useEffect, useState } from "react";
import apiHandler from "../services/apiHandler";
import { NavLink } from "react-router-dom";

function Tasks(props) {
  const [todos, setTodos] = useState(undefined);

  useEffect(() => {
    apiHandler
      .getTodos()
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      {todos &&
        todos.map((todo, index) => {
          return (
            <div key={index}>
              <h1>
                <NavLink className="nav-link" exact to={{
                  pathname:`/task/${todo._id}`
                  }}>
                  {todo.name}
                </NavLink>
              </h1>
              <h3>{todo.description}</h3>
            </div>
          );
        })}
    </div>
  );
}

export default Tasks;
