import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./views/home";
import Meet from "./views/meet";
import './app.css'
import { removeSession } from './utils/fb'

export default class App extends Component {

  onBeforeUnload = e => { // the method that will be used for both add and remove event
    e.preventDefault();
    e.returnValue = '';
    return false;
  }

  onUnload = e => { // the method that will be used for both add and remove event
    const apartment = window.sessionStorage.getItem("apartment")
    const assembly = window.sessionStorage.getItem("assembly")
    removeSession(apartment, assembly)
    return false;
  }

  componentDidMount() {
    const apartment = window.sessionStorage.getItem("apartment")
    const assembly = window.sessionStorage.getItem("assembly")
    removeSession(apartment, assembly)
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