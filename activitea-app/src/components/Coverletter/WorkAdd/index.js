import React, { useState, useEffect } from 'react'
import { axiosPost } from '../../CommunFunctions/axiosFunction';
import getCurrentUser from '../../Login/getCurrentUser'
import { useNavigate } from 'react-router-dom';

function WorkAd() {

    const workAdData = {
        work_ad : '',
        userId : ''
    }

    const [workAd, setWorkAd] =useState(workAdData);
    const [ error,setError ] = useState(null);
    const [ success,setSuccess ] = useState(null);
    const currentUser = getCurrentUser();
    const navigate = useNavigate();

     //Redirection if not logged in
     useEffect(() => {
        currentUser === null && navigate("/")
      }, [currentUser])

    const handleSubmit = e => {
        e.preventDefault()
        axiosPost("coverletter", workAd)
        .then(response => {
            setError(null)
            setSuccess(response.data)
            navigate("/generatecoverletter")
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleChange = e => {
        setWorkAd({
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