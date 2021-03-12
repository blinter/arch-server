import React from "react";
import PageHome from './pages/PageHome';
import PageTask from './pages/PageTask';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

const App = () => {

  return (
    <div>
      <h1>Todo Lists</h1>
      <Router>
        <Switch>
          <Route exact path="/task/"  component={PageTask} />
          <Route exact path="/task/id/:id"  component={PageTask} />
          <Route path="/" component={PageHome} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;