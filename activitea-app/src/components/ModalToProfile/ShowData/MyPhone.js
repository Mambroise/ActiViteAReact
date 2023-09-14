import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'


function MyPhones(props) {

    const proPhoneData = {
        id : '',
        phone : '',
        userId : ''
       }


const currentUserId = getCurrentUser().id;
const [ phoneTable, setPhoneTable ] = useState([]);
const [ displayPhoneUpdate, setDisplayPhoneUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const navigate = useNavigate()
//udapte declaration part
const [ phone,setPhone ] = useState(proPhoneData);
const { proPhone } = phone;
const box = useRef()



//phone numbers display
useEffect(()=>{
 getPhones()
},[])

const getPhones = () =>{
    axiosGet('prophone',currentUserId)
    .then(response=>{
        setPhoneTable(response.data)
    })
    .catch(error=>{
        setError(error.message)
    })
}

//phones delete management
const handleDelete = e => {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer ce numéro ?");
    if (userConfirmed) {
        axiosDelete('prophone', e.target.id)
        .then(response=>{
            getPhones()
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
    const phoneIdToUpdate = e.target.id;
    const phoneToUpdate = phoneTable.find((phone) => phone.id == phoneIdToUpdate);
    console.log(phoneToUpdate);
    setPhone({
        id : phoneToUpdate.id,
        phone : phoneToUpdate.phone,
        userId : currentUserId
    })
    setDisplayPhoneUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setPhone({...phone,
        phone : e.target.value,
        userId : currentUserId  
    })
    console.log(phone);
}
console.log(phone);

//submit update email
const handleSubmit = e => {
    e.preventDefault();
    console.log(phone);
    axiosPut("prophone",phone.id, phone)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setPhone(proPhoneData);
        getPhones();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayPhoneUpdate(false);
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
const  btn =  proPhone !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayPhoneBlock = displayPhoneUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
                <div ref={box} className='inputBox'>
                    <input onChange={handleChange}
                     type='number' id='phone' value={phone.phone}
                      autoComplete='off'  required/>
                    <label htmlFor='phone'>Téléphone</label>
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
        {ifNoData(phoneTable)}
        <table className='profileTable'>
            <tbody>
                {phoneTable.map((phone)=>(
                    <tr key={phone.id}>
                        <td>{phone.phone}</td>
                        <td><img onClick={handleUpdate} id={phone.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={phone.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter un numéro</button>
        {displayPhoneBlock}
    </div>
  )
}

export default MyPhones