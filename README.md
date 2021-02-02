# Touring_E-commerce_backend

In this project, I have made a backend of an e-commerce website using the Express framework of NodeJS. I have also used JWT-authentication to verify if the customer is valid or not. We have already given the mysql-database in which there are different tables and their data. I have written different API’s to work each action of the user while it is calling the specific API’s. This is an E-Commerce website backend where customers can buy any product and if the company wants to add, update, delete a product or customer that can also be done. There are different Api’s which help to do the above activity.

If you don’t have mysql-server then install it in your machine by running the following commands on the terminal:) $ sudo apt-get update $ sudo apt-get install mysql-server

There is data of this site in the database in different tables named according to data stored in them, to get the database in mysql run these commands:)

There is a tshirtshop.sql file already present in the database/ folder. You have to import this file to an empty database. For this, make a new database first, and navigate to the database/ directory and then write the following commands: Import the schema using For checking the data, log into your user, You would be asked for your password. Now, you can use database with all its tables' data.

Export Schema of DB $ mysqldump -u root -p --no-data e_commerce > schema.sql

Import Schema mysql -u <user_name> -p <database_name> < tshirtshop.sql
