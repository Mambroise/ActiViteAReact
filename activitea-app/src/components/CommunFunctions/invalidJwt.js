import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InvalidJwt() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    // Call the logout function when the component mounts
    logout();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // Render some content if needed (e.g., a message)
  return <div>Invalid JWT</div>;
}

export default InvalidJwt;
