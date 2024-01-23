// Application server
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorhandler } from "./middleware/errorMiddle.js";
import cors from 'cors'
dotenv.config();

const port = process.env.PORT || 5000;
// const port = 5001;

connectDB(); // CONNECTION TO MONGODB

const app = express();

app.use(cors())
app.options("http://localhost:3000", cors);
app.use("/api/products", productRoutes);

// add errorHandler and notFound immediate after all the routes
app.use(notFound);
app.use(errorhandler);

app.listen(port, () => console.log(`Server Running on ${port}`));
