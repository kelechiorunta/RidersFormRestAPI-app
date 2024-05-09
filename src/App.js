// import logo from './logo.svg';
import React from 'react';
import './App.css';
import AddRidersForm from './AddRidersForm';


function App() {

  return (
    <div className="App">
      <AddRidersForm />
    </div>
  );
}

export default React.memo(App);
