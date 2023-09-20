import React from 'react'
import RegisterEmailPro from './registerEmail'
import RegisterPhone from './registerPhone'
import RegisterAddress from './registerAddress'
import RegisterCursus from './registerCursus'
import RegisterProExp from './registerProExp'
import { useNavigate } from 'react-router-dom'

function RegisterPart1() {
  const navigate = useNavigate()

  //go to next form page
  const goToPage2 =()=>{
    navigate('/register2')
}
  return (
    <>
        <h2>Données Personnelles</h2>
        <p className='align-center'>Veuillez remplir les champs ci-dessous.</p>
    <div className='container'>
        <div className='slContainer'>
            <RegisterEmailPro/> 
            <RegisterPhone/>
            <RegisterAddress/>   
        </div>
        <div className='slContainer'>
            <RegisterCursus/>
            <RegisterProExp/>
            <button className='btn float-right' onClick={goToPage2}>Page suivante</button>
        </div>
    </div>
    </>
  )
}

export default RegisterPart1