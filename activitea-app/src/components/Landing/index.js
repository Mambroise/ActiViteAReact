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


useEffect(() => {
  currentUser && isExistData()
}, [])

//check if data has been saved by user and get the message
function isExistData() {
  axiosGet('userdata',currentUser.id)
  .then(response=>{
    setHasData(response.data)
    console.log(response.data);
  })
  .catch(error=>{
    setHasNoData(error.response.data)
    console.log(error.response.data);
  })
}

// sign up management
const signUpButton = currentUser ? <Link className='landingAddLink' to='/register1'><i>Ajouter des Données!</i></Link> :
<Link className='landingSignupLink' to='/signup'><i>Je m'inscris</i></Link>

// sign up management
const gptButton = currentUser && <Link  className='landingGptLink' to='/addworkad'>GPT</Link>

// hasData message 
const hasDataMsg = hasData !== null && <div className='successMsg '>{hasData}</div>

// hasNoData message 
const hasNoDataMsg = hasNoData !== null && <div className='errorMsg '>{hasNoData}</div>
return (
    <main className='landingBg'>
      <div className='landingLeftBox'>
        <img src={brain} alt='cerveau de IA'/>
        {signUpButton}
        {gptButton}
      </div>
      <div className='landingRightBox'>
        <h1>Tes lettres de motivation pensées par Chat GPT</h1>
        {hasDataMsg}
        {hasNoDataMsg}
      </div>
    </main>
  )
}

export default Landing