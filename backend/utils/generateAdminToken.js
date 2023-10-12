import adminJwt  from "jsonwebtoken";

const generateAdminTokken =(res,userId)=>{

    const token =adminJwt.sign({userId},process.env.JWT_SECRET_FOR_ADMIN,{expiresIn:'30d'})
    
    res.cookie('adminJwt',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== "development",
        sameSite:'strict',
        maxAge:30 * 24 * 60 * 60 *1000
    
    })
}



export default generateAdminTokken