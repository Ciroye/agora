import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
