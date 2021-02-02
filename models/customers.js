const knex = require("../controler/database");

module.exports = (knex,customers)=>{
    // rejecter customers

    customers.post("/customers",async(req,res)=>{
        try{
            var name = req.body.name
            var email = req.body.email
            var password = req.body.password
            if(email.includes("@gmail.com")){
                knex("customer").insert({
                    "name":name,
                    "email":email,
                    "password":password
                }).then(()=>{
                    knex("customer").where("email",req.body.email)
                    .then((data)=>{
                        var token = jwt.sign({"email":email},"navgurukul",{expiresIn:"1h"})
                        res.cookie(token)
                        res.send(data);
                        console.log(data);
                        // console.log("token",token);
                    })
                })
            }else{
                console.log("invalide email");
            }
        }catch(err){
            console.log(err);
        }
        
    })

    // // updata a customer

    customers.put("/customer/updata",(req,res)=>{
        var customer_id = req.body.category_id
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password
        var credit_card = req.body.credit_card
        var address_1 = req.body.address_1
        var address_2 = req.body.address_2
        var city = req.body.city
        var region = req.body.region
        var postal_code = req.body.postal_code
        var country = req.body.country
        var shipping_region_id = req.body.shipping_region_id
        var day_phone = req.body.day_phone
        var eve_phone = req.body.eve_phone
        var mob_phone = req.body.mob_phone
        knex("customer").where("email",email)
        .update({
            "customer_id":customer_id,
            "name":name,
            "password":password,
            "credit_card":credit_card, 
            "address_1":address_1,
            "address_2":address_2,
            "city":city,
            "region":region,
            "postal_code":postal_code,
            "country":country,
            "shipping_region_id":shipping_region_id,
            "day_phone":day_phone,
            "eve_phone":eve_phone,
            "mob_phone":mob_phone
        }).then((data)=>{
            res.send("data update successful.");
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })



    // get customer by id

    customers.get("/customer",(req,res)=>{
        knex("customer").where("email",req.body.email)
        .then((data)=>{
            delete data[0].password
            res.send(data);
            console.log(data);
        })
        res.status(400).json({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500"
        })
    })


    // customer login 


    customers.post("/customer/login",(req,res)=>{
        // let token = req.headers.cookie
        var email = req.body.email
        var password = req.body.password
        // console.log(req.email);
        if(email.includes("@gmail.com")){
            knex.select("*").from("customer").where("email",email)
            .then((data)=>{
                if (data[0].password == password){
                    res.send("logIn successful..");
                    console.log("logIn successful..");
                    console.log(data);
                }else{
                    res.send("password is worng..");
                    console.log("password is worng..");
                }
            }).catch((err)=>{
                console.log(err);
        })
        }else{
            res.send("invalid email..");
            console.log("invalid email..");
        }
    })
    // login thorugh facebook
    customers.post("/customer/facebook",(req,res)=>{
        res.send("this feature will come soon..");
        console.log("this feature will come soon..");
    })


    // update address from the customer

    customers.put("/customer/address",(req,res)=>{
        knex("customer").where("email",req.body.email).update(req.body)
        .then((data)=>{
            res.send("data update successful.");
            console.log("data update successful.");
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })


}