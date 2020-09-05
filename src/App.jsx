import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import OneTask from "./views/OneTask";
import Dashboard from "./views/Dashboard";
import "./style.scss";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap";
import "popper.js";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" render={(props) => <Landing {...props} />} />
        <Route
          exact
          path="/dashboard"
          render={(props) => <Dashboard {...props} />}
        />
        <Route exact path="/register" render={(props) => <Register {...props} />} />
        <Route
          exact
          path="/task/:id"
          render={(props) => <OneTask {...props} />}
        />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
