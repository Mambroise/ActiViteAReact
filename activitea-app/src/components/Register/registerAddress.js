import React, {useState, useRef} from 'react'
import { axiosPost } from '../CommunFunctions/axiosFunction'
import getCurrentUser from '../Login/getCurrentUser'

function RegisterAddress() {
    const addressData = {
        number : '',
        street : '',
        zipCode : '',
        city : '',
        userId : ''
        
       }
    
    const [ address,setAddress ] = useState(addressData)
    const [ error,setError ] = useState(null)
    const [ success,setSuccess ] = useState(null)
    const [ disable,setDisable ] = useState(false)
    const { number, street, zipCode, city } = address;
    const currentUser = getCurrentUser();
    const box = useRef()
    
    
    const handleChange = e =>{
        setAddress({...address, [e.target.id] : e.target.value, userId :currentUser.id  })
    }
    
    const handleSubmit =e=>{
        e.preventDefault();
        axiosPost("address", address)
        .then((response) => {
            setError(null)
            setSuccess(response.data);
            setAddress(addressData);
            setDisable(true)
            box.current.classList.add('blurry')
        })
        .catch((error) => {
            setError(error.message);
            setAddress(addressData);
        });
    }
    
    const handleClick =() =>{
        box.current.classList.remove('blurry')
        setSuccess(null)
        setError(null)
        setDisable(false)
    }
    
    
    // submit button management
    const btn =  street !== '' || zipCode !== '' || city !=='' ? <button type='submit' className='btn'>Go!</button> :
    <button className='btn' disabled>Go!</button>
    
    //success message display
    const successMsg = success !== null &&<div className='successMsg '>{success}</div>
    
    //error ùessage display
    const errorMsg = error !== null && <div className='errorMsg'>{error}</div>
  return (
    <div className='registerFormContainer'>
        <p className='align-center'><strong>Adresse:</strong></p>
    {successMsg}
    {errorMsg}
    <form onSubmit={handleSubmit}>
        <div ref={box}>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='number' id='number' value={number}
                autoComplete='off' disabled={disable}  />
                <label htmlFor='number'>Numéro</label>
            </div>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='text' id='street' value={street}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='street'>Rue,voie...</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='number' id='zipCode' value={zipCode}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='zipCode'>Code postal</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='text' id='city' value={city}
                autoComplete='off' disabled={disable} required/>
                <label htmlFor='city'>Ville,lieu-dit...</label>
            </div>
        </div>
        <div className='registerBtnBox'>
            {btn}
            <button className='btnAddData' onClick={handleClick}>Ajouter un adresse</button>
        </div>
    </form>
</div>
  )
}

export default RegisterAddress