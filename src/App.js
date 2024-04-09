import React from 'react'
import './App.css';
import CountDowmTimer from './CountDownTimer';
import UserList from './UserList';
import {HashRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
        <Route exact path='/' element={<CountDowmTimer/>}></Route>
          <Route exact path='/user' element={<UserList/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
