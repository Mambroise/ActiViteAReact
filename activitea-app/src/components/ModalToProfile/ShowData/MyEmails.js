import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'



function MyEmails(props) {

    const proEmailData = {
        id : '',
        proEmail : '',
        userId : ''
       }

const currentUserId = getCurrentUser().id;
const [ emailTable, setEmailTable ] = useState([]);
const [ displayEmailUpdate, setDisplayEmailUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const navigate = useNavigate()
//udapte declaration part
const [ email,setEmail ] = useState(proEmailData);
const { proEmail } = email;
const box = useRef()


//emails display
useEffect(()=>{
 getEmails()
},[])


function getEmails(){
    axiosGet('proemail',currentUserId)
    .then(response=>{
        setEmailTable(response.data)
    })
    .catch(error=>{
        setError(error.message)
    })
}

//emails delete management
function handleDelete(e) {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer cet email ?");
    
    if (userConfirmed) {
        axiosDelete('proemail', e.target.id)
        .then(response=>{
            getEmails()
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
    const emailIdToUpdate = e.target.id;
    const emailToUpdate = emailTable.find((email) => email.id == emailIdToUpdate);
    setEmail({
        id : emailToUpdate.id,
        proEmail : emailToUpdate.proEmail,
        userId : currentUserId
    })
    console.log(email);
    setDisplayEmailUpdate(true);
}

//handle email modification
const handleChange = e =>{
    setEmail({...email,
        proEmail : e.target.value,
        userId : currentUserId  
    })
}


//submit update email
const handleSubmit = e => {
    e.preventDefault();
    axiosPut("proemail",email.id, email)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setEmail(proEmailData);
        getEmails();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayEmailUpdate(false);
        }, 1500);
    })
    .catch((error) => {
        setError(error.message);
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
const  btn =  proEmail !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display email component for update
const displayEmailBlock = displayEmailUpdate && (   
<>
    <div className='registerFormContainer margin-top'>
        <form onSubmit={handleSubmit}>
            <div ref={box} className='inputBox'>
                <input onChange={handleChange}
                 type='email' id='email' value={proEmail}
                  autoComplete='off'  required/>
                <label htmlFor='email'>Email</label>
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
        {ifNoData(emailTable)}
        <table className='profileTable'>
            <tbody>
                {emailTable.map((email)=>(
                    <tr key={email.id}>
                        <td>{email.proEmail}</td>
                        <td><img onClick={handleUpdate} id={email.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={email.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter un email</button>
        {displayEmailBlock}
    </div>
  )
}

export default MyEmails