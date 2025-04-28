const {UserModel} = require('../Models')

const auth = ({isTokenRequired = false, allowedUsers=[]}={})=> {
    return async (req,res,next) => {
        try{
            const token = req.headers('x-auth-token') || req.headers('Authorization')

            if(!isTokenRequired && token){
                
            }

            if(!token){
                return res.status(400).json({
                    success:false,
                    message:"You are not authorized to access this source."
                })
            }

            

        }catch(error){
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
                data:error
            })
        }
    } 
}

module.exports = auth;