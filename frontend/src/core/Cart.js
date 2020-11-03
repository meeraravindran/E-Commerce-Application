import React, {useState, useEffect} from 'react';
import Base from "./Base";
import Card from './Card';
import { loadCart } from './helper/cartHelper';
//import StripeCheckout from './StripeCheckout';
import Paymentb from './Paymentb';

const Cart = ()=> {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(()=>{
        setProducts(loadCart());
    },[reload]);

    const CheckCart = () =>{
       // console.log(products);
        return(
            products && (
                products.map((product,index)=>(
                    <Card 
                    key={index}
                    product={product}
                    removefromcart={true}
                    addtocart={false}
                    reload ={reload}
                    setReload={setReload}
                    />
                ))
            )
        );
    }
    const loadAllProducts = (products) =>{
        return(
           <div>
               <h2>Load products</h2>
                {/* {CheckCart()} */}
                {products.map((product,index)=>(
                    <Card 
                    key={index}
                    product={product}
                    removefromcart={true}
                    addtocart={false}
                    reload ={reload}
                    setReload={setReload}
                    />
                ))}
           </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div>
                <h2>LOad checkout</h2>
            </div>
        )
    }
    //console.log(products);
    return(
       <Base title="Cart Page" description="Ready to check out">
           <div className="row text-center">
                <div className="col-6">{products.length>0 ? loadAllProducts(products):(<h3>Cart is Empty!</h3>)}</div>
                <div className="col-6">
                    {/* <StripeCheckout
                    products={products}
                    reload={reload}
                    setReload= {setReload}
                    // number="this is number"
                    /> */}
                    <Paymentb products={products} setReload={setReload}/>
                </div>
           </div>
       </Base>
    )
}


export default Cart;
