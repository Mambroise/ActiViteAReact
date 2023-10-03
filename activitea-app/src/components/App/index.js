import React, { useState, lazy, Suspense } from 'react';
import '../../App.css';
import Header from '../Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../Landing';
import Login from '../Login';
import Signup from '../Signup';
import RegisterPart1 from '../Register/index1';
import RegisterPart2 from '../Register/index2';
import WorkAd from '../Coverletter/WorkAdd';
import GeneratedCoverLetter from '../Coverletter/GeneratedCoverLetter';

const LazyModalToProfile = lazy(() => import('../ModalToProfile'));
function App() {
  

const [display, setDisplay] = useState(false);

const handleDisplay = () =>{
  setDisplay(!display)
}

  return (
    <div>
      <Router>
        <Header handleDisplay={handleDisplay}/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/register1' element={<RegisterPart1/>}/>
          <Route path='/register2' element={<RegisterPart2/>}/>
          <Route path='/addworkad' element={<WorkAd/>}/>
          <Route path='/generatecoverletter' element={<GeneratedCoverLetter/>}/>
        </Routes>
        {display && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyModalToProfile handleDisplay={handleDisplay} />
          </Suspense>
        )}
      </Router>
    </div>
  );
}

export default App;
