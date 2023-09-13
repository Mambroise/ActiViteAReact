
import '../../App.css';
import Header from '../Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../Landing';
import Login from '../Login';
import Signup from '../Signup';
import RegisterPart1 from '../Register/index1';
import RegisterPart2 from '../Register/index2';
import ModalToProfile from '../ModalToProfile';
import { useState } from 'react';

function App() {

const [display, setDisplay] = useState(false);

const handleDisplay = () =>{
  setDisplay(!display)
}

const displayModal = display && <ModalToProfile handleDisplay={handleDisplay}/>
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
        </Routes>
        {displayModal}
      </Router>
    </div>
  );
}

export default App;
