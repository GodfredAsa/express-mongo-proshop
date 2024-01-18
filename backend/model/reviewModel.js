import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId , required: true, ref: "User"}, // user who created the product 
    name: {type: String, require: true},
    rating: {type: Number, required: true, default: 0 },
    comment: {type: String, required: true },
},{timestamps: true})

const Review = mongoose.model("Review", reviewSchema);
export default Review;