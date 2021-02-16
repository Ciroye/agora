import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './app.css';
import Home from "./views/home";
import Meet from "./views/meet";

export default class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/meet" component={Meet} />
        </Switch>
      </Router>
    );
  }

}