import mongoose from "mongoose";
import dotenv  from 'dotenv';
import colors from "colors";
import users from "./data/users.js";
import products from "./data/product.js";

import User from "./model/userModel.js";
import Product from "./model/productModel.js"
import Order from "./model/orderModel.js"
import connectDB from "./config/db.js";


dotenv.config();
connectDB();


const importData = async () => {
    try{
        // delete all order records 
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // creating users by inserting many
        const createdUsers = await User.insertMany(users);

        // getting admin user from the createdUsers
        const adminUser = createdUsers[0]._id;

        // building a product with admin user
        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported Successfully".green.inverse);
        // killing the process 
        process.exit();

    }catch(error){
        console.log(`Error importing Data`.red.inverse);
        console.log(`${error.message}`.red.inverse);

        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed Successfully".green.inverse);
        process.exit()

    } catch (error) {
        console.error("Data Destroyed Successfully".red.inverse);
        console.log(`${error.message}`.red.inverse);
        process.exit(1);
    }
}

// test running this file while all other codes where commented out 
// output below when file was ran at test </> `node backend/seerder -d
// [
//     '/Users/macintosh/.nvm/versions/node/v20.5.0/bin/node',
//     '/Users/macintosh/Documents/NODE-PROJECTS/PRODSHOP-ECOMMERCE/backend/seeder',
//     '-d'
//   ]
console.log(process.argv)

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}

// created a script that runs the command above in the root package.json file
// line 12 and 13 
// we can run