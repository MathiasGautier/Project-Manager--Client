import React from "react";
import Landing from "./views/Landing";
import Tasks from './components/Tasks';
import OneTask from './views/OneTask';
import PrivateRoute from "./HOC/PrivateRoute";
import './style.scss';
import Footer from "./components/Footer.jsx"

// import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery';
import 'bootstrap/dist/js/bootstrap';
import 'popper.js';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
// import UnPrivateRoute from "./HOC/UnPrivateRoute"

function App() {
  
  return (
    <>
    <Router>
      <Route exact path="/" component={Landing} />
      <PrivateRoute exact path="/dashboard" roles={["user", "admin"]} component={Dashboard} />
      <PrivateRoute exact path="/tasks" roles={["user", "admin"]} component={Tasks} />
      <PrivateRoute exact path="/task/:id" roles={["user", "admin"]} component={OneTask} />
    </Router>
      <Footer />
      </>
  );
}

export default App;
