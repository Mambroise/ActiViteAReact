import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import InvalidJwt from '../../CommunFunctions/invalidJwt'
import getCurrentUser from '../../Login/getCurrentUser'
import { axiosGet } from '../../CommunFunctions/axiosFunction';

function SelectData() {
    const navigate = useNavigate();
    const [invalidJwt, setInvalidJwt] = useState(false);
    const [ phone, setPhone ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ address, setAddress ] = useState({});
    const [ cursus, setCursus ] = useState([]);
    const [ proExp, setProExp ] = useState([]);
    const [ language, setLanguage ] = useState([]);
    const [ lifeExp, setLifeExp ] = useState([]);
    const [ skill, setSkill ] = useState([]);

    //jwt invalid logout handling
    const logout = invalidJwt && <InvalidJwt/>

    const currentUser = getCurrentUser();

    useEffect(() => {
        currentUser === null && navigate("/")
        getAllData()
    }, [])
    

    //go to next form page
    const goToCoverletterPage =()=>{
       navigate('/register2')
    }

    const getAllData = () => {
        // ===== get phone number from user data ===== //
       axiosGet("contactdata", currentUser.id)
       .then(response=>{
         setPhone(response.data.phone);
         setEmail(response.data.email);
         setAddress(response.data.address)
       })
       .catch(error=>{
         if (error.response.data.message == 'Invalid JWT token') {
           setInvalidJwt(true) 
         } else {
           console.log("prophone ",error.message);
          }
       })
       
 
         // ===== get Cursus from user data ===== //
       axiosGet("cursus", currentUser.id)
       .then(response=>{
         setCursus(response.data)
       })
       .catch(error=>{
         console.log("cursus", error.message);
       })
 
        // ===== get profesional experiences from user data =====//
       axiosGet("proexp", currentUser.id)
       .then(response=>{
         setProExp(response.data)
       })
       .catch(error=>{
         console.log("proexp ",error.message);
       })
       
        // ===== get Language from user data ===== //
       axiosGet("language", currentUser.id)
       .then(response=>{
         setLanguage(response.data)
       })
       .catch(error=>{
         console.log("language ",error.message);
       })
 
        // ===== get life experiences from user data ===== //
       axiosGet("lifeexp", currentUser.id)
       .then(response=>{
         setLifeExp(response.data)
       })
       .catch(error=>{
         console.log("lifeexp", error.message);
       })
 
       // ===== get skills from user data ===== //
       axiosGet("skill", currentUser.id)
       .then(response=>{
         setSkill(response.data)
       })
       .catch(error=>{
         console.log("skill ",error.message);
       })
     }

  return (
    <div>
        <h2>Données Personnelles</h2>
        <p className='align-center'>Veuillez remplir les champs ci-dessous.</p>
        <div className='container'>
        {logout}
            <div className='slContainer'>
           
            </div>
            <div className='slContainer'>
               
                <button className='btnNavigation float-right' onClick={goToCoverletterPage}>Page suivante</button>
            </div>
        </div>
    </div>
  )
}

export default SelectData