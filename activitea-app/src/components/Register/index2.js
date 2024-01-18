import React,{useState} from 'react'
import RegisterLanguage from './registerLanguage'
import RegisterLifeExp from './registerLifeExp'
import RegisterProSkill from './registerProSkill'
import { useNavigate } from 'react-router-dom'
import InvalidJwt from '../CommunFunctions/invalidJwt'

function RegisterPart2() {
  const [invalidJwt, setInvalidJwt] = useState(false);
  const navigate = useNavigate()

    //jwt invalid logout handling
const logout = invalidJwt && <InvalidJwt/>

const isVisible = () =>{
  navigate("/");
  setInvalidJwt(true);
}


  const handleFormerPage =()=>{
    navigate("/register1")
  }

  const handleFinish =()=>{
    navigate("/")
  }

  return (
    <>
      <h2>Données Personnelles</h2>
      <p className='align-center'>Veuillez remplir les champs ci-dessous.</p>
      <div className='container'>
          <div className='slContainer'>
              <RegisterLanguage handleVisible ={isVisible}/>
              <RegisterLifeExp handleVisible ={isVisible}/>
              <RegisterProSkill handleVisible ={isVisible}/>
              <div className='flex-between'>
                <button onClick={handleFormerPage} className='btnNavigation'>Page précédente</button>
                <button onClick={handleFinish} className='btnNavigation'>Terminer</button>
              </div>
          </div>
      </div>
    </>
  )
}

export default RegisterPart2