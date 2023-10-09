import express  from "express";

const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({extended : true})) // TODO 

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))