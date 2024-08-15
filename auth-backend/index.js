
import express from "express"
import dotenv from "dotenv"
import authrouter from "./routes/auth.routes.js"
import userRouter from "./routes/users.route.js"
import connectToMongodb from "./db/connectToMongodb.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors({
    credentials : true,
    origin: ["http://localhost:3000" , "http://localhost:3001", `${process.env.HOST}:3000` , `${process.env.HOST}:3001`]
}))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("GGGGGG!!!!!")
})

app.use('/auth',authrouter)
app.use('/users',userRouter)

app.listen(PORT,()=>{
    connectToMongodb()
    console.log(`Server is connected to http://localhost:${PORT}`);
})