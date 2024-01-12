import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
const navigate = useNavigate()
const handleClick = () =>{
    localStorage.removeItem('currentUser')
    navigate("/");
    window.location.reload();
}

  return (
    <li className='connexionPosition align-center' href='/' onClick={handleClick}>Déconnexion</li>
  )
}

export default Logout