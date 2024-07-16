const { generateToken } = require("../config/jwtToken");
const User=require("../models/userModels");
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const createUser=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email:email});
    if(!findUser){
        const newUser=await User.create(req.body);
        res.json(newUser);
    }else{
throw new Error("User Already Exists");
    }
}
);

const loginUserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const findUser=await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
res.json(
    {
        _id: findUser?._id,
        firstname:findUser?.firstname,
        lastname:findUser?.lastname,
        email:findUser?.email,
        mobile:findUser?.mobile,
        token:generateToken(findUser?._id),
    }
);
    }else{
        throw new Error("invalid credentials");
    }
});


const updateaUser=asyncHandler(async(req,res)=>{
    console.log();
    const {_id}=req.user;
    try{
const updateaUser=await User.findByIdAndUpdate(_id,{
    firstname:req?.body?.firstname,
    lastname:req?.body?.lastname,
    email:req?.body?.email,
    mobile:req?.body?.mobile,
},
{
    new:true,
}
);
res.json(updateaUser);
    }catch(error){
        throw new Error(error);
    }
});

const getallUser=asyncHandler(async(req,res)=>{
    try{
    const getUsers=await User.find().populate("wishlist");
    res.json(getUsers);
    }
    catch(error){
        throw new Error(error);
    }
});

const getaUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
const getaUser=await User.findById(id);
res.json({
    getaUser,
});
    }catch(error){
        throw new Error(error);
    }
});

const deleteaUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
const deleteaUser=await User.findByIdAndDelete(id);
res.json({
    deleteaUser,
});
    }catch(error){
        throw new Error(error);
    }
});

const blockUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const block=await User.findByIdAndUpdate(id,{
            isBlocked:true,
        },
        {
            new:true,
        }
    );
    res.json({
        message:"User blocked",
        user:block
    });
    }catch(error){
        throw new Error(error);
    }
});
const unblockUser=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        const unblock=await User.findByIdAndUpdate(id,{
            isBlocked:false,
        },
        {
            new:true,
        }
    );
    res.json({
        message:"User unblocked",
        user:unblock
    });
    }catch(error){
        throw new Error(error);
    }  
});

module.exports={createUser,loginUserCtrl,getallUser,getaUser,deleteaUser,updateaUser,blockUser,unblockUser};