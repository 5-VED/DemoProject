const {UserModel} = require("../Models")
const {compareSync} = require("bcrypt")
const {JWT_SECRET} = require("../Config/config")
const jwt = require("jsonwebtoken")
const {readFile} = require("../Utils/files.utils")

module.exports = {
    signup:async(req,res)=> {
        try{
            const payload = await UserModel.findOne({email:req.body.email})
            if(payload){
                return res.status(400).json({
                    success:false,
                    message:"User already exist"
                })
            }

            const result = await UserModel.create(req.body)
            await readFile(req,res)

            return res.status(200).json({
                success:true,
                message:"User created successfully",
                data:result
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Internal server error",
                error
            })
        }
    },
    
    login:async(req,res) => {
        try{
            const {email,password} = req.body 
            const user = await UserModel.findOne({email,is_deleted:false,is_active:true}).populate('role')
            if(!user){
                return res.status(404).json({success:false,message:"User not registered"})
            }
            
            const isPasswordCorrect = compareSync(password,user.password)
            if(!isPasswordCorrect){
                return res.status(404).json({success:false,message:"Please enter correct password."})
            }

            const token = jwt.sign({email,_id:user._id,role:user.role}, JWT_SECRET,{expiresIn:"2d"})

            return res.status(200).json({
                success:true,
                message:"User logged in Successfully.",
                data:{
                    user,
                    token
                }
            })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"Internal server error",
                error
            })
        }
    }
}