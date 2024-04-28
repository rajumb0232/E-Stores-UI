import axios from "axios"

const baseURL = "http://localhost:7000/api/fkv1"

const AxiosPrivateInstance = () => axios.create({
    baseURL,
    headers:{"Content-Type":"application/json"},
    withCredentials: true
})

export default AxiosPrivateInstance;