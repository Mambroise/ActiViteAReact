import React from 'react'

function Logout() {

const handleClick = () =>{
    localStorage.removeItem('currentUser')
}

  return (
    <li className='headerLink' href='/' onClick={handleClick}>Déconnexion</li>
  )
}

export default Logout