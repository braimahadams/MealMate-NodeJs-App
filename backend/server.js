import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import recipeRoutes from "./routes/recipeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import path, { dirname } from "path"
import {fileURLToPath} from "url"
import cookieParser from "cookie-parser"
import session from "express-session"
 

dotenv.config()

const app = express()
// config
const __filename = fileURLToPath(import.meta.url) // get the file name
const __dirname = dirname(__filename) // get directory name
// middlewares
// app.use(session({
//     secret: 'secret',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         secure: true,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))
app.use(cors( {
    credentials: true,
    origin: ['http://localhost:5173', 'https://food-recipe-zeta-plum.vercel.app']
}))
app.use(cookieParser())
app.use(express.json())
app.use("/Images", express.static(path.join(__dirname, "Images")))// make images accessible in browser

// routes
app.use("/api/foodrecipe", recipeRoutes)
app.use("/api/users", userRoutes)


// database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected")
    // listen to port
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port on ${process.env.PORT} `)
    })
}).catch(err => console.error(err))

