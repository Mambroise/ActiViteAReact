import React, { useState, useEffect } from 'react'
import { axiosPost,axiosGet } from '../../CommunFunctions/axiosFunction';
import getCurrentUser from '../../Login/getCurrentUser'
import { useNavigate } from 'react-router-dom';

function WorkAd() {

    const workAdData = {
        id : '',
        work_ad : ''
    }

    const [workAd, setWorkAd] =useState(workAdData);
    const [ phone, setPhone ] = useState([])
    const [ address, setAddress ] = useState([])
    const [ cursus, setCursus ] = useState([])
    const [ proExp, setProExp ] = useState([])
    const [ language, setLanguage ] = useState([])
    const [ lifeExp, setLifeExp ] = useState([])
    const [ skill, setSkill ] = useState([])
    const [ error,setError ] = useState(null);
    const [ success,setSuccess ] = useState(null);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

     //Redirection if not logged in
     useEffect(() => {
        currentUser === null && navigate("/")
      }, [currentUser])

      useEffect(() => {
        currentUser && getAllData()
        getAllData()
    }, [])
    

    
    const getAllData = () => {
       // ===== get phone number from user data ===== //
      axiosGet("prophone", currentUser.id)
      .then(response=>{
        setPhone(response.data[0].phone)
      })
      .catch(error=>{
        console.log("prophone ",error.message);
      })
      
       // ===== get Address from user data ===== //
      axiosGet("address", currentUser.id)
      .then(response=>{
        setAddress(response.data)
      })
      .catch(error=>{
        console.log("address ",error.message);
      })

        // ===== get Cursus from user data ===== //
      axiosGet("cursus", currentUser.id)
      .then(response=>{
        setCursus(response.data)
      })
      .catch(error=>{
        console.log("cursus ",error.message);
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

    //submit the workAd form apres fetching all users infos 
    const handleSubmit = e => {
        e.preventDefault()
        localStorage.setItem("phone", JSON.stringify(phone))
        localStorage.setItem("address", JSON.stringify(address))
        localStorage.setItem("cursus", JSON.stringify(cursus))
        localStorage.setItem("language", JSON.stringify(language))
        localStorage.setItem("proExp", JSON.stringify(proExp))
        localStorage.setItem("lifeExp", JSON.stringify(lifeExp))
        localStorage.setItem("skill", JSON.stringify(skill))
        
        axiosPost("coverletter", workAd)
        .then(response => {
            setError(null)
            setSuccess(response.data)
        })
        .catch(error => {
            console.log(error);
        })
        setTimeout(() => {
          
          // ===== get the work ad and coverletter id previously saved and created ===== //
          axiosGet("last-coverletter", currentUser.id)
          .then(response=>{
              localStorage.setItem("coverletter", JSON.stringify([response.data.id,workAd]));
              navigate("/generatecoverletter")
          })
          .catch(error=>{
              console.log("coverletter ",error.message);
          })
        }, 1000);
    }

      const handleChange = e => {
          setWorkAd({...workAd,
              work_ad : e.target.value,
              userId : currentUser.id
          })
      }

    //success message display
    const successMsg = success !== null &&<div className='successMsg '>{success}</div>

    //error message display
    const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

    // submit button management
    const  btn =  workAd.work_ad !== '' ? <button type='submit' className='btn margin-auto'>Go!</button> :
    <button className='btn margin-auto' disabled>Go!</button>

  return (
    <div className='main'>
        <div className=''></div>
        <div className='slContainer signupFromContainer'>
            <h2>Copie/colle l'annonce de la société cible</h2>
            {successMsg}
            {errorMsg}
            <form onSubmit={handleSubmit} className='signupFromContainer' >
            <textarea
              className='workAdInput'
              onChange={handleChange}
              placeholder="Dépose l'annonce ici"
              value={workAd.work_ad}
              required
            ></textarea>
               {btn}
            </form>
        </div>
        <div className=''></div>
    </div>
  )
}

export default WorkAd