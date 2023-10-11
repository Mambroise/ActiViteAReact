import axios from'axios';
import getCurrentUser from '../Login/getCurrentUser';

//retreive user token if not null
const currentUser = getCurrentUser()
let token = null
if (currentUser !== null) {
  token = currentUser.token
}

// function return the bearer to check security token
const bearer = () =>{
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ${token}'
    }
  }
}

//back End URL
const url = 'http://localhost:8080/'

//post data function
async function axiosPost(destination, data) {
    return await axios.post(url+destination,data, bearer)
  }

//get data function
async function axiosGet(origin, userId) {
  return await axios.get(`${url}${origin}/${userId}`, bearer) 
}

//update data function
async function axiosPut(destination, dataId, data) {
  return await axios.put(`${url}${destination}/${dataId}`,data, bearer) 
}

//delete data function
async function axiosDelete(destination, dataId) {
  return await axios.delete(`${url}${destination}/${dataId}`, bearer) 
}

//gpt API function
async function axiosGpt(prompt) {
    return await axios.post(`${url}api/generate-text`, prompt);
}

export {axiosPost,axiosGet,axiosPut,axiosDelete,axiosGpt}
