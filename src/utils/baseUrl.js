import { fetch } from './http'
import { ipurl } from './ipurl'


const getmsg = (method,url,data)=>{
    return fetch(method,url,data);
}




export {
    getmsg
}