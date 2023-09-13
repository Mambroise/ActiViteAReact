import React from 'react'

function Logout() {

const handleClick = () =>{
    localStorage.removeItem('currentUser')
}

  return (
    <a className='headerLink' href='/' onClick={handleClick}>Déconnexion</a>
  )
}

export default Logout