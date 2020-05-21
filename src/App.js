import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/home";
import Meet from "./views/meet";
import './app.css'

export default class App extends Component {

  onUnload = e => { // the method that will be used for both add and remove event
    e.preventDefault();
    e.returnValue = '';
    return false;
  }
  
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
  }

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