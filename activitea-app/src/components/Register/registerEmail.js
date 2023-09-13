import React, { useState,useRef } from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'

function RegisterEmailPro() {

    const proEmailData = {
    proEmail : '',
    userId : ''
   }

const [ email,setEmail ] = useState(proEmailData)
const [ error,setError ] = useState(null)
const [ success,setSuccess ] = useState(null)
const [ disable,setDisable ] = useState(false)
const { proEmail } = email;
const currentUser = getCurrentUser();
const box = useRef()



const handleChange = e =>{
    setEmail({
        proEmail : e.target.value,
        userId : currentUser.id  
    })
}
// submit create email
const handleSubmit =e=>{
    e.preventDefault();
    axiosPost("proemail", email)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setEmail(proEmailData);
        setDisable(true)
        box.current.classList.add('blurry')
    })
    .catch((error) => {
        setError(error.message);
        setEmail(proEmailData);
    });
}

const handleClick =() =>{
    box.current.classList.remove('blurry')
    setSuccess(null)
    setError(null)
    setDisable(false)
}

    
    // submit button management
  const  btn =  proEmail !== '' ? <button type='submit' className='btn'>Go!</button> :
    <button className='btn' disabled>Go!</button>


//success message display
const successMsg = success !== null &&<div className='successMsg '>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

  return (
    <div className='registerFormContainer'>
        {successMsg}
        {errorMsg}
        <form onSubmit={handleSubmit}>
            <div ref={box} className='inputBox'>
                <input onChange={handleChange}
                 type='email' id='email' value={proEmail}
                  autoComplete='off' disabled={disable} required/>
                <label htmlFor='email'>Email</label>
            </div>
            <div className='registerBtnBox'>
                {btn}
                <button className='btnAddData' onClick={handleClick}>Ajouter un email</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterEmailPro