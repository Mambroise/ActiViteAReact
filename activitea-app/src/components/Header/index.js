import React from 'react'
import { Link } from 'react-router-dom'
import getCurrentUser from '../Login/getCurrentUser'
import Logout from '../Logout'

function Header(props) {
    
//verify wether there is a logged in user
const currentUser = getCurrentUser()

//log in management
const loggedInUser = currentUser === null ? (
    <div>
        <h2 className='connexionPosition'><Link className='headerLink' to='/login'>connexion</Link></h2>
    </div>
) : (
    <div>
        <h2 onClick={props.handleDisplay} className='connexionPosition'>{currentUser.fullname}</h2>
        <Logout/>
    </div>
)

  return (
    <header>
        <div className='headerBox'>
            <div>
                <Link to='/'>
                    <h1><span className='titleColor'>A</span>
                    cti<span>V</span>ite
                    <span className='titleColor'>A</span>
                    </h1>
                </Link>
            </div>
            <div>
                <h2 className='accroche'>"Ecris moi, postule plus!"</h2>
            </div>
           {loggedInUser}
        </div>
    </header>
  )
}

export default Header