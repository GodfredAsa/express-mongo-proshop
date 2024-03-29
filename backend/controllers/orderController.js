import asyncHandler from '../middleware/asyncHandler.js';

import Order from '../model/orderModel.js';

// @desc Create new order 
// route POST /api/orders
// @access PRIVATE 
const addOrderItems = asyncHandler (async (req, res) => {
    const {
        orderItems, // array of items 
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No Order Item')
    }else{
        const order = new Order({
        // we set the _id to undefined bcos in order model the id for orderItems not available.
        orderItems: orderItems.map((x) => ({...x, product: x._id, _id: undefined})),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
        })
        // saving created order 
        // console.log(orderItems);
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});


// @desc get logged in user's order 
// route GET /api/orders/mine
// @access PRIVATE 
const getMyOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});


// @desc get order by ID logged in user's order 
// routes api/orders/:id
// @access PRIVATE 
const getOrderById = asyncHandler (async (req, res) => {
    const orderId = req.params.id
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Error("Order not found")
    }
});


// @desc UPDATE order to paid
// route PUT /api/orders/:id/pay
// @access PRIVATE/ADMIN  
const updateOrderToPaid = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true,
        order.paidAt = Date.now(),
        // from paypal
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder)

    }else{
        res.status(404)
        throw new Error('Order not found');
    }
});

// @desc UPDATE order to delivered 
// route PUT /api/orders/:id/deliver
// @access PRIVATE/ADMIN  
const updateOrderToDelivered = asyncHandler (async (req, res) => {
    const order = Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found');
    }
});

// @desc get all orders
// route GET /api/orders
// @access PRIVATE/ADMIN   
const getOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)
});


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};