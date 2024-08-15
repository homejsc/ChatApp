import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import generateJWTTokenAndSetCookie from "../utils/generateToken.js";


export const login = async(req,res)=>{
    try {
        const {username , password} = req.body
        const foundUser = await userModel.findOne({username})
        if(foundUser){
            const match= await bcrypt.compare(password,foundUser.password)
            if(match){
                generateJWTTokenAndSetCookie(foundUser._id,res)
                res.status(201).json(
                    {
                        user_id : foundUser._id,
                        username : username
                    }
                ) 

            }
            else{
                res.status(401).json({message: "Login credentials are wrong!!"})
            }
        }
        else{
            res.status(401).json({message: "Login credentials are wrong!!"})
        }
    } catch (error) {
        res.status(501).json({message: "Login failed"})
        console.log(error);
    }
}

const signup = async(req,res)=>{
    try {
        const {username,password}= req.body
        const hashedpassword = await bcrypt.hash(password,10)
        const foundUser = await userModel.findOne({username});

        if(foundUser){
            res.status(201).json({message: "Username aldready exists!!"})
        }
        else{
            const user = new userModel({username: username,password: hashedpassword})
            await user.save()
            generateJWTTokenAndSetCookie(user._id,res)
            res.status(201).json({message: "user created successfully"})
            
        }
    }
    catch(error){
        console.log(error);
        res.status(501).json({message: "sign up failed"})
    }
}
export default signup