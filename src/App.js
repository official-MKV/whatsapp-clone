import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import { StateContext, StateProvider, useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue(); 
  return (
    <div className="app">
      {!user?( <Login/>)
      :(
        <div className="app__body">
        <Routes>
          <Route path="/rooms" element={<Sidebar />} />
          <Route path="/rooms/:roomId" element={[<Sidebar />, <Chat />]}>
  
          </Route>
          <Route path="/" element={<h1>I love home</h1>}>
  
          </Route>
        </Routes>
      </div >
      )}
      
    </div>
      );

}


export default App;

 