const knex = require("../controler/database");

module.exports = (knex,shipping)=>{
    // Return shippings regions

    shipping.get("/shipping/regions",(req,res)=>{
        knex.select("*").from("shipping_region")
        .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((er)=>{
            console.log(er);
        })
    })

    // Return shippings regions

    shipping.get("/shipping/regions/:shipping_region_id",(req,res)=>{
        knex.select("*").from("shipping")
        .where("shipping_region_id",req.params.shipping_region_id)
        .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((er)=>{
            console.log(er);
        })
    })
}