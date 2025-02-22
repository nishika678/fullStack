const express=require('express');
const {createUser, loginUserCtrl, getallUser, getaUser, deleteaUser, updatedUser, blockUser, unblockUser, handleRefereshToken, logout}=require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router=express.Router();

router.post("/register",createUser);
router.post("/login",loginUserCtrl);
router.get("/all-users",getallUser);
router.get("/refresh",handleRefereshToken);
router.get("/logout",logout);
router.get("/:id",
    authMiddleware,
    isAdmin,
    getaUser);
router.delete("/:id",deleteaUser);
router.put("/edit-user",authMiddleware,updatedUser);
router.put("/block-user/:id",authMiddleware,isAdmin,blockUser);
router.put("/unblock-user/:id",authMiddleware,isAdmin,updatedUser,unblockUser);
module.exports=router;