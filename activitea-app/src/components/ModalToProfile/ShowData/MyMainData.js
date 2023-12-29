import React, { useEffect,useState,useRef } from 'react'
import { axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'


function MyMainData() {

    const userData = {
        gender: '',
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
        oldPassword : '',
        newPassword : ''
    }

const [user, setUser] =useState(userData)
const { gender, name, firstName, email, password } = user;
const [changePassword, setChangePassword] =useState(passwordData)
const [confPassword, setConfPassword] =useState('')
const { oldPassword, newPassword } = changePassword;
const currentUserId = getCurrentUser().id;
const [ displayPasswordUpdate, setDisplayPasswordUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ errorPwd,setErrorPwd ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [ successPwd,setSuccessPwd ] = useState(null);
const [ disable,setDisable ] = useState(true)
const [man,setMan] = useState(false);
const [woman,setWoman] = useState(false);
const input = useRef();

//user data display
useEffect(()=>{
    getUser()
},[])

const getUser = () =>{
    axiosGet('user',currentUserId)
    .then(response=>{
        setUser(response.data)
        if (gender ==='homme') {
            setMan(true)
            setWoman(false)
        } else {
            setMan(false)
            setWoman(true)
        }
    })
    .catch(error=>{
        console.log(error.message);
    })
}

const handleGender = e => {
    if (e.target.id === "man") {
        setMan(true)
        setWoman(false)
        setUser({...user, gender: "homme"})
    } else {
        setMan(false)
        setWoman(true)
        setUser({...user, gender: "femme"})
    }
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
        id : currentUserId, 
        role :[
            {
                id: 1,
            }
        ]  
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
    setChangePassword( {...changePassword,[e.target.id] : e.target.value})
}

const handleChangeConfPassword = e => {
    setConfPassword(e.target.value)
}

const handleSubmitPassword = e => {
    e.preventDefault();   
    if (changePassword.newPassword === confPassword) {
        console.log(changePassword.newPassword);
        axiosPut("updatepassword",currentUserId, changePassword)
        .then(response => {
            console.log(response.data);
            setError(null)
            setSuccessPwd(response.data)
            console.log(successPwd);
            setTimeout(() => {
                setSuccessPwd(null)  
            }, 4000);
        })
        .catch(error =>{
            console.log(error);
            setErrorPwd(error.response.data)
        })
    } else {
        setErrorPwd("Les deux nouveaux mots de passe doivent correspondre")
        setTimeout(() => {
            setErrorPwd(null)  
        }, 4000);
    }
}

//success message display
const successMsg = success !== null && <div className='successMsg '>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

//successPwd message display
const successPwdMsg = successPwd !== null && <div className='successMsg'>{successPwd}</div>

//error message display
const errorPwdMsg = errorPwd !== null && <div className='errorMsg'>{errorPwd}</div>

//submit button management
const btn =  !disable ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//change password submit button management
const btnPwd =  oldPassword !== '' || newPassword !== '' || confPassword !== ''  ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//modify/cancel button management
const modify =  disable ? <button  onClick={handleUpdate} className='btnAddData float-right'>Modifier</button> : 
<button  onClick={handleCancel} className='btnAddData float-right'>Annuler</button>

//display the update password element
const displayBlock = displayPasswordUpdate && (   
    <>
        <div className='updatePasswordFormContainer margin-top'>
            {successPwdMsg}
            {errorPwdMsg}
             <form onSubmit={handleSubmitPassword}>
                 <div className='updatePasswordtBox'>
                    <input onChange={handleChangePassword} type='password' id='oldPassword' value={oldPassword} autoComplete='off' required/>
                    <label htmlFor='oldPassword'>Ancien mot de passe</label>
                </div>
                <div className='updatePasswordtBox'>
                    <input onChange={handleChangePassword} type='password' id='newPassword' value={newPassword} autoComplete='off' required/>
                    <label htmlFor='newPassword'>Nouveau mot de passe</label>
                </div>
                <div className='updatePasswordtBox'>
                    <input onChange={handleChangeConfPassword} type='password' id='confirmPassword' value={confPassword} autoComplete='off' required/>
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
            <div className='radioBox' >
                <input 
                    id='man'
                    type='radio' 
                    checked={man}
                    onChange={handleGender}
                    disabled={disable}
                />
                <label htmlFor='man'>homme</label>
                <input 
                    id='woman'
                    type='radio' 
                    checked={woman}
                    onChange={handleGender}
                    disabled={disable}
                />
                <label htmlFor='woman'>femme</label>
            </div>
            <div className='updateUsertBox'>
                <label htmlFor='firstName'>Prénom</label>
                <input 
                    ref={input} 
                    onChange={handleChange} 
                    type='text' 
                    id='firstName' 
                    value={firstName} 
                    autoComplete='off' 
                    disabled={disable} 
                    required/>
            </div>
                <div className='updateUsertBox'>
                <label htmlFor='name'>Nom</label>
                <input 
                    onChange={handleChange} 
                    type='text' 
                    id='name' 
                    value={name} 
                    autoComplete='off' 
                    disabled={disable} 
                    required/>
            </div>
                <div className='updateUsertBox'>
                <label htmlFor='email'>Email</label>
                <input 
                    onChange={handleChange} 
                    type='email' 
                    id='email' 
                    value={email} 
                    autoComplete='off' 
                    disabled={disable} 
                    required/>
            </div>
            <div className='updateUsertBox'>
                <input 
                    onChange={handleChange} 
                    type='password' 
                    id='password' 
                    value={password} 
                    autoComplete='off' 
                    disabled 
                    hidden/>
            </div>
            <div className='loginSignupBtnBox'>
                {btn}
            </div>
        </form>
        <button onClick={handleUpdatePassword} className='btnAddData '>Je modifie mon mot de passe</button>
        <hr/>
        {displayBlock}
    </div>
  )
}

export default MyMainData