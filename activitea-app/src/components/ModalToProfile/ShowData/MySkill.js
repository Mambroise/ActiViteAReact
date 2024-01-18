import React, { useEffect,useState,useRef } from 'react'
import { axiosDelete, axiosGet, axiosPut } from '../../CommunFunctions/axiosFunction'
import getCurrentUser from '../../Login/getCurrentUser'
import ifNoData from '../../CommunFunctions/ifNoDataFunction'
import editIcon from '../../../image/editIcon.png'
import deleteIcon from '../../../image/deleteIcon.png'
import { useNavigate } from 'react-router-dom'
import InvalidJwt from '../../CommunFunctions/invalidJwt';

function MySkill(props) {

    const skillData = {
        id : '',
        skill : '',
        userId : ''
       }


const currentUser = getCurrentUser();
const [ skillTable, setSkillTable ] = useState([]);
const [ displaySkillUpdate, setDisplaySkillUpdate ] = useState(false);
const [ error,setError ] = useState(null);
const [ success,setSuccess ] = useState(null);
const [invalidJwt, setInvalidJwt] = useState(false);
const navigate = useNavigate()
//udapte declaration part
const [ proSkill,setProSkill ] = useState(skillData);
const { skill } = proSkill;
const box = useRef()



//phone numbers display
useEffect(()=>{
    getsKills()
},[]);

//jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

const getsKills = () =>{
    axiosGet('skill',currentUser.id)
    .then(response=>{
        setSkillTable(response.data)
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

    const userConfirmed = window.confirm("Etes-vous sur de vouloir effacer cette compétence ?");
    if (userConfirmed) {
        axiosDelete('skill', e.target.id)
        .then(response=>{
            getsKills()
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
    const phoneToUpdate = skillTable.find((skill) => skill.id == phoneIdToUpdate);

    setProSkill({
        id : phoneToUpdate.id,
        skill : phoneToUpdate.skill,
        userId : currentUser.id
    })
    setDisplaySkillUpdate(true);
}

//handle phone modification
const handleChange = e =>{
    setProSkill({...proSkill,
        skill : e.target.value,
        userId : currentUser.id  
    })

}

//submit update email
const handleSubmit = e => {
    e.preventDefault();
    axiosPut("skill",proSkill.id, proSkill)
    .then((response) => {
        setError(null)
        setSuccess(response.data);
        setProSkill(skillData);
        getsKills();
        box.current.classList.add('blurry')
        setTimeout(() => {
            setDisplaySkillUpdate(false);
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
const  btn =  skill !== '' ? <button type='submit' className='btn'>Go!</button> :
<button className='btn' disabled>Go!</button>

//display phone component for update
const displayBlock = displaySkillUpdate && (   
    <>
        <div className='registerFormContainer margin-top'>
            <form onSubmit={handleSubmit}>
                <div ref={box} className='inputBox'>
                    <input onChange={handleChange}
                    type='text' id='content' value={skill}
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
        {ifNoData(skillTable)}
        <table className='profileTable'>
            <tbody>
                {skillTable.map((skill)=>(
                    <tr key={skill.id}>
                        <td>{skill.skill}</td>
                        <td><img onClick={handleUpdate} id={skill.id} className='profileIcons' src={editIcon} alt='icon'/></td>
                        <td><img onClick={handleDelete} id={skill.id} className='profileIcons' src={deleteIcon} alt='icon'/></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={goToAddPage} className='btnAddData float-right'>Ajouter une compétence</button>
        {displayBlock}
    </div>
  )
}

export default MySkill