import React from 'react'
import { Link } from 'react-router-dom'
import brain from '../../image/AIBraint.jpg'
import getCurrentUser from '../Login/getCurrentUser'

function Landing() {
  //verify wether there is a logged in user
const currentUser = getCurrentUser()

// sign up management
const signUpButton = currentUser ? <Link className='landingGoLink' to='/register1'><i>Go!</i></Link> :
<Link className='landingSignupLink' to='/signup'><i>Je m'inscris</i></Link>


  return (
    <main>
      <div className='landingLeftBox'>
        <img src={brain} alt='cerveau'/>
        {signUpButton}
      </div>
      <div className='landingRightBox'>
        <h1>Tes lettres de motivation pensées par Chat GPT</h1>
      </div>
    </main>
  )
}

export default Landing