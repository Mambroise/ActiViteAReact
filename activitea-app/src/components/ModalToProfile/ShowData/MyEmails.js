import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'
import { emailValidation } from '../../Validation'
import InvalidJwt from '../../CommunFunctions/invalidJwt'



function MyEmails(props) {

    const proEmailData = {
        id : '',
        proEmail : '',
        userId : ''
       }

const currentUser = getCurrentUser();
const [ emailTable, setEmailTable ] = useState([]);
const [ displayEmailUpdate, setDisplayEmailUpdate ] = useState(false);
const [ validation,setValidation ] = useState(false)
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [invalidJwt, setInvalidJwt] = useState(false);
const navigate = useNavigate()
//udapte declaration part
const [ email,setEmail ] = useState(proEmailData);
const { proEmail } = email;
const box = useRef()


//emails display
useEffect(()=>{
 getEmails()
},[])

//jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

function getEmails(){
    axiosGet('proemail',currentUser.id)
    .then(response=>{
        setEmailTable(response.data)
    })
    .catch(error=>{
        if (error.response.data.message == 'Invalid JWT token') {
            props.handleVisible()
            setTimeout(() => {  
                props.handleCloseWindow()
            }, 2000);
        } else { 
            setError(error.response.data);
        }
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
            if (error.response.data.message == 'Invalid JWT token') {
                setInvalidJwt(true)
                setTimeout(() => {  
                    props.handleCloseWindow()  
                }, 200);
            } else { 
                setError(error.response.data);
                setSuccess(null)
            }
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
        userId : currentUser.id
    })
    setDisplayEmailUpdate(true);
}

//handle email modification
const handleChange = e =>{
    setEmail({...email,
        proEmail : e.target.value,
        userId : currentUser.id  
    })
}

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
        if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
            }, 200);
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
const  btn =  validation ? <button type='submit' className='btn'>Go!</button> :
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
        {logout}
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