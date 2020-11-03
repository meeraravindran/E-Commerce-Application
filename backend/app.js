const mongoose= require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
// const stripeRoutes = require("./routes/stripepayment");
const paymentBRoutes = require("./routes/payment");

//DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED");
});

//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
// app.use("/api", stripeRoutes);
app.use("/api", paymentBRoutes);


//port
const port = 8000;

//starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});