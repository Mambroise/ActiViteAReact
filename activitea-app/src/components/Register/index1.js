import React from 'react'
import RegisterEmailPro from './registerEmail'
import RegisterPhone from './registerPhone'
import RegisterAddress from './registerAddress'
import RegisterCursus from './registerCursus'
import RegisterProExp from './registerProExp'

function RegisterPart1() {
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
        </div>
    </div>
    </>
  )
}

export default RegisterPart1