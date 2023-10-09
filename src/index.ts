import dotenv from "dotenv"
dotenv.config()

import express  from "express";
import { authenticationMiddleware } from "./authentication";

const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({extended : true})) // TODO 
app.use(authenticationMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))