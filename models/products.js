const knex = require("../controler/database");

module.exports = (knex,products)=>{
    // get product from databases;

    products.get("/products",(req,res)=>{
        knex.select("*").from("product").then((product_data)=>{
            var dict = {
                "coutn":product_data.length,
                "row":product_data
            }
            res.send(dict);
            console.log(dict);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // product search 
    products.get("/product/search",(req,res)=>{
        var serach_word = req.query.name
        console.log(req.query)
        knex.select("*").from("product")
            .where("name","like",`%${serach_word}%`)
            .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })
    // product by product_id from databases;

    products.get("/products/:product_id",(req,res)=>{
        knex.select("*").from("product").where("product_id",req.params.product_id).then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })

    //  get products by category_id

    products.get("/products/inCategory/:category_id",(req,res)=>{
        knex.select("*").from("product").join("product_category","product.product_id","product_category.product_id")
        .where("category_id",req.params.category_id)
        .then((products_data)=>{
            var dict = {
                "count":products_data.length,
                "row":products_data
            }
            res.send(dict);
            console.log(dict);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // get products by department_id
    products.get("/product/inDepartment/:department_id",(req,res)=>{
        knex.select("product.product_id","product.name","product.description","product.price","product.discounted_price","product.image"
        ,"product.image_2","product.thumbnail").from("product")
        .join("product_category","product.product_id","product_category.product_id")
        .join("category","category.category_id","product_category.category_id")
        .where("category.department_id",req.params.department_id)
        .then((data)=>{
            var dict = {
                "count":data.length,
                "row":data
            }
            res.send(dict);
            console.log(dict);
        }).catch((err)=>{
            console.log(err);
        })
    })


    // get product Details by product_id

    products.get("/products/detail/:product_id",(req,res)=>{
        knex.select("product_id","name","description","price","discounted_price","image","image_2").from("product")
        .where("product_id",req.params.product_id)
        .then((details_data)=>{
            res.send(details_data);
            console.log(details_data);
        }).catch((err)=>{
            console.log(err);
        })
    })


    // get product Location by product_id

    products.get("/product/location/:product_id",(req,res)=>{
        knex.select('category.category_id','category.name as category_name','department.department_id','department.name as department_name')
        .from("category")
        .join("product_category","product_category.category_id","category.category_id")
        .join("department","department.department_id","category.department_id")
        .where("product_id",req.params.product_id)
        .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })

}