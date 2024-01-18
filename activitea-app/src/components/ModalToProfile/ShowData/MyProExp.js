import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'
import InvalidJwt from '../../CommunFunctions/invalidJwt'


function MyProExp(props) {

    const proExpData = {
        id : '',
        company : '',
        title : '',
        startDate : '',
        endDate : '',
        userId : ''
       }


const currentUser = getCurrentUser();
const [ proExpTable, setProExpTable ] = useState([]);
const [ displayProExpUpdate, setDisplayProExpUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [invalidJwt, setInvalidJwt] = useState(false);
const navigate = useNavigate()
//udapte declaration part
const [ proExp,setProExp ] = useState(proExpData);
const { company, title, startDate, endDate } = proExp;
const box = useRef()



//phone numbers display
useEffect(()=>{
    getProExp()
},[])

//jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

const getProExp = () =>{
    axiosGet('proexp',currentUser.id)
    .then(response=>{
        setProExpTable(response.data)
    })
    .catch(error=>{
        if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
            }, 2000);
        } else { 
            setError(error.response.data.message);
        }
    })
}

//phones delete management
const handleDelete = e => {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer cette expérience professionnelle ?");
    if (userConfirmed) {
        axiosDelete('proexp', e.target.id)
        .then(response=>{
            getProExp()
            setError(null)
            setSuccess(response.data)
        })
        .catch(error=>{
            setSuccess(null)
            if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
            }, 2000);
            } else { 
            setError(error.response.data.message);
           }
        })
    }
}

//*********  update managemenet*********//
//email input update management
const handleUpdate = e => {
    setSuccess(null)
    const IdToUpdate = e.target.id;
    const ToUpdate = proExpTable.find((proExp) => proExp.id == IdToUpdate);
    setProExp({
        id : ToUpdate.id,
        company : ToUpdate.company,
        title : ToUpdate.title,
        startDate : ToUpdate.startDate,
        endDate : ToUpdate.endDate,
        userId : currentUser.id
    })
    setDisplayProExpUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setProExp({...proExp,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        userId : currentUser.id 
    })
}

//submit update email
const handleSubmit = e => {
    e.preventDefault();
    axiosPut("proexp",proExp.id, proExp)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setProExp(proExpData);
        getProExp();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayProExpUpdate(false);
        }, 1500);
    })
    .catch((error) => {
        setSuccess(null)
        if (error.response.data.message == 'Invalid JWT token') {
        setInvalidJwt(true)
        setTimeout(() => {  
            props.handleCloseWindow()
        }, 2000);
        } else { 
        setError(error.response.data.message);
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
const  btn =  company !== '' || title !== '' || startDate !== '' || endDate !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayBlock = displayProExpUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
                <div ref={box}>
                    <div  className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='company' value={company}
                        autoComplete='off'  required/>
                        <label htmlFor='company'>Société</label>
                    </div>
                    <div  className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='title' value={title}
                        autoComplete='off' required/>
                        <label htmlFor='title'>Poste</label>
                    </div>
                    <div className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='startDate' value={startDate}
                        autoComplete='off' required/>
                        <label htmlFor='startDate'>Date début (yyyy-mm-dd)</label>
                    </div>
                    <div className='inputBox'>
                        <input onChange={handleChange}
                        type='text' id='endDate' value={endDate}
                        autoComplete='off'/>
                        <label htmlFor='endDate'>Date fin (yyyy-mm-dd)</label>
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
        {ifNoData(proExpTable)}
        <table className='profileTable'>
            <tbody>
                {proExpTable.map((proExp)=>(
                    <tr key={proExp.id}>
                        <td>{proExp.company}</td>
                        <td>{proExp.title}</td>
                        <td>{proExp.startDate}</td>
                        <td>{proExp.endDate}</td>
                        <td><img onClick={handleUpdate} id={proExp.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={proExp.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter une expérience</button>
        {displayBlock}
    </div>
  )
}

export default MyProExp