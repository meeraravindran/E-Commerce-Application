import React, {useState, useEffect} from 'react';
import { loadCart, cartEmpty } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import {getmeToken, processPayment} from "./helper/paymentHelper";
import {createOrder} from "./helper/orderhelper";
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react";
 const Paymentb = ({products, setReload = f => f, reload = undefined}) =>{

    const [info, setInfo] = useState({
        loading: false,
        success : false,
        clientToken: null,
        error: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getToken = (userId, token) =>{
        getmeToken(userId, token).then(info =>{
            console.log("INFO", info);
            if(info?.error){
                setInfo({...info, error: info?.error})
            }else{
                const clientToken = info?.clientToken
                setInfo({clientToken : clientToken})
            }
        })
    }

    useEffect(()=>{
        getToken(userId, token);
    },[]);

    return(
        <div>
            <h3>Test Braintree</h3>
        </div>
    )
 }

 export default Paymentb;