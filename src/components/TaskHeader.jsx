import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory} from 'react-router-dom';


function Navbar(props) {
const history=useHistory();
const redirect=()=>{
    history.push('/dashboard')
}

  return (
    <div className="container-fluid navBar">
      <nav className="navbar navbar-expand-lg navbar-light navBar row bg-nav">
        <svg
          width="80"
          height="80"
          viewBox="0 0 16 16"
          className="bi bi-check-all ml-3"
          fill="rgb(0, 174, 255)"
        >
          <path
            fillRule="evenodd"
            d="M8.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14l.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"
          />
        </svg>
        <div
          className="align-self-center text-secondary display-4 title mb-2"
          href="#"
        >
          Manager
        </div>
        <button className="btn btn-primary" onClick={redirect}>← Back to dashboard</button>
       
      </nav>
    </div>

  );
}

export default Navbar;
