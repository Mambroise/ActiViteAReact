import React from 'react'
import RegisterLanguage from './registerLanguage'
import RegisterLifeExp from './registerLifeExp'
import RegisterProSkill from './registerProSkill'
import { useNavigate } from 'react-router-dom'

function RegisterPart2() {
  const navigate = useNavigate()

  const handleFormerPage =()=>{
    navigate("/register1")
  }

  const handleFinish =()=>{
    navigate("/")
  }

  return (
    <>
      <h2>Données Personnelles</h2>
      <p className='align-center'>Veuillez remplir les champs ci-dessous.</p>
      <div className='container'>
          <div className='slContainer'>
              <RegisterLanguage/>
              <RegisterLifeExp/>
              <RegisterProSkill/>
              <div className='flex-between'>
                <button onClick={handleFormerPage} className='btnNavigation'>Page précédente</button>
                <button onClick={handleFinish} className='btnNavigation'>Terminer</button>
              </div>
          </div>
      </div>
    </>
  )
}

export default RegisterPart2