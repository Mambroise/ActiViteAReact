import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { axiosPost } from '../CommunFunctions/axiosFunction'

function Login() {
    const data = {
        email : '',
        password : ''
    }

    const [loginData, setLoginData] = useState(data);
    const [error,setError] =useState('');
    const [success,setSuccess] =useState('');
    const { email, password } =loginData;
    const navigate = useNavigate();


    const handleChange = e => {
        setLoginData({...loginData, [e.target.id] : e.target.value});
    } 
    
    const handleSubmit =e=> {
           e.preventDefault()
           axiosPost("login", loginData)
            .then((response) => {
            console.log("Success login");
            setError('')
            setSuccess("Bienvenue " + response.data.fullname);
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2000);
            })
            .catch((error) => {
            setError(error.message);
            setLoginData(data);
            });
    }

    // Affichage du bouton valider 
    const btn = email === '' || password === '' ? <button className='btn' disabled>Go!</button>
    : <button className='btn' type='submit'>Go!</button>

    //affichage du message d'error
    const errorMsg = error !== '' && <div className='errorMsg'>{error}</div>

    //affichage du message d'error
    const successMsg = success !== '' && <div className='successMsg'>{success}</div>

  return (
    <div className='slContainer'>
        <h2>Connexion</h2>
        {errorMsg}
        {successMsg}
        <div className='loginFormContainer'>
            <form onSubmit={handleSubmit}>
                <div className='inputBox'>
                    <input onChange={handleChange} type='email' id='email' value={email} autoComplete='off' required/>
                    <label htmlFor='loginEmail'>Email</label>
                </div>
                <div className='inputBox'>
                    <input onChange={handleChange} type='password' id='password' value={password} autoComplete='off' required/>
                    <label htmlFor='loginPassword'>Mot de passe</label>
                </div>
                    <Link to="/signup"><i><u>Première fois sur ActiViteA? Je m'inscris</u></i></Link>
                <div className='loginSignupBtnBox'>
                    {btn}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login