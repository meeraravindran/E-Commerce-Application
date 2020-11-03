import {API} from "../../backend";
//create category 
export const createCategory = (userId, token, category) =>{
    return fetch(`${API}/category/create/${userId}`, {
        method:"POST",
        headers:{
            Accept :"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    body:JSON.stringify(category)
    }).then(response =>{
        //console.log(response);
        return response.json();
    })
    .catch(err => console.log(err));
}; 
//all categories
export const getCategories = () =>{
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err));
};
//create product
export const createProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then(res=>{
        return res.json()
    }).catch(err=>console.log(err));
};
//get all products
export const getProducts = () =>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(res =>{
        return res.json()
    }).catch(err => console.log(err));
};
//get a single product
export const getAProduct = productId =>{
     return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    }).catch(err=>console.log(err));
};
//delete a product
export const delProduct = (userId, productId, token)=>{
   return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
            Accept:"application/json"
        }
    }).then(res=>{
        return res.json();
    }).catch(err=> console.log(err));
};
//update a product
export const updateProduct = (userId, productId, token, product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${token}`,
            Accept:"application/json"
        },
        body: product
    }).then(res=>{
        return res.json();
    }).catch(err=> console.log(err));
};