
const express=require("express");
const dbConnect=require("./config/dbConnect");
const app=express();
const dotenv=require("dotenv").config();
const PORT=process.env.PORT || 4000;
const authRouter=require("./routes/authRoute");
const bodyParser = require("body-parser");
const productRoute=require('./routes/productRoute');
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const cookieParser=require("cookie-parser");
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use("/api/user",authRouter);
app.use("/api/product",productRoute);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`);
})