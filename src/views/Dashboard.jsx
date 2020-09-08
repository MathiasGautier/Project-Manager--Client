import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Tasks from "../components/Tasks";
import NewProject from "../components/NewProject";
import AuthContext from "../auth/UserContext";
import { Redirect, } from "react-router-dom";


function Dashboard() {
  const authContext = useContext(AuthContext);
  
  const [toggleTasks, setToggleTasks] = useState(true);
  
  const handleNewProject = () => {
    setToggleTasks(false);
  };
  const handleCurrentProject = () => {
    setToggleTasks(true);
  };
  
  if (authContext.isLoading===false && authContext.isLoggedIn === false) {return <Redirect to="/" /> }


  return (
    <>
      <div>
        <Navbar
        authContext={authContext}
          handleNewProject={handleNewProject}
          handleCurrentProject={handleCurrentProject}
          toggleTasks={toggleTasks}
        />
        {toggleTasks ? (
          <Tasks handleNewProject={handleNewProject} />
        ) : (
          <div className="container mt-5">
            <NewProject handleCurrentProject={handleCurrentProject} />
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}
export default Dashboard;
