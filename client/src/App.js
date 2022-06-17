import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Header } from './Header/Header';
import { Welcome } from './Welcome/Welcome';
import { Rules } from './Rules/Rules';
import { MachineStrike } from './MachineStrike/MachineStrike';
import './App.css';

export function App() {
  return (
    // <p>Hello World</p>
    <Router>
      <Header/>
      <div className="App">
        <Routes>
          <Route path='/' element={<Welcome/>}/>            
          <Route path='/rules' element={<Rules/>}/>           
          <Route path='/machinestrike' element={<MachineStrike/>}/>     
        </Routes>
      </div>
    </Router>
  );
}
