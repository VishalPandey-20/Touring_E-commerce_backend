const knex = require("knex");

module.exports = (knex,department)=>{
        
    // all department from database;
    // console.log(knex);

    department.get("/department",(req,res)=>{
        knex.select("*").from("department").then((department_data)=>{
            res.send(department_data)
            console.log(department_data);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // spcific department_data from database;

    department.get("/department/:id",(req,res)=>{
        var id = req.params.id
        knex.select("*").from("department").where("department_id",id).then((data)=>{
            res.send(data)
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    })
}