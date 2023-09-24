
import React, { useState,useEffect } from 'react'
import { axiosPost, axiosGet, axiosGpt, axiosPut } from '../../CommunFunctions/axiosFunction';
import getCurrentUser from '../../Login/getCurrentUser'
import { useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

// Enable worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function GeneratedCoverLetter() {

    const coverLetterData = {
        id : '',
        title : '',
        work_ad : '',
        letter : '',
        userId : ''
    }

    const [ coverletter, setCoverLetter ] = useState(coverLetterData)
    const [ workAd, setWorkAd ] = useState('')
    const [ phone, setPhone ] = useState([])
    const [ address, setAddress ] = useState([])
    const [ cursus, setCursus ] = useState([])
    const [ proExp, setProExp ] = useState([])
    const [ language, setLanguage ] = useState([])
    const [ lifeExp, setLifeExp ] = useState([])
    const [ skill, setSkill ] = useState([])
    const [ error,setError ] = useState(null);
    const [ success,setSuccess ] = useState(null);
    const [ outputText, setOutputText ] = useState('');
    const [ gptResponse, setGptResponse ] = useState('');
    const [ displayDownloadBtn, setDisplayDownloadBtn ] = useState(false);
    const currentUser = getCurrentUser();
    const navigate = useNavigate()


    //Redirection if not logged in
    useEffect(() => {
      currentUser === null && navigate("/")
    }, [currentUser])
    

    //useEffect to display the coverletter once loaded
    useEffect(() => {
      outputText.choices && outputText.choices.length > 0 && setCoverLetter(
        {...coverletter, letter : outputText.choices[0].message.content})  
    }, [outputText])

    //this Effect trigger the fetch function after componenet is mounted
    useEffect(() => {
      currentUser && getAllData()
    }, [])
    
    const getAllData = () => {

      // ===== get the work ad previously saved =====//
      axiosGet("last-coverletter", currentUser.id)
      .then(response=>{
        setWorkAd(response.data.work_ad)
        setCoverLetter({...coverletter, id : response.data.id})
      })
      .catch(error=>{
        console.log("coverletter ",error.message);
      })
      
       // ===== get phone number from user data ===== //
      axiosGet("prophone", currentUser.id)
      .then(response=>{
        setPhone(response.data[0].phone)
      })
      .catch(error=>{
        console.log("prophone ",error.message);
      })
      
       // ===== get Address from user data ===== //
      axiosGet("address", currentUser.id)
      .then(response=>{
        setAddress(response.data)
      })
      .catch(error=>{
        console.log("address ",error.message);
      })

       // ===== get Cursus from user data ===== //
      axiosGet("cursus", currentUser.id)
      .then(response=>{
        setCursus(response.data)
      })
      .catch(error=>{
        console.log("cursus ",error.message);
      })

       // ===== get profesional experiences from user data =====//
      axiosGet("proexp", currentUser.id)
      .then(response=>{
        setProExp(response.data)
      })
      .catch(error=>{
        console.log("proexp ",error.message);
      })
      
       // ===== get Language from user data ===== //
      axiosGet("language", currentUser.id)
      .then(response=>{
        setLanguage(response.data)
      })
      .catch(error=>{
        console.log("language ",error.message);
      })

       // ===== get life experiences from user data ===== //
      axiosGet("lifeexp", currentUser.id)
      .then(response=>{
        setLifeExp(response.data)
      })
      .catch(error=>{
        console.log("lifeexp", error.message);
      })
      
      // ===== get skills from user data ===== //
      axiosGet("skill", currentUser.id)
      .then(response=>{
        setSkill(response.data)
      })
      .catch(error=>{
        console.log("skill ",error.message);
      })

          // ===== Here we build a complete prompt made of the user data ===== //
          const prompt = "En réponse à la recherche de poste de l'annonce de travail qui suit: " +
          workAd+ " peux tu écrire une lettre de motivation en moins de  350 mots strictement, "
          +"en utilisant les données de ce candidat que tu trouves les plus pertinentes et utiles."+
          " voici les données du candidat : nom, prénom :" +currentUser.fullname + ", email: " +currentUser.email+
          ", téléphone: "+phone+", adresse: "+
          address.map(address=>(
            "numéro: " +address.number+ ", "+
            "rue: " +address.street+ ", "+
            "code postal: " +address.zipCode+ ", "+
            "ville: " +address.city)) +". Cursus scolaire: "+ 
          cursus.map(cursus=>(
          "école: "+cursus.school + ", "+
          "diplome: "+cursus.diploma + "; "))+
          " garde ici les cursus les plus pertinents en rapport à l'annonce."+
          " Parcours professionnels du candidat: "+
          proExp.map(exp=>(
              "société: "+exp.company+ ", "+
              "poste: "+exp.title
          ))+" garde ici les métiers et postes les plus pertinents en rapport à l'annonce."+
          " Les expériences de vie du candidat qui pourraient offrir des compétences utiles: "+
          lifeExp.map(exp=>(
              exp.content
          ))+". Garde ici les expérience de vie les plus pertinentes en rapport à l'annonce."+
          " Les langues parlées: "+
          language.map(lang=>(
              lang.language
          ))+ " et pour finir, les grandes compétences du candidat: "+
          skill.map(skill=>(
              skill.skill
          ))+". Garde ici les compétences les plus pertinentes en rapport à l'annonce."+
          "Tu peux également ajouter les compétences qui te semblent nécessaires à l'obtention du poste."+
          " Il faut éviter de reprendre les phrases de l'annonce à l'identique."
            console.log(prompt);

          // ===== posting the prompt to ChatGPT API ===== //  
          axiosGpt({ prompt: prompt })
          .then(response=>{
            setOutputText(response.data)
          })
          .catch(error=>{
            console.error('Error:', error);
            console.log(error.message);
          })
      }

        //update the coverletter text before saving
      const handleChange = e => {
          setCoverLetter({...coverletter, [e.target.id] : e.target.value})
      }
        //Save the coverletter after possible correction
        const handleSubmit = e => {
          e.preventDefault()

          setCoverLetter({...coverletter,
            work_ad : workAd,
            userId : currentUser.id
          })

        axiosPut("coverletter",coverletter.id, coverletter)
        .then(response => {
            setError(null)
            setSuccess(response.data)
            setDisplayDownloadBtn(true)
        })
        .catch(error => {
          console.log(error);
        })
      }
      
    // Function to trigger the PDF download
    function downloadPDF() {
      const pdfUrl = 'http://localhost:8080/createpdf/'+coverletter.id; 
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'coverletter.pdf'; // The desired file name for the download
      a.click();
    }

    //==========================DISPLAYS============================//
    //success message display
    const successMsg = success !== null &&<div className='successMsg '>{success}</div>

    //error message display
    const errorMsg = error !== null && <div className='errorMsg'>{error}</div>

    // submit button management
    const  btn =  workAd.work_ad !== '' ? <button type='submit' className='btn margin-auto'>Go!</button> :
    <button className='btn' disabled>Go!</button>

    //Loader
    const displayCoverLetter = gptResponse === '' ? (
      <>
      <div className='loader'></div>
      <p className='align-center margin-auto'>Chargement...Veuillez patienter</p>
      </>
    ) : (
      <textarea
      className='coverletterInput'
      id='letter'
      onChange={handleChange}
      value={coverletter.letter}
      required
    ></textarea>
    )
    
    //display the download button after saving the coverletter
    const displayDownloadButton = displayDownloadBtn && ( 
    <div className='flex-center'>
    <button className='btn' onClick={downloadPDF}>Télécharger au format PDF</button>
    </div>
    )
  
  

  return (
    <div className='main'>
        <div className='slContainer signupFromContainer'>
            <h2>Voici votre lettre de motivation</h2>
            {successMsg}
            {errorMsg}
            <form onSubmit={handleSubmit} className='signupFromContainer'>
              <div className='inputBox'>
                  <input onChange={handleChange} type='text' id='title' value={coverletter.title} autoComplete='off' required/>
                  <label htmlFor='title'>Donnez un nom à cette lettre</label>
              </div>
           {displayCoverLetter}
               {btn}
            </form>
           {displayDownloadButton}
        </div>

    </div>
  )
}

export default GeneratedCoverLetter