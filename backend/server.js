// Application server
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import { notFound, errorhandler } from "./middleware/errorMiddle.js";
import cors from 'cors'

dotenv.config();

const port = process.env.PORT || 5000;
// const port = 5001;

connectDB(); // CONNECTION TO MONGODB

const app = express();

// Body Parser middleware 
app.use(express.json());
// cookie parser middleware allows access to request.cookies from the request objects.
// since our cookie is called jwt we can access it by req.jwt
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
// cors middleware 
app.use(cors())
app.options(process.env.FRONTEND_URL, cors);

// urls
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);


// add errorHandler and notFound immediate after all the routes
app.use(notFound);
app.use(errorhandler);

app.listen(port, () => console.log(`Server Running on ${port}`));
