export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
     // calculate the items price 
            // adding itemsPrice attribute to the state then calculating the price 
            // const itemsPrice = Number(addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            
            // shipping price [ if itemsPrice > 100, 0 else 10 
            state.shippingPrice = Number(state.itemsPrice) < 100 ? 0 : 10
            // tax price 15%
            state.taxPrice = (Number(state.itemsPrice) * 0.15 ).toFixed(2);
            // console.log({taxPrice: state.taxPrice});
            // console.log({shippingPrice: state.shippingPrice});

            // total price 
            state.totalPrice = (Number(state.shippingPrice) + Number( state.itemsPrice) + Number(state.taxPrice)).toFixed(2);
            // console.log({totalPrice: state.totalPrice});

            // save state to storage 
            localStorage.setItem('cart', JSON.stringify(state));
            return state;
}