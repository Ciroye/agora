import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
=======
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
>>>>>>> 1bb1439b4e7c08d403368f540ec74846542f3afb
import Home from "./views/home";
import Meet from "./views/meet";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/meet" component={Meet} />
      </Switch>
    </Router>
  );
}