
const getCurrentUser =()=> {
 const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
        const currentUser = JSON.parse(storedUser)
        return currentUser
    }
 return null
}

export default getCurrentUser