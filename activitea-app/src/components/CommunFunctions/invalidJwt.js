import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InvalidJwt() {
  const navigate = useNavigate();
  const[isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      // Call the logout function when the component mounts
      logout();
      return () => {
        setIsVisible(false);
      }
    }, []); 
    
    const logout = () => {
      navigate('/');
      localStorage.removeItem('currentUser');
      window.scrollTo(0,0);
      setIsVisible(true);
      setTimeout(() => {  
        setIsVisible(false);
      }, 2000);
      setTimeout(() => {  
        window.location.reload();
      }, 2000);
    };

  const message = isVisible && <div className='errorMsg'><p>Vous avez été déconnecté(e) pour inactivité</p></div>

 
  return <>
           {message}
         </>
}    

export default InvalidJwt;
