import React from 'react'

function Logout() {

const handleClick = () =>{
    localStorage.removeItem('currentUser')
    window.location.reload();
}

  return (
    <li className=' align-center' href='/' onClick={handleClick}>Déconnexion</li>
  )
}

export default Logout