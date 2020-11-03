import React, {useEffect, useState} from 'react';
import { isAuthenticated } from '../auth/helper';
import { loadCart, cartEmpty } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';

const StripeCheckout = (
    // products = [],
    // setReload = f=>f,
    // reload= undefined
    props
) =>{
    const products = props.products;
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getGrandTotal =() =>{
       let amt =0;
      // console.log(products);
       
       props.products.map(p=>{
           amt += p.price;
       });
       return amt;
    }

    const makePayment = (token) =>{
        const body={
            token,
            products
        }
        const headers={
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(res => {
            console.log(res);
            //create order
        }).catch(err=>console.log(err));
    }

    const showStripeButton = () =>{
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51HBhtAKhGuCi2CYCVlxnoww8JYvtSa1kxIeezIsFZk2xkLwZGTfJRisOnu2TZ3MezKaDY4ac0WYkq1vilogfpq7H00sBNOMSPY"
            token={makePayment}
            amount={getGrandTotal() * 100}
            name="Buy Apparels"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success">Pay With Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in</button>
            </Link>
        )
    }

    return(
        <div>
            <h2 className="text-white">Stripe Checkout{getGrandTotal()}</h2>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;