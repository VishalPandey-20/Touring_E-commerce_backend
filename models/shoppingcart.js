const knex = require("../controler/database");

module.exports = (knex,shoppingcart)=>{
    // generate the unique Card_id

    shoppingcart.get("/shopping_cart/unique_id",(req,res)=>{
        var text = "";
            var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
            for(var i=0; i<10; i++){
                text += char_list.charAt(Math.floor(Math.random() * char_list.length))
            }
            var cart_id = {
                "cart_id": text
            }
            console.log("This is your cart_id");
            console.log(cart_id);
            res.send(cart_id);
            var id=Math.round((Math.random()*100)+1);
            var cart_id=id;
    })

    // add a product in the cart

    shoppingcart.post("/shoppingcart/add",(req,res)=>{
        var id=Math.round((Math.random()*100)+1);
        var cart_id=id;
        let add_data={
            'cart_id':cart_id,
            'product_id':req.body.product_id,
            'attributes':req.body.attributes,
            'quantity':req.body.quantity,
            'added_on':new Date()
        }
        knex("shopping_cart").insert(add_data)
        .then(()=>{
            knex.select('item_id','name','attributes','shopping_cart.product_id','price','quantity','image')
            .from('shopping_cart')
            .join('product', function() {
                this.on('shopping_cart.product_id','=','product.product_id')
                }).then((data)=>{
                    res.send(data);
                    console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        })
    })

    // get a list of products in shopping_cart_id


    shoppingcart.get("/shoppingcart/:cart_id",(req,res)=>{
        knex("shopping_cart").where("cart_id",req.params.cart_id).join("product",function(){
            this.on('shopping_cart.product_id','=','product.product_id')
        }).then((data)=>{
            var user_data = {
                "item_id":data[0].item_id,
                "name":data[0].name,
                "attributes":data[0].attributes,
                "product_id":data[0].product_id,
                "price":data[0].price,
                "quantity":data[0].quantity,
                "image":data[0].image
            }
            res.send(user_data);
            console.log(user_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // update the cart by item

    shoppingcart.put("/customer/update/:item_id",(req,res)=>{
        knex("shopping_cart").join("product",function(){
            this.on("shopping_cart.product_id","=","product.product_id")
        }).then(()=>{
            knex("shopping_cart").where("item_id",req.params.item_id)
            .update({"quantity":req.body.quantity})
            .then((data)=>{
                res.send("data update successful..");
                console.log("data update successful..");
                console.log(data);
            }).catch((err)=>{
                console.log(err);
            })
        })
    })

    // empty cart

    shoppingcart.delete("/shopping_cart/empty/:cart_id",(req,res)=>{
        knex("shopping_cart").where("cart_id",req.params.cart_id)
        .del()
        .then((data)=>{
            res.send("data delete successful...");
            console.log("data delete successful...");
            console.log(data);
        })
    })

    // return a total amount from cart_id

    shoppingcart.get("/shopping_cart/total_amount/:cart_id",(req,res)=>{
        knex("shopping_cart").where("cart_id",req.params.cart_id).join("product",function(){
            this.on("shopping_cart.product_id","=","product.product_id")
        }).then((data)=>{
            var total_amount = {
                "total_amount":data[0].price
            }
            res.send(total_amount);
            console.log(total_amount);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // move a product to cart
    // frist create a table "cart"
    shoppingcart.get("/shopping_cart/moveToCart/:item_id",(req,res)=>{
        knex.schema.hasTable('cart').then((exists)=>{
            if(!exists){
                return knex.schema.createTable("cart",(t)=>{
                    t.increments('item_id').primary();
                    t.string('cart_id');
                    t.string("name");
                    t.integer('product_id');
                    t.string('attributes');
                    t.decimal("price");
                    t.integer('quantity');
                    t.integer('buy_now');
                    t.datetime('added_on');
                }).then((data)=>{
                    // res.send("table create successfuly....")
                    console.log("xcvbnm,rtyui11111");
                    console.log("table create successfuly....");
                })
            }else{
                knex("shopping_cart").join("product","shopping_cart.product_id","product.product_id")
                    .select('shopping_cart.item_id',"product.name","shopping_cart.attributes","shopping_cart.product_id",
                    "product.price","shopping_cart.quantity","shopping_cart.cart_id")
                    .where("shopping_cart.item_id",req.params.item_id)
                    .then((data)=>{
                        if(data.length!=0){
                            var to_store = data[0]
                            knex("cart").insert(to_store)
                            .where("cart.item_id",req.params.item_id)
                            .then((data1)=>{
                                res.send("data sending successfuly..");
                                console.log("data sending successfuly..");
                                console.log(data);
                            }).catch((ar)=>{
                                console.log(ar);
                            })
                        }else{
                            console.log("data is not finding...");
                        }
                    }).catch((arr)=>{
                        console.log(arr);
                    })
            }
        })
    })

    // get products saved for cart;

    shoppingcart.get("/shopping_cart/forCart/:cart_id",(req,res)=>{
        knex.select("item_id","name","attributes","price").from("cart").where("cart_id",req.params.cart_id)
        .then((data)=>{
            res.send(data);
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })

    })

    // remove a product in the cart

    shoppingcart.delete("/shopping_cart/remove_product/:item_id",(req,res)=>{
        knex.select("*").from("cart")
        .where("item_id",req.params.item_id)
        .del()
        .then(()=>{
            res.send("data delete successfuly...");
            console.log("data delete successfuly...");
        }).catch((err)=>{
            console.log(err);
        })
    })


}