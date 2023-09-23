import axios from'axios';
//post data function
async function axiosPost(destination, data) {
    return await axios.post(`http://localhost:8080/${destination}`,data)
  }

//get data function
async function axiosGet(origin, userId) {
  return await axios.get(`http://localhost:8080/${origin}/${userId}`) 
}

//update data function
async function axiosPut(destination, dataId, data) {
  return await axios.put(`http://localhost:8080/${destination}/${dataId}`,data) 
}

//delete data function
async function axiosDelete(destination, dataId) {
  return await axios.delete(`http://localhost:8080/${destination}/${dataId}`) 
}

//delete data function
async function axiosGpt(prompt) {
    return await axios.post('http://localhost:8080/api/generate-text', prompt);

}

export {axiosPost,axiosGet,axiosPut,axiosDelete,axiosGpt}
