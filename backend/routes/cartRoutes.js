const express=require("express")
const Cart=require("../models/Cart")
const router=express.Router() 
const {protect}=require("../middleware/authMiddleware")

router.post("/add",protect,async(req,res)=>{
    try{
        const {productId}=req.body
        let cart=await Cart.findOne({userId:req.user.id})
        if(!cart){
            cart = await Cart.create({
                userId:req.user.id,
                items:[{productId,quantity:1}]
            })
        }
        else{
            const itemIndex=cart.item.findIndex(item=>item.productId.toString()===productId)
            if(itemIndex>-1){
                cart.items[itemIndex].quantity+=1
            }
            else{
                cart.items.push({productId,quantity:1})
            }
            await cart.save()
        }
        return res.status(201).json({message:"Product added to cart successfully"})
    }
    catch(err){
        return res.status(500).json({message:`error from add to cart ${err}`})
    }
})

module.exports=router