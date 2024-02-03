// this is to set user credentials to storage and remove

import  { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            // setting the user info to the payload.
            state.userInfo = action.payload;
            // set userInfo to local storage 
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },

        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
});

// NB: THIS IS NOT A CHILD [ productSlice, cartSlice ] SLICE SO ITS ADDED TO THE STORE DIRECTLY 
export const { setCredentials, logout }  = authSlice.actions;
export default authSlice.reducer;

