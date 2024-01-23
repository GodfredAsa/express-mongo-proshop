import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// get the cartItems from storage if present or return an empty array of the cartItems if not present.
const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}

// helper function for ensuring proper decimal places 



const cartSlice  = createSlice({
    name: "cart",
    initialState,
    // contains reducer functions 
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            }else{
                state.cartItems = [...state.cartItems, item]
            }
           return updateCart(state);
        },
        // the id is in the action payload 
        removeFromCart: (state, action) =>{
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
            return updateCart(state)
        }
    }
})

// export the addToCart function 
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer; 