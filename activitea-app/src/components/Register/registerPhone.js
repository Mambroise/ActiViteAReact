import React, {useState, useRef} from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'

function RegisterPhone() {

    const proPhoneData = {
        phone : '',
        userId : ''
        
       }
    
    const [ proPhone,setProPhone ] = useState(proPhoneData)
    const [ error,setError ] = useState(null)
    const [ success,setSuccess ] = useState(null)
    const [ disable,setDisable ] = useState(false)
    const { phone } = proPhone;
    const currentUser = getCurrentUser();
    const box2 = useRef()
    
    
    const handleChange = e =>{
        setProPhone({
            phone : e.target.value,
            userId : currentUser.id  
        })
    }
    
    const handleSubmit =e=>{
        console.log(phone);
        e.preventDefault();
        axiosPost("prophone", proPhone)
        .then((response) => {
            setError(null)
            setSuccess(response.data);
            setProPhone(proPhoneData);
            setDisable(true)
            box2.current.classList.add('blurry')
        })
        .catch((error) => {
            setError(error.message);
            setProPhone(proPhoneData);
        });
    }
    
    const handleClick =() =>{
        box2.current.classList.remove('blurry')
        setSuccess(null)
        setError(null)
        setDisable(false)
    }
    
    
    // submit button management
    const btn =  phone !== '' ? <button type='submit' className='btn'>Go!</button> :
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
        <div ref={box2} className='inputBox'>
            <input onChange={handleChange}
             type='text' id='phone' value={phone}
              autoComplete='off' disabled={disable} required/>
            <label htmlFor='phone'>Téléphone</label>
        </div>
        <div className='registerBtnBox'>
            {btn}
            <button className='btnAddData' onClick={handleClick}>Ajouter un numéro</button>
        </div>
    </form>
</div>
  )
}

export default RegisterPhone