import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'


function MyAddresses(props) {

    const addressData = {
        id : '',
        number : '',
        street : '',
        zipCode : '',
        city : '',
        userId : ''
       }


const currentUserId = getCurrentUser().id;
const [ addressTable, setAddressTable ] = useState([]);
const [ displayAddressUpdate, setDisplayAddressUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const navigate = useNavigate()
//udapte declaration part
const [ address,setAddress ] = useState(addressData);
const { number,street,zipCode,city } = address;
const box = useRef()



//phone numbers display
useEffect(()=>{
 getAddresses()
},[])

const getAddresses = () =>{
    axiosGet('address',currentUserId)
    .then(response=>{
        setAddressTable(response.data)
    })
    .catch(error=>{
        setError(error.message)
    })
}

//phones delete management
const handleDelete = e => {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer cette adresse ?");
    if (userConfirmed) {
        axiosDelete('address', e.target.id)
        .then(response=>{
            getAddresses()
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
    const IdToUpdate = e.target.id;
    const ToUpdate = addressTable.find((address) => address.id == IdToUpdate);
    setAddress({
        id : ToUpdate.id,
        number : ToUpdate.number,
        street : ToUpdate.street,
        zipCode : ToUpdate.zipCode,
        city : ToUpdate.city,
        userId : currentUserId
    })
    setDisplayAddressUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setAddress({...address,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        [e.target.id] : e.target.value,
        userId : currentUserId 
    })
}

//submit update email
const handleSubmit = e => {
    e.preventDefault();
    axiosPut("address",address.id, address)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setAddress(addressData);
        getAddresses();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayAddressUpdate(false);
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
const  btn =  number !== '' || street !== '' || zipCode !== '' || city !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayBlock = displayAddressUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
            <div ref={box}>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='number' id='number' value={number}
                autoComplete='off'   />
                <label htmlFor='number'>Numéro</label>
            </div>
            <div  className='inputBox'>
                <input onChange={handleChange}
                type='text' id='street' value={street}
                autoComplete='off'  required/>
                <label htmlFor='street'>Rue,voie...</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='number' id='zipCode' value={zipCode}
                autoComplete='off'  required/>
                <label htmlFor='zipCode'>Code postal</label>
            </div>
            <div className='inputBox'>
                <input onChange={handleChange}
                type='text' id='city' value={city}
                autoComplete='off'  required/>
                <label htmlFor='city'>Ville,lieu-dit...</label>
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
        {successMsg}
        {errorMsg}
        <button  onClick={props.handleCloseBtn} className='btnAddData float-right'>Fermer</button>
        {ifNoData(addressTable)}
        <table className='profileTable'>
            <tbody>
                {addressTable.map((address)=>(
                    <tr key={address.id}>
                        <td>{address.number}</td>
                        <td>{address.street}</td>
                        <td>{address.zipCode}</td>
                        <td>{address.city}</td>
                        <td><img onClick={handleUpdate} id={address.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={address.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter un numéro</button>
        {displayBlock}
    </div>
  )
}

export default MyAddresses