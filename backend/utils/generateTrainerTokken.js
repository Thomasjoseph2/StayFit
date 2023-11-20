
import jwt  from "jsonwebtoken";

const generateTrainerToken =(res,trainerId)=>{

    const token =jwt.sign({trainerId},process.env.JWT_SECRET,{expiresIn:'30d'})
  

    res.cookie('jwt',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== "development",
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 *1000
    
    })
}



export default generateTrainerToken