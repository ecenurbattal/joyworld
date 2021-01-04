import axios from 'axios';

const instance = axios.create({
    baseURL:'https://api.imgbb.com/1',
    params:{
        key:'1d21ba9e101321a6b9f42eeecc7f531b',
        timeout: "0",
        processData: "false",
        mimeType: "multipart/form-data",
        contentType: "false",
    }
})

export default instance;