import React, { useEffect,useState,useRef } from 'react'
import { axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'


function MyMainData() {

    const userData = {
        id : '',
        name : '',
        firstName : '',
        email : '',
        password : '',
        role :[
            {
                id: 1,
            }
        ]
    }
    const passwordData = {
        id : '',
        oldPassword : '',
        newPassword : ''
    }

const [user, setUser] =useState(userData)
const { name, firstName, email, password } = user;
const [changePassword, setChangePassword] =useState(passwordData)
const [confPassword, setConfPassword] =useState('')
const { oldPassword, newPassword } = changePassword;
const currentUserId = getCurrentUser().id;
const [ displayPasswordUpdate, setDisplayPasswordUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [ disable,setDisable ] = useState(true)
const input = useRef();



//user data display
useEffect(()=>{
    getUser()
},[])

const getUser = () =>{
    axiosGet('user',currentUserId)
    .then(response=>{
        setUser(response.data)
    })
    .catch(error=>{
        console.log(error.message);
    })
}


//*********  update managemenet*********//
//email input update management
const handleUpdatePassword = e => {
    setSuccess(null)
    setError(null)
    setDisplayPasswordUpdate(true);
}

//handle user modification
const handleUpdate = () =>{
   setDisable(false)
   setTimeout(() => {
       input.current.focus()
   }, 100);
}

//handle user modification
const handleChange = e =>{
    setUser({...user,
        [e.target.id] : e.target.value,
        id : currentUserId  
    })
}

// handle cancelling user modification
const handleCancel =()=>{
    setDisable(true)
    getUser()
}

//submit update email
const handleSubmitUser = e => {
    e.preventDefault();
    axiosPut("updateuser", user.id, user)
    .then((response) => {
        setError(null)
        setSuccess(response.data);  
        setTimeout(() => {
            setDisable(true);
            setSuccess(null)
        }, 1500);
    })
    .catch((error) => {
        setError(error.message);
        getUser();
    });
}

// Update the password 
const handleChangePassword = e => {

}

const handleSubmitPassword = e => {

}

//success message display
const successMsg = success !== null &&<div className='successMsg '>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

// submit button management
const btn =  name !== '' || firstName !== '' || email !== '' || disable === false ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

// modify/cancel button management
const modify =  disable ? <button  onClick={handleUpdate} className='btnAddData float-right'>Modifier</button> : 
<button  onClick={handleCancel} className='btnAddData float-right'>Annuler</button>

//display user box for update
const displayBlock = displayPasswordUpdate && (   
    <>
        <div className='updatePasswordFormContainer margin-top'>
             <form onSubmit={handleSubmitPassword}>
                 <div className='updatePasswordtBox'>
                    <input onChange={handleChangePassword} type='password' id='oldPassWord' value={oldPassword} autoComplete='off' required/>
                    <label htmlFor='oldPassword'>Ancien mot de passe</label>
                </div>
                <div className='updatePasswordtBox'>
                    <input onChange={handleChangePassword} type='password' id='newpassword' value={newPassword} autoComplete='off' required/>
                    <label htmlFor='newpassword'>Nouveau mot de passe</label>
                </div>
                <div className='updatePasswordtBox'>
                    <input onChange={handleChangePassword} type='password' id='confirmPassword' value={confPassword} autoComplete='off' required/>
                    <label htmlFor='confirmPassword'>Confirmer Mot de passe</label>
                </div>
                <div className='loginSignupBtnBox'>
                    {btn}
                </div>
            </form>
            <hr/>
        </div>
    </>
)

  return (
    <div className='updateUserFormContainer margin-top'>
        {successMsg}
        {errorMsg}
        {modify}
        <form onSubmit={handleSubmitUser}>
                 <div className='updateUsertBox'>
                    <label htmlFor='firstName'>Prénom</label>
                    <input ref={input} onChange={handleChange} type='text' id='firstName' value={firstName} autoComplete='off' disabled={disable} required/>
                </div>
                 <div className='updateUsertBox'>
                    <label htmlFor='name'>Nom</label>
                    <input onChange={handleChange} type='text' id='name' value={name} autoComplete='off' disabled={disable} required/>
                </div>
                 <div className='updateUsertBox'>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' id='email' value={email} autoComplete='off' disabled={disable} required/>
                </div>
                <div className='updateUsertBox'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input onChange={handleChange} type='password' id='password' value={password} autoComplete='off' disabled required/>
                </div>
                <div className='loginSignupBtnBox'>
                    <button onClick={handleUpdatePassword} className='btnAddData float-right'>Modifier mon mot de passe</button>
                    {btn}
                </div>
            </form>
        {displayBlock}
    </div>
  )
}

export default MyMainData