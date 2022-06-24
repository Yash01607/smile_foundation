import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { FaRupeeSign } from 'react-icons/fa';

import Product from '../Components/Product';
import MessageBox from '../Components/MessageBox';

import { GET_WISHLIST } from '../GraphQL/Wishlist/Querries';
import { GET_ACTIVE_ORDER } from '../GraphQL/Orders/Querries';

import CartProductList from '../Components/CartComponents/CartProductList';
import CartAddressList from '../Components/CartComponents/CartAddressList';
import CartPaymentMethodsList from '../Components/CartComponents/CartPaymentMethodsList';
import LoadingSpinner from '../Components/LoadingSpinner';

function CartScreen() {
  const [currentState, setcurrentState] = useState('cart');
  const [cartState, setcartState] = useState(false);
  const [addressState, setAddressState] = useState(false);
  const [paymentState, setPaymentState] = useState(false);

  const [addOrderShippingAddress, setaddOrderShippingAddress] = useState(false);

  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(GET_ACTIVE_ORDER);
  const {
    data: dataWishlist,
    loading: loadingWisjlist,
    error: errorWishlist,
  } = useQuery(GET_WISHLIST);

  const onbuttonClickHandler = () => {
    if (currentState === 'cart') {
      setcurrentState('address');
    } else if (currentState === 'address') {
      setaddOrderShippingAddress(true);
    }
  };

  return (
    <div className="body-pad cart-screen">
      {currentState === 'cart' && (
        <h1>
          My Cart{' '}
          <span>
            {data && data.activeOrder && data.activeOrder.lines
              ? `(${data.activeOrder.lines.length} Items)`
              : '(No Items)'}
          </span>
        </h1>
      )}
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.order && data.order.errorCode && (
        <MessageBox className="error">{data.order.message}</MessageBox>
      )}
      {data && data.activeOrder && data.activeOrder.lines ? (
        data.activeOrder.lines.length === 0 ? (
          <MessageBox className="loading">No Items added to Cart.</MessageBox>
        ) : (
          <div className="row cart-content">
            {currentState === 'cart' ? (
              <CartProductList refetch={refetch} data={data} />
            ) : currentState === 'address' ? (
              <CartAddressList
                addOrderShippingAddress={addOrderShippingAddress}
                setcurrentState={setcurrentState}
                cartScreen={true}
              />
            ) : (
              <CartPaymentMethodsList />
            )}
            <div className="price-details">
              <div className="price-distribution">
                <h2>
                  Price Details
                  {data && data.activeOrder && data.activeOrder.lines
                    ? `(${data.activeOrder.lines.length} Items)`
                    : '(No Items)'}
                </h2>
                <div className="row">
                  <p>Total MRP</p>
                  <p>
                    <FaRupeeSign />
                    {data && data.activeOrder && data.activeOrder.total}
                  </p>
                </div>
                <div className="row">
                  <p>Discount MRP</p>
                  <p>
                    - <FaRupeeSign />
                    {data && data.activeOrder && data.activeOrder.total}
                  </p>
                </div>
                <div className="row">
                  <p>Delivery Charge </p>
                  <p>
                    <FaRupeeSign />
                    {data && data.activeOrder && data.activeOrder.total}
                  </p>
                </div>
                <div className="price-distribution-border"></div>
                <div className="row">
                  <p className="bold">Total Amount </p>
                  <p className="bold">
                    <FaRupeeSign />
                    {data && data.activeOrder && data.activeOrder.total}
                  </p>
                </div>
                <div className="Select-Delivery-Address">
                  <button onClick={onbuttonClickHandler}>
                    {currentState === 'cart'
                      ? 'Select Delivery Address'
                      : currentState === 'address'
                      ? 'Move To Payment'
                      : 'Place Order'}
                  </button>
                </div>
              </div>
              {currentState === 'cart ' && (
                <div className="apply-coupons">
                  <h3>Apply Coupons</h3>
                  <div className="row">
                    <input
                      type={'text'}
                      placeholder="Enter Coupon Code"
                    ></input>
                    <span>Apply</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <MessageBox className="loading">No Items added to Cart.</MessageBox>
      )}
      {currentState === 'cart' && (
        <div>
          <h1>Add More From Wishlist</h1>
          <div className="row">
            {loadingWisjlist && <LoadingSpinner />}
            {errorWishlist && errorWishlist.message && (
              <MessageBox className="error">{errorWishlist.message}</MessageBox>
            )}
            {dataWishlist &&
              dataWishlist.activeCustomer &&
              dataWishlist.activeCustomer.errorCode && (
                <MessageBox className="error">
                  {dataWishlist.activeCustomer.message}
                </MessageBox>
              )}
            {!dataWishlist ? (
              <MessageBox className="loading">
                Please SignIn to View Wishlist
              </MessageBox>
            ) : dataWishlist &&
              dataWishlist.activeCustomer &&
              dataWishlist.activeCustomer.customFields &&
              dataWishlist.activeCustomer.customFields.Favourite &&
              dataWishlist.activeCustomer.customFields.Favourite.length ===
                0 ? (
              <MessageBox className="loading">
                No Items Added to wishList
              </MessageBox>
            ) : (
              dataWishlist &&
              dataWishlist.activeCustomer &&
              dataWishlist.activeCustomer.customFields &&
              dataWishlist.activeCustomer.customFields.Favourite &&
              dataWishlist.activeCustomer.customFields.Favourite.map(
                (product) => {
                  return <Product id={product}></Product>;
                }
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;
