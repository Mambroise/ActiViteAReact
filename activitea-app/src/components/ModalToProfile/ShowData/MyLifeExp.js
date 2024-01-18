import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'
import InvalidJwt from '../../CommunFunctions/invalidJwt'


function MyLifeExp(props) {

    const lifeExpData = {
        id : '',
        content : '',
        userId : ''
       }


const currentUser = getCurrentUser();
const [ lifeExpTable, setLifeExpTable ] = useState([]);
const [ displayLifeExpUpdate, setDisplayLifeExpUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [invalidJwt, setInvalidJwt] = useState(false);
const navigate = useNavigate()
//udapte declaration part
const [ lifeExp,setLifeExp ] = useState(lifeExpData);
const { content } = lifeExp;
const box = useRef()



//phone numbers display
useEffect(()=>{
    getLifExp()
},[])

//jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

const getLifExp = () =>{
    axiosGet('lifeexp',currentUser.id)
    .then(response=>{
        setLifeExpTable(response.data)
    })
    .catch(error=>{
        if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
            }, 2000);
            } else { 
            setError(error.response.data.message);
           }
    })
}

//phones delete management
const handleDelete = e => {

    const userConfirmed = window.confirm("Etes vous sur de vouloir effacer cette expérience ?");
    if (userConfirmed) {
        axiosDelete('lifeexp', e.target.id)
        .then(response=>{
            getLifExp()
            setError(null)
            setSuccess(response.data)
        })
        .catch(error=>{
            setSuccess(null)
            if (error.response.data.message == 'Invalid JWT token') {
            setInvalidJwt(true)
            setTimeout(() => {  
                props.handleCloseWindow()
            }, 2000);
            } else { 
            setError(error.response.data.message);
           }
        })
    }
}

//*********  update managemenet*********//
//email input update management
const handleUpdate = e => {
    setSuccess(null)
    const phoneIdToUpdate = e.target.id;
    const phoneToUpdate = lifeExpTable.find((lifeExp) => lifeExp.id == phoneIdToUpdate);
    setLifeExp({
        id : phoneToUpdate.id,
        content : phoneToUpdate.content,
        userId : currentUser.id
    })
    setDisplayLifeExpUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setLifeExp({...lifeExp,
        content : e.target.value,
        userId : currentUser.id  
    })

}

//submit update email
const handleSubmit = e => {
    e.preventDefault();
    axiosPut("lifeexp",lifeExp.id, lifeExp)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setLifeExp(lifeExpData);
        getLifExp();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplayLifeExpUpdate(false);
        }, 1500);
    })
    .catch((error) => {
        setSuccess(null)
        if (error.response.data.message == 'Invalid JWT token') {
        setInvalidJwt(true)
        setTimeout(() => {  
            props.handleCloseWindow()
        }, 2000);
        } else { 
        setError(error.response.data.message);
       }
    });
}

//go to add an email page
const goToAddPage =()=>{
    navigate('/register2')
    props.handleCloseWindow()
}

//success message display
const successMsg = success !== null &&<div className='successMsg '>{success}</div>

//error message display
const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

// submit button management
const  btn =  content !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayBlock = displayLifeExpUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
                <div ref={box} className='inputBox'>
                    <input onChange={handleChange}
                    type='text' id='content' value={content}
                    autoComplete='off' required/>
                    <label htmlFor='content'>Expérience (une ligne)</label>
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
        {ifNoData(lifeExpTable)}
        <table className='profileTable'>
            <tbody>
                {lifeExpTable.map((lifeExp)=>(
                    <tr key={lifeExp.id}>
                        <td>{lifeExp.content}</td>
                        <td><img onClick={handleUpdate} id={lifeExp.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={lifeExp.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter un numéro</button>
        {displayBlock}
    </div>
  )
}

export default MyLifeExp