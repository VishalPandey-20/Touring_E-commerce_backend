const knex = require("../controler/database");

module.exports = (knex,attributes)=>{
    // all data of attribute from database


    attributes.get("/attributes",(req,res)=>{
        knex.select("*").from("attribute").then((attribute_data)=>{
            res.send(attribute_data);
            console.log(attribute_data);
        }).catch((err)=>{
            console.log(err);
        })
    })


    // attribute_id

    attributes.get("/attributes/:attribute_id",(req,res)=>{
        var attribute_id = req.params.attribute_id
        knex.select("*").from("attribute").where("attribute_id",attribute_id).then((attribute_data)=>{
            res.send(attribute_data);
            console.log(attribute_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // attribute/value/attribute_id
    attributes.get("/attribute/value/:attribute_id",(req,res)=>{
        var attribute_id = req.params.attribute_id
        knex.select("attribute_value_id","value").from("attribute_value").where("attribute_value_id",attribute_id).then((attribute_value_data)=>{
            res.send(attribute_value_data);
            console.log(attribute_value_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // get all attributes with product id

    
    attributes.post("/attribute/inProduct/:id",(req,res)=>{
        var product_id = req.params.id
        knex("attribute").join("attribute_value","attribute_value.attribute_id","attribute.attribute_id")
        .where("attribute_value_id",product_id)
        .select("name as attribute_name","value as attribute_value","attribute_value_id")
        .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
        
    }) 

}