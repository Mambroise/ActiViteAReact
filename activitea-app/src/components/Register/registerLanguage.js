import React, { useState,useRef } from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'
import levels from './../../languageLevel.json';
import languages from './../../languages.json';


function RegisterLanguage() {

   const languageData = {
    language : '',
    stars : '',
    userId : ''
   }

const [ selectedLanguage,setSelectedLanguage ] = useState(languageData)
const [ error,setError ] = useState(null)
const [ success,setSuccess ] = useState(null)
const [ disable,setDisable ] = useState(false)
const { language, stars } = selectedLanguage;
const currentUser = getCurrentUser();
const box = useRef()


const handleChange = e =>{
    setSelectedLanguage({...selectedLanguage, [e.target.id] : e.target.value,
        userId : currentUser.id  
    })
}

const handleSubmit =e=>{
    console.log(selectedLanguage);
    e.preventDefault();
    axiosPost("language", selectedLanguage)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setSelectedLanguage(languageData);
        setDisable(true)
        box.current.classList.add('blurry')
    })
    .catch((error) => {
        setError(error.message);
        setSelectedLanguage(languageData);
    });
}

const handleClick =() =>{
    box.current.classList.remove('blurry')
    setSuccess(null)
    setError(null)
    setDisable(false)
}


// submit button management
const btn =  language !== '' ? <button type='submit' className='btn'>Go!</button> :
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
            <div ref={box}>
                <div  className='languageBox'>
                    <label>Sélectionnez une langue : </label>
                    <select id='language' value={language} onChange={handleChange} disabled={disable}>
                        <option value="">Sélectionnez une langue</option>
                        {languages.map((lang) => (
                        <option key={language.id} value={lang.language}>
                        {lang.language}
                        </option>
                        ))}
                    </select>
                </div>
                <div  className='languageBox'>
                    <label>Sélectionnez un niveau : </label>
                    <select id='stars' value={stars} onChange={handleChange} disabled={disable}>
                        <option value="">Sélectionnez une langue</option>
                        {levels.map((level) => (
                        <option key={language.id} value={level.value}>
                        {level.level}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='registerBtnBox'>
                {btn}
                <button className='btnAddData' onClick={handleClick}>Ajouter une langue</button>
            </div>
        </form>
    </div>
  )
}

export default RegisterLanguage