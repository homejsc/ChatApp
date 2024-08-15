import jwt from "jsonwebtoken"

const generateJWTTokenAndSetCookie = (userid,res)=>{
    const token = jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn: '20d'
    })
    res.cookie("jwt",token,{
        maxAge: 20*24*60*60*1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: false

    })
}

export default generateJWTTokenAndSetCookie