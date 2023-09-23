import React, {useState, useRef,useEffect} from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'
import { dateValidation } from '../Validation'

function RegisterCursus() {
    const cursusData = {
        school : '',
        diploma : '',
        date : '',
        userId : ''
        
       }
    
    const [ cursus,setCursus ] = useState(cursusData)
    const [ error,setError ] = useState(null)
    const [ success,setSuccess ] = useState(null)
    const [ disable,setDisable ] = useState(false)
    const [ validation,setValidation ] = useState(false)
    const { school, diploma, date } = cursus;
    const currentUser = getCurrentUser();
    const box = useRef()
    
    
    const handleChange = e =>{
        setCursus({...cursus, [e.target.id] : e.target.value, userId :currentUser.id  })
    }

    //Validation, checking date format
useEffect(() => {
    if (date.length > 0) {
        if (dateValidation(date)) {
            setError(null)
            setValidation(true)
        } else if (!dateValidation(date)){
            setError("veuillez à respecter le format indiqué des dates")
            setValidation(false)
        }
    } else if(date === ''){
        setError(null)
        setValidation(false)
    }
}, [date])
    
    const handleSubmit =e=>{
        e.preventDefault();
        axiosPost("cursus", cursus)
        .then((response) => {
            setError(null)
            setSuccess(response.data);
            setCursus(cursusData);
            setDisable(true)
            box.current.classList.add('blurry')
        })
        .catch((error) => {
            setError(error.message);
            setCursus(cursusData);
        });
    }
    
    const handleClick =() =>{
        box.current.classList.remove('blurry')
        setSuccess(null)
        setError(null)
        setDisable(false)
    }
    
    
    // submit button management
    const btn =  school !== '' || diploma !== '' || validation ? <button type='submit' className='btn'>Go!</button> :
    <button className='btn' disabled>Go!</button>
    
    //success message display
    const successMsg = success !== null && <div className='successMsg '>{success}</div>
    
    //error ùessage display
    const errorMsg = error !== null && <div className='errorMsg'>{error}</div>
  return (
    <div className='registerFormContainer'>
        <p className='align-center'><strong>Etudes:</strong></p>
    {successMsg}
    {errorMsg}
    <form onSubmit={handleSubmit}>
        <div ref={box}>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='text' id='school' value={school}
                autoComplete='off' disabled={disable}  required/>
                <label htmlFor='school'>Etablissement</label>
            </div>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='text' id='diploma' value={diploma}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='diploma'>Intitulé du diplôme</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='text' id='date' value={date}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='date'>Date d'obtention (yyyy-mm-dd) </label>
            </div>
        </div>
        <div className='registerBtnBox'>
            {btn}
            <button className='btnAddData' onClick={handleClick}>Ajouter un cursus</button>
        </div>
    </form>
</div>
  )
}

export default RegisterCursus