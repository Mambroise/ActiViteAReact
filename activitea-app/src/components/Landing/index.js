import {useEffect,useState} from 'react'
import {axiosGet} from '../CommunFunctions/axiosFunction'
import { Link } from 'react-router-dom'
import getCurrentUser from '../Login/getCurrentUser'
import brain from '../../image/aiBrain.png'

function Landing() {

 //verify wether there is a logged in user
const currentUser = getCurrentUser()

const [hasData, setHasData] = useState(null)
const [hasNoData, setHasNoData] = useState(null)
const [isVisible,setIsVisible] = useState(false)
const [popUp,setPopUp] = useState(false)

useEffect(() => {
  currentUser && isExistData()
  // setPopUp(false)
  // setIsVisible(false)
}, [])

//check if data has been saved by user and get the message
function isExistData() {
  axiosGet('userdata',currentUser.id)
  .then(response=>{
    setHasNoData(null)
    setHasData(response.data)
    if (response.data !== null && response.data.trim() !== '') {
      setIsVisible(true)
      setPopUp(true)
    }
  })
  .catch(error=>{
    setHasNoData(error.response.data)
    setHasData(null)
    if (error.response.data !== ' ') {
      setIsVisible(true)
      setPopUp(true)
    }
  })
}

const handleClick = () => {
  setPopUp(false)
  setTimeout(() => {
    setIsVisible(false)
  }, 1000);
}

// sign up management
const signUpButton = currentUser ? <Link className='landingAddLink' to='/register1'><i>Ajouter des Données!</i></Link> :
<Link className='landingSignupLink' to='/signup'><i>Je m'inscris</i></Link>

// sign up management
const gptButton = currentUser && <Link  className='landingGptLink' to='/addworkad'>GPT</Link>

// popup message css handling 
const modalCss = hasData !== null ? 'successMsg' : 'errorMsg'

// popup div css handling 
const popupCss = popUp ? 'popup' : 'popout'

// hasNoData and hasData message modal handling
const warningMsg = isVisible && 
<div className={popupCss}>
  <div className={modalCss}>{hasNoData}{hasData}</div>
  <button className='btn' onClick={handleClick}>Ok</button>
</div>

return (
    <main className='landingBg'>
      <div className='landingLeftBox'>
        <img src={brain} alt='cerveau de IA'/>
        {signUpButton}
        {gptButton}
        {warningMsg}
      </div>
      <div className='landingRightBox'>
        <h1>Tes lettres de motivation pensées par Chat GPT</h1>
      </div>
    </main>
  )
}

export default Landing