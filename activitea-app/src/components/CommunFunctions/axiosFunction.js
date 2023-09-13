import axios from'axios';
//post data function
async function axiosPost(destination, data) {
    console.log("into axiospost");
    return await axios.post(`http://localhost:8080/${destination}`,data)
  }

//get data function
async function axiosGet(origin, userId) {
  console.log("into axiosget");
  return await axios.get(`http://localhost:8080/${origin}/${userId}`) 
}

//update data function
async function axiosPut(destination, dataId, data) {
  console.log("into axiosPut");
  return await axios.put(`http://localhost:8080/${destination}/${dataId}`,data) 
}

//delete data function
async function axiosDelete(destination, dataId) {
  console.log("into axiosdelete");
  return await axios.delete(`http://localhost:8080/${destination}/${dataId}`) 
}


export {axiosPost}
export {axiosGet}
export {axiosPut}
export {axiosDelete}