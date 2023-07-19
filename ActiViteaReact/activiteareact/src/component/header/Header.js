import React from 'react'

function Header() {
  return (
    <div className='themeColor'>
        <div className='spreadBox'>
            <div>
                <img src="image/aiBrain.png" alt="Logo" id="logo"/>
                <p id='siteTitle'>ActiViteA</p>
            </div>
            <div className='navBox'>
                <p>"écris moins, postule plus"</p>
            </div>
            <div className='navBox'>
                <a href="#"><p>Se connecter</p></a>
            </div>
        </div>
    </div>
  )
}

export default Header