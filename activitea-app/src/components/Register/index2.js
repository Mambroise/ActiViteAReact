import React from 'react'
import RegisterLanguage from './registerLanguage'
import RegisterLifeExp from './registerLifeExp'
import RegisterProSkill from './registerProSkill'

function RegisterPart2() {
  return (
    <>
    <h2>Données Personnelles</h2>
    <p className='align-center'>Veuillez remplir les champs si dessous.</p>
<div className='container'>
    <div className='slContainer'>
        <RegisterLanguage/>
        <RegisterLifeExp/>
        <RegisterProSkill/>
    </div>
</div>
</>
  )
}

export default RegisterPart2