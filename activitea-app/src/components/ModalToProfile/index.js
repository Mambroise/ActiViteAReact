import React, { useState } from 'react'
import MyEmails from './ShowData/MyEmails';
import MyPhones from './ShowData/MyPhone';
import MyAddresses from './ShowData/MyAddresses';
import MyCursus from './ShowData/Mycursus';
import MyProExp from './ShowData/MyProExp';

function ModalToProfile(props) {

    const dataTable={
        email : false,
        phone : false,
        address : false,
        cursus : false,
        proExp : false,
        language : false,
        lifeExp : false,
        skill : false,
    }

    const [showData, setShowData] =useState(dataTable)
    const { email, phone, address, cursus, proExp, language, lifeExp, skill} = dataTable;

    const handleClick =e=>{
        console.log(e.target.id);
        setShowData({...showData, [e.target.id] : true })
    }
    console.log(showData);
    const handleCloseBtn =()=>{
        setShowData(dataTable)
    }

    

    // display email components in tables management
    const emailTable = showData.email && <MyEmails handleCloseBtn={handleCloseBtn} handleCloseWindow={props.handleDisplay}/>
    const emailTitle = showData.email && "align-left"

    // display phone components in tables management
    const phoneTable = showData.phone && <MyPhones handleCloseBtn={handleCloseBtn} handleCloseWindow={props.handleDisplay}/>
    const phoneTitle = showData.phone && "align-left"
    
    // display address components in tables management
    const addressTable = showData.address && <MyAddresses handleCloseBtn={handleCloseBtn} handleCloseWindow={props.handleDisplay}/>
    const addressTitle = showData.address && "align-left"
    
    // display cursus components in tables management
    const cursusTable = showData.cursus && <MyCursus handleCloseBtn={handleCloseBtn} handleCloseWindow={props.handleDisplay}/>
    const cursusTitle = showData.cursus && "align-left"

    // display cursus components in tables management
    const proExpTable = showData.proExp && <MyProExp handleCloseBtn={handleCloseBtn} handleCloseWindow={props.handleDisplay}/>
    const proExpTitle = showData.proExp && "align-left"



    return (
    <div className='modalToProfile'>
        <div className='profileContainer'>
            <button className='btn float-right' onClick={props.handleDisplay}>X</button>
            <h2>Votre profile : </h2>
            <div className='modalContainer'>
                <button onClick={handleClick} id='email' value={email} className={`btnSeeData ${emailTitle}`}>Mes Emails :</button>
                {emailTable}
                <button onClick={handleClick} id='phone' value={phone} className={`btnSeeData ${phoneTitle}`}>Mes numéros :</button>
                {phoneTable}
                <button onClick={handleClick} id='address' value={address} className={`btnSeeData ${addressTitle}`}>Mes adresses :</button>
                {addressTable}
                <button onClick={handleClick} id='cursus' value={address} className={`btnSeeData ${cursusTitle}`}>Mes Etudes :</button>
                {cursusTable}
                <button onClick={handleClick} id='proExp' value={proExp} className={`btnSeeData ${proExpTitle}`}>Mes Expériences professionnelles :</button>
                {proExpTable}
            </div>
        </div>
    </div>
  )
}

export default ModalToProfile