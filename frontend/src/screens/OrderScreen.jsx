import React, { useEffect } from 'react'
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../slices/ordersApiSlice'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const {id: orderId} = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
    const [ payOrder, {isLoading: loadingPay }] = usePayOrderMutation(orderId, order);
    // const [{isPending}, paypalDispatch] = usePaypalScriptReducer();
    const {data: paypal, isLoading: loadingPaypal, error: errorPaypal} = useGetPaypalClientIdQuery()
    const { userInfo } = useSelector((state)=> state.auth);

    // useEffect(()=> {
    //     if(!errorPaypal && loadingPay && paypal.clientId){
    //         const loadPaypayScript = async() =>{
    //             paypalDispatch({
    //                 type: 'resetOptions',
    //                 value: {'client-id': paypal.clientId,
    //                 currency: 'USD'
    //             }
    //             })
    //         }
    //     }

    // }, [order, paypal])
  return (
    <div>
      
    </div>
  )
}

export default OrderScreen
