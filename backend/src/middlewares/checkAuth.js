import jwt from 'jsonwebtoken'

export const protectRoute=(req,res,next)=>{
    const {token}=req.cookies
    try {
    if(!token){
        return res.status(401).json({message:"un Authorized"})
    }
    const decode=jwt.verify(token,process.env.SECRET)

    //add to request user Id
    req.userId=decode.id
        next()
    } catch (error) {
           if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
    }
  
}