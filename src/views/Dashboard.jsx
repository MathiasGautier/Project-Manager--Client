import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";
import NewTask from "../components/NewTask";

function Dashboard() {

  const [toggleTasks, setToggleTasks] = useState(true);

  const handleNewProject = () => {
    setToggleTasks(false);
  };
  const handleCurrentProject = () => {
    setToggleTasks(true);
  };


  return (
    <div >
      <Navbar
        handleNewProject={handleNewProject}
        handleCurrentProject={handleCurrentProject}
        toggleTasks={toggleTasks}
      />
      {toggleTasks ? 
      <Tasks
       /> : 
       <div className="auth-wrapper">
      <NewTask 
       handleCurrentProject={handleCurrentProject} 
      />
      </div>}
    </div>
  );
}

export default Dashboard;
