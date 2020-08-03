import React, { useEffect, useState } from "react";
import apiHandler from "../services/apiHandler";
import { NavLink } from "react-router-dom";

function Tasks(props) {
  const [todos, setTodos] = useState(undefined);
  const [subTodos, setSubTodos] = useState(undefined);

  useEffect(() => {
    apiHandler
      .getSubtodos()
      .then((data) => {
        setSubTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  //  console.log(subTodos
  //    &&
  //   (
  //     (subTodos.filter(
  //       (x) =>
  //         x.todoParent_id._id === "5f26e4630c4fe909b4294f73" && x.status === "Done"
  //     ).length /
  //       subTodos.filter((x) => x.todoParent_id._id === "5f26e4630c4fe909b4294f73")
  //         .length) *
  //     100
  //   ).toFixed(0)
  //   )
  console.log(todos);
  console.log(
    subTodos &&
      (subTodos.filter(
        (x) =>
          x.todoParent_id._id === "5f26e4630c4fe909b4294f73" &&
          x.status === "Done"
      ).length === 0
        ? "No task yet"
        : (subTodos.filter(
            (x) =>
              x.todoParent_id._id === "5f26e4630c4fe909b4294f73" &&
              x.status === "Done"
          ).length /
            subTodos.filter(
              (x) => x.todoParent_id._id === "5f26e4630c4fe909b4294f73"
            ).length) *
          (100).toFixed(0))
  );

  return (
    <div className="container-fluid tasks">
      {todos &&
        todos.map((todo, index) => {
          return (
            <div key={index} className="mt-4 tasksTwo bg-nav">
              <div className="card-head">
                <div className="col">
                  <NavLink
                    className="nav-link title pl-3"
                    exact
                    to={{
                      pathname: `/task/${todo._id}`,
                    }}
                  >
                    {todo.name}
                  </NavLink>

                  <p className="pl-3 font-weight-light pb-2">
                    {todo.description}
                  </p>
                </div>
                <div className="col">
                  <p className="mt-3 text-right mr-4 font-weight-bold">
                    {subTodos &&
                      subTodos.filter((x) => x.todoParent_id._id === todo._id)
                        .length}{" "}
                    tasks
                  </p>
                </div>
              </div>

              {/* //REFACTOR THIS PART : // */}

              <div className="d-flex justify-content-around mt-2">
                <p className="pl-3">
                  To do:{" "}
                  {subTodos &&
                    subTodos.filter(
                      (x) =>
                        x.todoParent_id._id === todo._id && x.status === "To Do"
                    ).length}
                </p>
                <p className="pl-3">
                  In Progress:{" "}
                  {subTodos &&
                    subTodos.filter(
                      (x) =>
                        x.todoParent_id._id === todo._id &&
                        x.status === "In Progress"
                    ).length}
                </p>
                <p className="pl-3">
                  Completed :
                  {subTodos &&
                    subTodos.filter(
                      (x) =>
                        x.todoParent_id._id === todo._id && x.status === "Done"
                    ).length}
                </p>
              </div>
              <div className="text-center mb-2 font-weight-bold">
                {subTodos &&
                  (subTodos.filter(
                    (x) =>
                      x.todoParent_id._id === todo._id && x.status === "Done"
                  ).length === 0
                    ? "No task yet"
                    : (subTodos.filter(
                        (x) =>
                          x.todoParent_id._id === todo._id &&
                          x.status === "Done"
                      ).length /
                        subTodos.filter((x) => x.todoParent_id._id === todo._id)
                          .length) *
                        (100).toFixed(0) +
                      "%")}
              </div>

              <div className="pl-3">
                <div className="progress mr-3" style={{ height: "25px" }}>
                  <div
                    className="progress-bar progress-bar-striped bg-success"
                    role="progressbar"
                    style={{
                      width: `${
                        subTodos &&
                        (
                          (subTodos.filter(
                            (x) =>
                              x.todoParent_id._id === todo._id &&
                              x.status === "Done"
                          ).length /
                            subTodos.filter(
                              (x) => x.todoParent_id._id === todo._id
                            ).length) *
                          100
                        ).toFixed(0) + "%"
                      }`,
                    }}
                    aria-valuenow={
                      subTodos &&
                      (
                        (subTodos.filter(
                          (x) =>
                            x.todoParent_id._id === todo._id &&
                            x.status === "Done"
                        ).length /
                          subTodos.filter(
                            (x) => x.todoParent_id._id === todo._id
                          ).length) *
                        100
                      ).toFixed(0) + "%"
                    }
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Tasks;
