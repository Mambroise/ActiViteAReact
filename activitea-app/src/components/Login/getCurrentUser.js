
const getCurrentUser =()=> {
 const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
        const currentUser = JSON.parse(storedUser)
        return currentUser
    }
 return null
}

const getCoverletter =()=> {
 const storedWorkAd = localStorage.getItem("coverletter")
    if (storedWorkAd) {
        const workAd = JSON.parse(storedWorkAd)
        return workAd
    }
 return null
}

const getUserPhone =()=> {
 const storedPhone = localStorage.getItem("phone")
    if (storedPhone) {
        const phone = JSON.parse(storedPhone)
        return phone
    }
 return null
}

const getUserAddress =()=> {
 const storedAddress = localStorage.getItem("address")
    if (storedAddress) {
        const address = JSON.parse(storedAddress)
        return address
    }
 return null
}

const getUserCursus =()=> {
 const storedCursus = localStorage.getItem("cursus")
    if (storedCursus) {
        const cursus = JSON.parse(storedCursus)
        return cursus
    }
 return null
}

const getUserLanguage =()=> {
 const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
        const language = JSON.parse(storedLanguage)
        return language
    }
 return null
}

const getUserProExp =()=> {
 const storedProExp = localStorage.getItem("proExp")
    if (storedProExp) {
        const proExp = JSON.parse(storedProExp)
        return proExp
    }
 return null
}

const getUserLifeExp =()=> {
 const storedLifeExp = localStorage.getItem("lifeExp")
    if (storedLifeExp) {
        const lifeExp = JSON.parse(storedLifeExp)
        return lifeExp
    }
 return null
}

const getUserSkill =()=> {
 const storedSkill = localStorage.getItem("skill")
    if (storedSkill) {
        const skill = JSON.parse(storedSkill)
        return skill
    }
 return null
}

export default getCurrentUser
export { getCoverletter, getUserPhone, getUserAddress, getUserCursus, getUserLanguage, getUserProExp, getUserLifeExp, getUserSkill}