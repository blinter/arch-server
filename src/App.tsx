import React, { Component } from "react";
import TaskComponent from './components/TaskComponent'

const App = () => {

  return (
    <div>
      <h1>Todo Lists</h1>
      <TaskComponent hierarchicalLevel={1} />
    </div>
  );
}

export default App;