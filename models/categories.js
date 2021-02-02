const knex = require("../controler/database");

module.exports = (knex,category)=>{
    // all category from database;


    category.get("/category",(req,res)=>{
        knex.select("*").from("category").then((category_data)=>{
            res.send(category_data);
            console.log(category_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // specific category from database;


    category.get("/category/:id",(req,res)=>{
        knex.select("*").from("category").where("category_id",req.params.id).then((category_data)=>{
            res.send(category_data);
            console.log(category_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

// get categories of a product

    category.post("/category/product/:id",(req,res)=>{
        knex.select("*").from('product').innerJoin('category', 'category_id', 'product_id').where("category_id",req.params.id).then((data)=>{
            var dict = {
                "category_id":data[0].category_id,
                "department_id":data[0].department_id,
                "name":data[0].name
            }
            res.send(dict);
            console.log(dict);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // get categories of a Departmen 

    category.get("/category/inDepartment/:department_id",(req,res)=>{
        var department_id = req.params.department_id
        knex.select("*").from("category").where("department_id",department_id).then((inDepartment_data)=>{
            res.send(inDepartment_data);
            console.log(inDepartment_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

}   