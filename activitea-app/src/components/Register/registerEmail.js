import React, { useState,useRef,useEffect } from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'
import { emailValidation } from '../Validation'

function RegisterEmailPro(props) {

    const proEmailData = {
    proEmail : '',
    userId : ''
   }

const [ email,setEmail ] = useState(proEmailData)
const [ error,setError ] = useState(null)
const [ success,setSuccess ] = useState(null)
const [ validation,setValidation ] = useState(false)
const [ disable,setDisable ] = useState(false)
const { proEmail } = email;
const box = useRef() 
const currentUser = getCurrentUser();


//Validation, checking email format
useEffect(() => {
    if (email.proEmail.length > 0) {
        if (emailValidation(email.proEmail)) {
            setError(null)
            setValidation(true)
        } else if (!emailValidation(email.proEmail)){
            setError("Merci de respecter le format des emails")
            setValidation(false)
        }
    } else if(email.proEmail === ''){
        setError(null)
        setValidation(false)
    }
}, [email])

//set email when the user is typing
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
        if (error.response.data.message == 'Invalid JWT token') {
            props.handleVisible()
          } else { 
              setError(error.response.data);
              setEmail(proEmailData);
          }
    });
}

//form submission
const handleClick =() =>{
    box.current.classList.remove('blurry')
    setSuccess(null)
    setError(null)
    setDisable(false)
}

    
// submit button management
const  btn =  validation ? <button type='submit' className='btn'>Go!</button> :
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