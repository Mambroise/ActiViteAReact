import React, { useState,useRef } from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'

function RegisterLifeExp() {

   const lifeExpData = {
    content : '',
    userId : ''
    
   }

const [ lifeExp,setLifeExp ] = useState(lifeExpData)
const [ error,setError ] = useState(null)
const [ success,setSuccess ] = useState(null)
const [ disable,setDisable ] = useState(false)
const { content } = lifeExp;
const currentUser = getCurrentUser();
const box = useRef()


const handleChange = e =>{
    setLifeExp({
        content : e.target.value,
        userId : currentUser.id  
    })
}

const handleSubmit =e=>{
    e.preventDefault();
    axiosPost("lifeexp", lifeExp)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setLifeExp(lifeExpData);
        setDisable(true)
        box.current.classList.add('blurry')
    })
    .catch((error) => {
        setError(error.message);
        setLifeExp(lifeExpData);
    });
}

const handleClick =() =>{
    box.current.classList.remove('blurry')
    setSuccess(null)
    setError(null)
    setDisable(false)
}


// submit button management
const btn =  content !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//success message display
const successMsg = success !== null &&<div className='successMsg'>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

  return (
    <div className='registerFormContainer'>
        <p className='align-center'><strong>Expérience de vie:</strong></p>
        <p className='align-center margin-auto'><small>Tu deiriges une association, tu es champion d'horthographe</small></p>
        {successMsg}
        {errorMsg}
        <form onSubmit={handleSubmit}>
            <div ref={box} className='inputBox'>
                <input onChange={handleChange}
                 type='text' id='content' value={content}
                  autoComplete='off' disabled={disable} required/>
                <label htmlFor='content'>Expérience (une ligne)</label>
            </div>
            <div className='registerBtnBox'>
                {btn}
                <button className='btnAddData' onClick={handleClick}>Ajouter un email</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterLifeExp