const knex = require("../controler/database");

module.exports = (knex,tax)=>{
    // get all taxes;


    tax.get("/tax",(req,res)=>{
        knex.select("*").from("tax")
        .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((er)=>{
            console.log(er);
        })
    })

    // get tax by id

    tax.get("/tax/:tax_id",(req,res)=>{
        knex.select("*").from("tax")
        .where("tax_id",req.params.tax_id)
        .then((data)=>{
            res.send(data[0]);
            console.log(data[0]);
        }).catch((er)=>{
            console.log(er);
        })
    })

}