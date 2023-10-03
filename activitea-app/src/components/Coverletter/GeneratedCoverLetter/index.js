
import React, { useState,useEffect } from 'react'
import { axiosGpt, axiosPut } from '../../CommunFunctions/axiosFunction';
import getCurrentUser, { getCoverletter, getUserAddress, getUserCursus, getUserLanguage, getUserLifeExp, getUserPhone, getUserProExp, getUserSkill, getWorkAd } from '../../Login/getCurrentUser'
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
    const [ error,setError ] = useState(null);
    const [ success,setSuccess ] = useState(null);
    const [ outputText, setOutputText ] = useState('');
    const [ displayDownloadBtn, setDisplayDownloadBtn ] = useState(false);

    //get all user data from locale storage
    const currentUser = getCurrentUser();
    const navigate = useNavigate()
  
  const coverId =getCoverletter()[0]
  const workAd =  getCoverletter()[1].work_ad
  console.log(coverId);
  console.log(workAd);
  const phone = getUserPhone()
  const address = getUserAddress()
  const cursus = getUserCursus()
  const language = getUserLanguage()
  const proExp = getUserProExp()
  const lifeExp = getUserLifeExp()
  const skill = getUserSkill()

  
    //Redirection if not logged in
    useEffect(() => {
      currentUser === null && navigate("/")
    }, [currentUser])
    

    //useEffect to display the coverletter once loaded
    useEffect(() => {
      outputText.choices && outputText.choices.length > 0 && setCoverLetter(
        {...coverletter, letter : outputText.choices[0].message.content})
    }, [outputText])

    //this Effect triggers the fetch function after componenent is mounted
    useEffect(() => {
      currentUser && gptApi()
    }, [])
    

    const gptApi = ()=>{
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
            id : coverId,
            work_ad : workAd,
            userId : currentUser.id
          })
        axiosPut("coverletter",coverId, coverletter)
        .then(response => {
          console.log(coverId);
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
    const displayCoverLetter = coverletter.letter === '' ? (
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
                  {displayDownloadButton}
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
        </div>

    </div>
  )
}

export default GeneratedCoverLetter