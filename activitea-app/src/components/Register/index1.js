import React, {useState} from 'react'
import RegisterEmailPro from './registerEmail'
import RegisterPhone from './registerPhone'
import RegisterAddress from './registerAddress'
import RegisterCursus from './registerCursus'
import RegisterProExp from './registerProExp'
import { useNavigate } from 'react-router-dom'
import InvalidJwt from '../CommunFunctions/invalidJwt'

function RegisterPart1(props) {
  const [invalidJwt, setInvalidJwt] = useState(false);
  const navigate = useNavigate()

  //jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

const isVisible = () =>{
  navigate("/");
  setInvalidJwt(true);
}


  //go to next form page
  const goToPage2 =()=>{
    navigate('/register2')
}
  return (
    <>
        <h2>Données Personnelles</h2>
        <p className='align-center'>Veuillez remplir les champs ci-dessous.</p>
    <div className='container'>
      {logout}
        <div className='slContainer'>
            <RegisterEmailPro handleVisible ={isVisible}/> 
            <RegisterPhone handleVisible ={isVisible}/>
            <RegisterAddress handleVisible ={isVisible}/>   
        </div>
        <div className='slContainer'>
            <RegisterCursus handleVisible ={isVisible}/>
            <RegisterProExp handleVisible ={isVisible}/>
            <button className='btnNavigation float-right' onClick={goToPage2}>Page suivante</button>
        </div>
    </div>
    </>
  )
}

export default RegisterPart1