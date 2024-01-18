import React, { useState,useRef } from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'

function RegisterProSkill(props) {

   const proSkillData = {
    skill : '',
    userId : ''
    
   }

const [ proSkill,setProSkill ] = useState(proSkillData)
const [ error,setError ] = useState(null)
const [ success,setSuccess ] = useState(null)
const [ disable,setDisable ] = useState(false)
const { skill } = proSkill;
const currentUser = getCurrentUser();
const box = useRef()


const handleChange = e =>{
    setProSkill({
        skill : e.target.value,
        userId : currentUser.id  
    })
}

const handleSubmit =e=>{
    e.preventDefault();
    axiosPost("skill", proSkill)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setProSkill(proSkillData);
        setDisable(true)
        box.current.classList.add('blurry')
    })
    .catch((error) => {
        if (error.response.data.message == 'Invalid JWT token') {
            props.handleVisible()
          } else { 
              setError(error.response.data.message);
              setProSkill(proSkillData);
          }
    });
}

const handleClick =() =>{
    box.current.classList.remove('blurry')
    setSuccess(null)
    setError(null)
    setDisable(false)
}


// submit button management
const btn =  skill !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//success message display
const successMsg = success !== null &&<div className='successMsg '>{success}</div>

//error ùessage display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

  return (
    <div className='registerFormContainer'>
        {successMsg}
        {errorMsg}
        <form onSubmit={handleSubmit}>
            <div ref={box} className='inputBox'>
                <input onChange={handleChange}
                 type='text' id='skill' value={skill}
                  autoComplete='off' disabled={disable} required/>
                <label htmlFor='skill'>Compétence</label>
            </div>
            <div className='registerBtnBox'>
                {btn}
                <button className='btnAddData' onClick={handleClick}>Ajouter une compétence</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterProSkill