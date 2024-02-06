import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'
import { dateValidation } from '../../Validation'
import InvalidJwt from '../../CommunFunctions/invalidJwt'


function MyCursus(props) {

    const cursusData = {
        id : '',
        school : '',
        diploma : '',
        date : '',
        userId : ''
       }


const currentUserId = getCurrentUser().id;
const [ cursusTable, setCursusTable ] = useState([]);
const [ displayCursusUpdate, setDisplayCursusUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [ validation,setValidation ] = useState(false);
const [invalidJwt, setInvalidJwt] = useState(false);
const navigate = useNavigate()
//udapte declaration part
const [ cursus,setCursus ] = useState(cursusData);
const { school, diploma, date } = cursus;
const box = useRef()



//cursus numbers display
useEffect(()=>{
 getCursus()
},[])

//jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

const getCursus = () =>{
    axiosGet('cursus',currentUserId)
    .then(response=>{
        setCursusTable(response.data)
    })
    .catch(error=>{
        if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
                window.location.reload();
            }, 500);
        } else { 
            setError(error.message)
        }
    })
}

//cursus delete management
const handleDelete = e => {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer ce cursus ?");
    if (userConfirmed) {
        axiosDelete('cursus', e.target.id)
        .then(response=>{
            getCursus()
            setError(null)
            setSuccess(response.data)
        })
        .catch(error=>{
            if (error.response.data.message == 'Invalid JWT token') {
                setInvalidJwt(true)
                setTimeout(() => {  
                    props.handleCloseWindow()
                    window.location.reload();
                }, 500);
            } else {   
                setError(error.response.data)
                setSuccess(null)
            }
        })
    }
}

//*********  update managemenet*********//
//email input update management
const handleUpdate = e => {
    setSuccess(null)
    const IdToUpdate = e.target.id;
    const ToUpdate = cursusTable.find((cursus) => cursus.id == IdToUpdate);
    setCursus({
        id : ToUpdate.id,
        school : ToUpdate.school,
        diploma : ToUpdate.diploma,
        date : ToUpdate.date,
        userId : currentUserId
    })
    setDisplayCursusUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setCursus({...cursus,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        userId : currentUserId 
    })
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

//submit update email
const handleSubmit = e => {
    e.preventDefault();
    axiosPut("cursus",cursus.id, cursus)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setCursus(cursusData);
        getCursus();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayCursusUpdate(false);
        }, 1500);
    })
    .catch((error) => {
        if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
                window.location.reload();
            }, 500);
        } else { 
            setError(error.response.data);
        }
    });
}

//go to add an email page
const goToAddPage =()=>{
    navigate('/register1')
    props.handleCloseWindow()
}

//success message display
const successMsg = success !== null &&<div className='successMsg '>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

// submit button management
const  btn =  school !== '' || diploma !== '' || validation ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayBlock = displayCursusUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
                <div ref={box}>
                    <div  className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='school' value={school}
                        autoComplete='off'  required/>
                        <label htmlFor='school'>Etablissement</label>
                    </div>
                    <div  className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='diploma' value={diploma}
                        autoComplete='off' required/>
                        <label htmlFor='diploma'>Intitulé du diplôme</label>
                    </div>
                    <div className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='date' value={date}
                        autoComplete='off'  required/>
                        <label htmlFor='date'>Date d'obtention (yyyy-mm-dd) </label>
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
        {logout}
        {successMsg}
        {errorMsg}
        <button  onClick={props.handleCloseBtn} className='btnAddData float-right'>Fermer</button>
        {ifNoData(cursusTable)}
        <table className='profileTable'>
            <tbody>
                {cursusTable.map((cursus)=>(
                    <tr key={cursus.id}>
                        <td>{cursus.school}</td>
                        <td>{cursus.diploma}</td>
                        <td>{cursus.date}</td>
                        <td><img onClick={handleUpdate} id={cursus.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={cursus.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter un curus</button>
        {displayBlock}
    </div>
  )
}

export default MyCursus