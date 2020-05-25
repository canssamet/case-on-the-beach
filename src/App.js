import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import PerformancePage from './pages/performancePage'

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={PerformancePage}/>
        <Route path="/performancePage" component={PerformancePage}/>
        </Switch>
      </div>
    </Router>
  );
}
  