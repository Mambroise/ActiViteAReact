import { useEffect, useState } from 'react';
import { axiosGet } from '../CommunFunctions/axiosFunction';
import { Link } from 'react-router-dom';
import getCurrentUser from '../Login/getCurrentUser';
import brain from '../../image/aiBrain.png';
import InvalidJwt from '../CommunFunctions/invalidJwt';

function Landing() {
  
  
  const [contactData, setContactData] = useState({});
  const {email,phone} = contactData;
  const [address, setAddress] = useState('');
  const [hasData, setHasData] = useState(null);
  const [hasNoData, setHasNoData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [invalidJwt, setInvalidJwt] = useState(false);

  // verify whether there is a logged-in user
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    currentUser && isExistData();
     userContact();
  }, []);
  
  //jwt invalid logout handling
  const logout = invalidJwt && <InvalidJwt/>

  // check if data has been saved by the user and get the message
  function isExistData() {
    axiosGet('userdata', currentUser.id)
      .then((response) => {
        setHasNoData(null);
        setHasData(response.data);
        if (response.data !== null && response.data.trim() !== '') {
          setTimeout(() => {
            setIsVisible(true);
            setPopUp(true);
          }, 1000);
        }
      })
      .catch((error) => {
        if (error.response.data.message == 'Invalid JWT token') {
          setInvalidJwt(true)
        } else { 
          setHasNoData(error.response.data);
          setHasData(null);
          if (error.response.data !== ' ') {
            setTimeout(() => {
              setIsVisible(true);
              setPopUp(true);
            }, 1000);
          }
        }
      });
  }

  //*css*/`
    function userContact() {
      axiosGet('contactdata', currentUser.id)
      .then((response) => {
          setContactData(response.data);
          setAddress(response.data.address.number +" "+ response.data.address.street)
      })
      .catch((error) =>{
        console.log(error);
      })
    }

  const handleClick = () => {
    setPopUp(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  // sign-up management
  const signUpButton = currentUser ? (
    <Link className='landingAddLink' to='/register1'>
      <i>Ajouter des Données!</i>
    </Link>
  ) : (
    <Link className='landingSignupLink' to='/signup'>
      <i>Je m'inscris</i>
    </Link>
  );

  // gptButton management
  const gptButton = currentUser && <Link className='landingGptLink' to='/addworkad'>GPT</Link>;

  // popup message CSS handling
  const modalCss = hasData !== null ? 'warningMsg' : 'errorMsg';

  // popup div CSS handling
  const popupCss = popUp ? 'popup' : 'popout';

  // hasNoData and hasData message popup handling
  const warningMsg =
    isVisible && (
      <div className={`align-center border ${popupCss}`}>
        <div className={modalCss}>{hasNoData}{hasData}</div>
        <button className='btn' onClick={handleClick}>
          Ok
        </button>
      </div>
    );

    const showData = currentUser ? 
    <div className='proInfoUser'>
      <div className='flex-around'>
        <p>Téléphone : {phone}</p>
        <p>Email : {email}</p>
        <p>Adresse : {address} </p>
      </div>
    </div>
    :
    <div className='proInfoUser'>Inscrivez-vous et ajoutez quelques informations personnelles.</div>

  return (
    <main>
      {showData}
      {logout}
      <div className='landingBg'>
        <div className='landingLeftBox'>
          <img src={brain} alt='cerveau de IA' />
          {signUpButton}
          {gptButton}
          {warningMsg}
        </div>
        <div className='landingRightBox'>
          <h1>Tes lettres de motivation pensées par Chat GPT</h1>
        </div>
      </div>
    </main>
  );
}

export default Landing;
