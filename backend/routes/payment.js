var express = require("express");
var router = express.Router();
// const {makepayment} = require("../controllers/stripepayment");
const {makepayment, getToken, processPayment} = require("../controllers/payment");
const {isSignedIn, isAuthenticated} = require("../controllers/auth");

// router.post("/stripepayment", makepayment);
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;