import React from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList/EmployeeList';

function App() {
  return (
    <div className="container">
      <h1>Employee List</h1>
      <EmployeeList />
    </div>
  );
}

export default App;
