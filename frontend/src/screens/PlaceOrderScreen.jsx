import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const [ createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(()=> {
        if(!cart.shippingAddress.address){
            navigate('/shipping')
        }else if(!cart.paymentMethod){
            navigate('/payment')
        }
    }, [cart.shippingAddress.address,cart.paymentMethod, navigate]);
    
    const placeOrderHandler = async() => {

        console.log("Placing orders ");

        const myOrder = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }

        localStorage.setItem('order',JSON.stringify(myOrder));

        
      try {
            // unwrapped bcos it return a promise 
        const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/orders/${res._id}`)
      } catch (error) {
        toast.error(error.message)
      }
    }
  return (
    <>
       <CheckoutSteps step1 step2 step3 step4/>

       <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}, 
                        {cart.shippingAddress.address}{' '},
                        {cart.shippingAddress.postalCode}{' '},
                        {cart.shippingAddress.country}{' '}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method:</strong>
                    {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? (
                        <Message>Your Cart is Empty</Message>
                    ): (
                    <ListGroup>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image 
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                            />
                                    </Col>
                                   <Col>
                                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                                   </Col>
                                    <Col md={4}>
                                    {item.qty} x {item.price} = $ {item.qty * item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                    </ListGroup>)}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items: </Col>
                            <Col>${cart.itemsPrice} </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping: </Col>
                            <Col>${cart.shippingPrice} </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax: </Col>
                            <Col>${cart.taxPrice} </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total: </Col>
                            <Col>${cart.totalPrice} </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                       {error && <Message variant={'danger'}>{error?.message}</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button 
                            type='button' disabled={cart.cartItems.length === 0 }
                            className='btn-block '
                            onClick={placeOrderHandler}
                            >Place Order</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                       {isLoading && <Loader/>}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>

       </Row>
    </>
  )
}

export default PlaceOrderScreen
