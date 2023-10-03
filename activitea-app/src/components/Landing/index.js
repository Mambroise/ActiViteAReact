import React from 'react'
import { Link } from 'react-router-dom'
import getCurrentUser from '../Login/getCurrentUser'

function Landing() {

 //verify wether there is a logged in user
const currentUser = getCurrentUser()

// sign up management
const signUpButton = currentUser ? <Link className='landingGoLink' to='/register1'><i>Ajouter des Données!</i></Link> :
<Link className='landingSignupLink' to='/signup'><i>Je m'inscris</i></Link>

// sign up management
const gptButton = currentUser && <Link  className='landingGptLink' to='/addworkad'>GPT</Link>

  return (
    <main className='landingBg'>
      <div className='landingLeftBox'>
        {signUpButton}
      </div>
      <div className='landingRightBox'>
        {gptButton}
        <h1>Tes lettres de motivation pensées par Chat GPT</h1>
      </div>
    </main>
  )
}

export default Landing