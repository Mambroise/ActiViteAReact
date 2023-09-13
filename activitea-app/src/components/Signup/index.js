import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosPost } from '../CommunFunctions/axiosFunction'

function Signup() {

    // déclaration des données
   const data = {
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
 

const [signup,setSignup] = useState(data);
const [confPassword,setConfPassword] = useState({confPassword : ''})
const [success,setSuccess] =useState('')
const [error,setError] =useState('')
const { firstName, name, email, password } = signup;
const navigate = useNavigate();

const handleChange = e => {
    setSignup({...signup, [e.target.id] : e.target.value});
} 

const handleConfPassword = e => {
    setConfPassword(e.target.value);  
}

//envoie des données vers springBoot
const handleSubmit =e=> {
    e.preventDefault()
    axiosPost("register", signup)
    .then(response =>{
        setSignup(data)
        setError('')
        setSuccess("Bravo! vous avez bien été enrergistré(e)")
        setTimeout(() => {
            navigate("/login")
        }, 2000);
    })
    .catch(error=>{
        setError(error.message)
        setSignup(data)
    })
}

// Affichage du bouton valider 
const btn = firstName === '' || name === '' || email === '' ||
 password === '' || password !== confPassword ? <button className='btn' disabled>Go!</button>
 : <button className='btn' type='submit'>Go!</button>

 //display success message
 const successMsg = success !== '' && <div className='successMsg'>{success}</div>

//display error message
const errorMsg = error !== '' && <div className='errorMsg'>{error}</div>

  return (
    <div className='slContainer'>
        <h2>Inscription</h2>
        {errorMsg}
        {successMsg}
        <div className='signupFromContainer'>
            <form onSubmit={handleSubmit}>
                 <div className='inputBox'>
                    <input onChange={handleChange} type='text' id='firstName' value={firstName} autoComplete='off' required/>
                    <label htmlFor='firstName'>Prénom</label>
                </div>
                 <div className='inputBox'>
                    <input onChange={handleChange} type='text' id='name' value={name} autoComplete='off' required/>
                    <label htmlFor='name'>Nom</label>
                </div>
                 <div className='inputBox'>
                    <input onChange={handleChange} type='email' id='email' value={email} autoComplete='off' required/>
                    <label htmlFor='email'>Email</label>
                </div>
                <div className='inputBox'>
                    <input onChange={handleChange} type='password' id='password' value={password} autoComplete='off' required/>
                    <label htmlFor='password'>Mot de passe</label>
                </div>
                <div className='inputBox'>
                    <input onChange={handleConfPassword} type='password' id='confirmPassword' value={confPassword} autoComplete='off' required/>
                    <label htmlFor='confirmPassword'>Confirmer Mot de passe</label>
                </div>
                <div className='loginSignupBtnBox'>
                    {btn}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup