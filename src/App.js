import React from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import NewTask from "./components/New_task";
import Register from "./components/Register";
import Navbar from './components/Navbar';
import PrivateRoute from "./HOC/PrivateRoute";

import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="container mt-4">
    <Router>
    <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute exact path="/new-task" roles={["user", "admin"]} component={NewTask} />
    </Router>
    </div>
  );
}

export default App;
