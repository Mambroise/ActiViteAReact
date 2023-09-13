
const getDatafromLocaStorage = () => {
    const localStorageToCheck = localStorage.getItem('toBeUpdated')
    if (localStorageToCheck) {
        const dataToUdpdate = JSON.parse(localStorageToCheck) 
        return dataToUdpdate;
    }
    return null;
}

export default getDatafromLocaStorage