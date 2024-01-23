import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Image, ListGroup, ListGroupItem, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import { UseDispatch, useDispatch } from 'react-redux';

const ProductScreen = () => {

    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = ( ) => {
        dispatch(addToCart({...product, qty}));
        navigate('/cart')
    }


    return (
        <React.Fragment>
            {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : 
            (
                    <>
                        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
                        <Row>
                            <Col md={5}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroupItem><h3>{product.name}</h3></ListGroupItem>
                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroupItem>
                                    <ListGroupItem><p>{product.description}</p></ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col><strong>${product.price}</strong></Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>{product.countInStock > 0 ? 'In Stock ' : 'Out of Stock'}</Col>
                                            </Row>
                                        </ListGroupItem>

                                      {product.countInStock > 0 && (
                                          <ListGroupItem>
                                          <Row>
                                              <Col>Quantity:</Col>
                                              <Col>
                                                <Form.Control
                                                 as='select'
                                                 value={qty}
                                                 onChange={(e)=> setQty(Number(e.target.value))}
                                                >
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={ x + 1} value={ x + 1} >{ x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                              </Col>

                                          </Row>
                                      </ListGroupItem>
                                      )}
                                        <ListGroupItem>
                                            <Button 
                                                className='btn-block' 
                                                type='button' 
                                                disabled={product.countInStock === 0} 
                                                onClick={addToCartHandler}
                                                >
                                                Add To Cart
                                            </Button>
                                        </ListGroupItem>
                                    </ListGroup>

                                </Card>
                            </Col>
                        </Row>

                    </>
                )}

        </React.Fragment>



    )
}

export default ProductScreen
