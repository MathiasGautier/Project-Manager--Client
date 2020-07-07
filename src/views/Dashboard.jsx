import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";
import New_task from "../components/New_task";

function Test() {
  const [toggleTasks, setToggleTasks] = useState(true)

  const handleNewProject = () => {
    setToggleTasks(false);
  };
  const handleCurrentProject = () => {
    setToggleTasks(true);
  };

  return (
    <div className="row">
      <Navbar
        handleNewProject={handleNewProject}
        handleCurrentProject={handleCurrentProject}
        toggleTasks={toggleTasks}
      />
      {toggleTasks ? <Tasks /> : <New_task />}
    </div>
  );
}

export default Test;
