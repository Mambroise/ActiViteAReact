import React, {useState, useRef} from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'

function RegisterProExp() {
    const proExpData = {
        company : '',
        title : '',
        startDate : '',
        endDate : '',
        userId : ''
        
       }
    
    const [ proExp,setProExp ] = useState(proExpData)
    const [ error,setError ] = useState(null)
    const [ success,setSuccess ] = useState(null)
    const [ disable,setDisable ] = useState(false)
    const { company, title, startDate, endDate } = proExp;
    const currentUser = getCurrentUser();
    const box = useRef()
    
    
    const handleChange = e =>{
        setProExp({...proExp, [e.target.id] : e.target.value, userId :currentUser.id  })
    }
    
    const handleSubmit =e=>{
        e.preventDefault();
        axiosPost("proexp", proExp)
        .then((response) => {
            setError(null)
            setSuccess(response.data);
            setProExp(proExpData);
            setDisable(true)
            box.current.classList.add('blurry')
        })
        .catch((error) => {
            setError(error.message);
            setProExp(proExpData);
        });
    }
    
    const handleClick =() =>{
        box.current.classList.remove('blurry')
        setSuccess(null)
        setError(null)
        setDisable(false)
    }
    
    
    // submit button management
    const btn =  company !== '' || title !== '' || startDate !=='' ? <button type='submit' className='btn'>Go!</button> :
    <button className='btn' disabled>Go!</button>
    
    //success message display
    const successMsg = success !== null &&<div className='successMsg '>{success}</div>
    
    //error ùessage display
    const errorMsg = error !== null && <div className='errorMsg'>{error}</div>
  return (
    <div className='registerFormContainer'>
        <p className='align-center'><strong>Expériences Professionnelles:</strong></p>
    {successMsg}
    {errorMsg}
    <form onSubmit={handleSubmit}>
        <div ref={box}>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='text' id='company' value={company}
                autoComplete='off' disabled={disable}  required/>
                <label htmlFor='company'>Société</label>
            </div>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='text' id='title' value={title}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='title'>Poste</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='text' id='startDate' value={startDate}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='startDate'>Date début (yyyy-mm-dd)</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='text' id='endDate' value={endDate}
                autoComplete='off' disabled={disable}/>
                <label htmlFor='endDate'>Date fin (yyyy-mm-dd)</label>
            </div>
        </div>
        <div className='registerBtnBox'>
            {btn}
            <button className='btnAddData' onClick={handleClick}>Ajouter une expérience</button>
        </div>
    </form>
</div>
  )
}

export default RegisterProExp