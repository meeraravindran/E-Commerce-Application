var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "95gqyjfznmnk49gc",
  publicKey: "jv5gvsrwxqbsckvz",
  privateKey: "aca0ecb0a886bcd46bb3ebffff71f4d0"
});

exports.getToken = (req,res) =>{
    gateway.clientToken.generate({
        //customerId: aCustomerId
      }, function (err, response) {
       // var clientToken = response.clientToken
       if(err){
           res.status(500).send(err)
       } else{
           res.send(response)
       }
      });
}

exports.processPayment = (req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(err)
          }else{
              res.json(result);
          }
      });
}



// const stripe = require("stripe")("sk_test_51HBhtAKhGuCi2CYCXboGztp73ba0F6Pr3BfIFYIgdAPBwj8r2BvJuKlbu07X6exrmLtWbtYyJ2crVcVFCRwtrJRg008gIklJwQ");
// const uuid = require("uuid/v4");
// const { updateStatus } = require("./order");


// exports.makepayment = (req, res) =>{
//     const {products, token} = req.body;
//     console.log("PRODUCTS", products);
//     let amt =0;
//     products.map(p=>{
//         amt += p.price;
//     });

//     idempotencyKey = uuid();

//     return stripe.customers.create({
//         email: token.email,
//         source:token.id
//     }).then(customer =>{
//         stripe.charges.create({
//             amount:amt,
//             currency:'usd',
//             customer:customer.id,
//             receipt_email:token.email,
//             description:"Testing",
//             shipping:{
//                 name:token.card.name,
//                 address:{
//                     line1: token.card.address_line1,
//                     line2: token.card.address_line2,
//                     city: token.card.address_city,
//                     country: token.card.address_country,
//                     postal_code: token.card.address_zip
//                 }          
//             }
//         },
//         {idempotencyKey}
//         )
//         .then(res => res.status(200).json(res))
//         .catch(err=>console.log(err))
//     })

// }