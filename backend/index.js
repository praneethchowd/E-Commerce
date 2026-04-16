const express= require("express")
const mongoose= require("mongoose")
const app= express()
const cors = require("cors")
require("dotenv").config()
const authRoutes=require("./routes/authRoutes")
const productRoutes=require("./routes/productRoutes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log(err)
    })

app.get("/",(req,res)=>{
    res.json({message:"server is running"})
})
app.use("/api/auth",authRoutes)
app.use("/api/product",productRoutes)
app.listen(5000,()=>console.log("server runns on port 5000"))

app.use("/api/auth", authRoutes)
const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`server runs on port ${PORT}`))