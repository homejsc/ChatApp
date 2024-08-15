import jwt from "jsonwebtoken";

const verifyToken = (req,res,next)=>{
    const Token = req.cookies.jwt
    if(!Token){
        return res.status(401).json({message: "Unauthorized: Token not provided"})
    }
    try {
        const decodedToken =  jwt.verify(Token,process.env.JWT_SECRET )
        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Unathourized: Invalid Token"})
    }
}

export default verifyToken 