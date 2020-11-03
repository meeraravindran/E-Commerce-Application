import {API} from "../../backend";

export const createOrder = (userId, token, data) =>{
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept : "application/json",
            "Content-Type" :"application/json",
            Authorisation : `Bearer ${token}`
        },
        body: JSON.stringify({order: data})
    }).then(res=>{return res.json()})
    .catch(err=>console.log(err));
}