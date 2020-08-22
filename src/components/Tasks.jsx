import React, { useEffect, useState, useContext } from "react";
import apiHandler from "../services/apiHandler";
import { AuthContext } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function Tasks(props) {
  const authContext = useContext(AuthContext);
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

  return (
    <div className="container-fluid tasks">
      <div className="d-md-flex justify-content-between mt-3 align-items-center">
        <div className="mb-3 mb-md-0">
          <div className="display-4 text-center text-primary">
            Current Projects
          </div>
        </div>

        <div>
          <button
            type="button"
            className={`display-1 btn btn-outline-secondary btn-block ${
              props.toggleTasks === false ? `active` : null
            }`}
            onClick={props.handleNewProject}
          >
            New Project +
          </button>
        </div>
      </div>

      {todos &&
        todos.map((todo, index) => {
          return (
            <div key={index} className="mt-4 tasksTwo bg-nav shadow">
              <ReactTooltip effect="solid" />
              <div className="card-head">
                <div className="col">
                  <div className="d-sm-flex">
                    <div className="ml-sm-0 cardheadText">
                      <div className="ml-sm-0 text-break">
                        <NavLink
                          className="nav-link title"
                          exact
                          to={{
                            pathname: `/task/${todo._id}`,
                          }}
                        >
                          {todo.name}
                        </NavLink>
                      </div>
                    </div>

                    {/* //if the user is the creator  */}
                    <div className="align-self-center ml-2 mb-2 mb-sm-0">
                      {todo.creator._id === authContext.user._id && (
                        <svg
                          width="2em"
                          height="2em"
                          viewBox="0 0 16 16"
                          className="bi bi-person-circle text-success "
                          data-tip="You are creator/admin of this project"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                          <path
                            fillRule="evenodd"
                            d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          />
                          <path
                            fillRule="evenodd"
                            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  {subTodos &&
                    subTodos
                      .filter(
                        (x) =>
                          x.todoParent_id._id === todo._id &&
                          (x.status === "To Do" || x.status === "In Progress")
                      )
                      .reduce(
                        (acc, x) => [...acc, ...x.workers.map((x) => x._id)],
                        []
                      )
                      .includes(authContext.user._id) && (
                      <p className="pl-2 unfinishedTaskText">
                        You have{" "}
                        <span className="font-weight-bold">
                          {subTodos &&
                            subTodos
                              .filter(
                                (x) =>
                                  x.todoParent_id._id === todo._id &&
                                  (x.status === "To Do" ||
                                    x.status === "In Progress")
                              )
                              .map(
                                (x) =>
                                  x.workers.filter(
                                    (x) => x._id === authContext.user._id
                                  ).length
                              )
                              .reduce((a, b) => a + b, 0)}
                        </span>{" "}
                        unfinished tasks
                      </p>
                    )}
                </div>
                <div className="col">
                  <p className="mt-3 text-right mr-1 mr-sm-4 font-weight-bold">
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
                  Completed:{" "}
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
                      x.todoParent_id._id === todo._id &&
                      (x.status === "Done" ||
                        x.status === "In Progress" ||
                        x.status === "To Do")
                  ).length === 0
                    ? "No task yet"
                    : (
                        (subTodos.filter(
                          (x) =>
                            x.todoParent_id._id === todo._id &&
                            x.status === "Done"
                        ).length /
                          subTodos.filter(
                            (x) => x.todoParent_id._id === todo._id
                          ).length) *
                        100
                      ).toFixed(0) + "% complete")}
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
                        ).toFixed() + "%"
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
                      ).toFixed() + "%"
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
