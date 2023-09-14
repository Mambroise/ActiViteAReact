import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import languages from '../../Register/languages.json';
import levels from '../../Register/languageLevel.json';
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'


function MyLanguage(props) {

    const languageData = {
        id : '',
        language : '',
        stars : '',
        userId : ''
       }


const currentUserId = getCurrentUser().id;
const [ languageTable, setLanguageTable ] = useState([]);
const [ displayLanguageUpdate, setDisplayLanguageUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const navigate = useNavigate()
//udapte declaration part
const [ selectedLanguage,setSelectedLanguage ] = useState(languageData);
const { language, stars } = selectedLanguage;
const box = useRef()



//phone numbers display
useEffect(()=>{
    getLanguage()
},[])

const getLanguage = () =>{
    axiosGet('language',currentUserId)
    .then(response=>{
        setLanguageTable(response.data)
        console.log("coucou");
    })
    .catch(error=>{
        setError(error.message)
    })
}

//phones delete management
const handleDelete = e => {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer cette langue ?");
    if (userConfirmed) {
        axiosDelete('language', e.target.id)
        .then(response=>{
            getLanguage()
            setError(null)
            setSuccess(response.data)
        })
        .catch(error=>{
            setError(error.message)
            setSuccess(null)
        })
    }
}

//*********  update managemenet*********//
//email input update management
const handleUpdate = e => {
    setSuccess(null)
    const IdToUpdate = e.target.id;
    const ToUpdate = languageTable.find((language) => language.id == IdToUpdate);
    setSelectedLanguage({
        id : ToUpdate.id,
        language : ToUpdate.language,
        stars : ToUpdate.stars,
        userId : currentUserId
    })
    setDisplayLanguageUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setSelectedLanguage({...selectedLanguage,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        userId : currentUserId 
    })
}

//submit update email
const handleSubmit = e => {
    console.log();
    e.preventDefault();
    axiosPut("language",selectedLanguage.id, selectedLanguage)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setSelectedLanguage(languageData);
        getLanguage();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayLanguageUpdate(false);
        }, 1500);
    })
    .catch((error) => {
        setError(error.message);
    });
}

//go to add an email page
const goToAddPage =()=>{
    navigate('/register2')
    props.handleCloseWindow()
}

//success message display
const successMsg = success !== null &&<div className='successMsg '>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

// submit button management
const  btn =  language !== '' || stars !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayBlock = displayLanguageUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
            <div ref={box}>
                <div  className='languageBox'>
                    <label htmlFor='language'>Sélectionnez une langue : </label>
                    <select id='language' value={language} onChange={handleChange}>
                        <option value="">Sélectionnez une langue</option>
                        {languages.map((lang) => (
                        <option key={language.id} value={lang.language}>
                        {lang.language}
                        </option>
                        ))}
                    </select>
                </div>
                <div  className='languageBox'>
                    <label htmlFor='stars'>Sélectionnez un niveau : </label>
                    <select id='stars' value={stars} onChange={handleChange}>
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
                </div>
            </form>
        </div>
        <hr/>
    </>
)


  return (
    <div className='align-center margin-auto'>
        {successMsg}
        {errorMsg}
        <button  onClick={props.handleCloseBtn} className='btnAddData float-right'>Fermer</button>
        {ifNoData(languageTable)}
        <table className='profileTable'>
            <tbody>
                {languageTable.map((language)=>(
                    <tr key={language.id}>
                        <td>{language.language}</td>
                        <td>{language.stars}</td>
                        <td><img onClick={handleUpdate} id={language.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={language.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter une expérience</button>
        {displayBlock}
    </div>
  )
}

export default MyLanguage