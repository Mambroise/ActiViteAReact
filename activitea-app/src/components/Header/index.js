import {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import getCurrentUser from '../Login/getCurrentUser'
import Logout from '../Logout'

function Header(props) {
    
//verify wether there is a logged in user
const currentUser = getCurrentUser()
const [isMenuVisible, setMenuVisible] = useState(false);
const currentUserRef = useRef()

const handleMouseOver = () => {
    setMenuVisible(true);
};

const handleMouseOut = (event) => {
    // Check if the mouse is still over the user's name or the menu
    if (!currentUserRef.current.contains(event.relatedTarget)) {
        setMenuVisible(false);
    }
};


//log in management
const loggedInUser = currentUser === null ? (
    <div>
        <h3 className='connexionPosition connect'><Link  to='/login'>connexion</Link></h3>
    </div>
) : (
    <div ref={currentUserRef} onMouseOut={handleMouseOut}>
        <h3 className='connexionPosition'  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>{currentUser.fullname}</h3>
        {isMenuVisible && (
                <ul className='visible' onMouseOut={handleMouseOut}>
                    <li className='connexionPosition align-center' onClick={props.handleDisplay} >
                        Mon profil
                    </li>
                    <Logout />
                </ul>
            )}
        
    </div>
)

  return (
    <header>
        <div className='headerBox'>
            <ul>
                <li>
                    <Link to='/'>
                        <h1><span className='titleColor'>A</span>
                        cti<span>V</span>ite
                        <span className='titleColor'>A</span>
                        </h1>
                    </Link>
                </li>
                <li>
                    <h2 className='accroche'>"Ecris moins, postule plus!"</h2>
                </li>
                <li>
                {loggedInUser}
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header