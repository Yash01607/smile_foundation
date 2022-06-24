import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { SET_ORDER_SHIPPING_ADDRESS } from '../../GraphQL/Orders/Mutations';
import { GET_ADDRESSES_LIST } from '../../GraphQL/Users/Querries';
import { GET_ACTIVE_CUSTOMRE_DETAILS } from '../../GraphQL/Users/Querries';

import MessageBox from '../MessageBox';

import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import LoadingSpinner from '../LoadingSpinner';

function CartAddressList(props) {
  const [orderaddress, setorderaddress] = useState({});

  const { data, loading, error } = useQuery(GET_ADDRESSES_LIST);

  const {
    data: dataloggedin,
    loading: loadingloggedIn,
    error: errorloggedIn,
  } = useQuery(GET_ACTIVE_CUSTOMRE_DETAILS);

  const [
    setOrderShippingAddress,
    { data: dataAddress, error: errorAddress, loading: loadingAddres },
  ] = useMutation(SET_ORDER_SHIPPING_ADDRESS);

  useEffect(() => {
    if (data && data.activeCustomer && data.activeCustomer.addresses) {
      setorderaddress(data.activeCustomer.addresses[0]);
    }
  }, [data]);

  if (props.addOrderShippingAddress) {
    if (orderaddress && orderaddress !== {}) {
      setOrderShippingAddress({
        variables: {
          fullName: orderaddress.fullName,
          streetLine1: orderaddress.streetLine1,
          streetLine2: orderaddress.streetLine2,
          city: orderaddress.city,
          province: orderaddress.province,
          postalCode: orderaddress.postalCode,
          countryCode: orderaddress.country && orderaddress.country.code,
          phoneNumber: orderaddress.phoneNumber,
        },
      });
    }
  }

  if (
    dataAddress &&
    dataAddress.setOrderShippingAddress &&
    dataAddress.setOrderShippingAddress.id
  ) {
    // console.log(dataAddress);
    props.setcurrentState('payment');
  }

  console.log(dataloggedin);

  if (data)
    return (
      <div>
        {loadingloggedIn && <LoadingSpinner />}
        {errorloggedIn && errorloggedIn.message && (
          <MessageBox className="error">{errorloggedIn.message}</MessageBox>
        )}
        {dataloggedin &&
          dataloggedin.activeCustomer &&
          dataloggedin.activeCustomer.errorCode && (
            <MessageBox className="error">
              {dataloggedin.activeCustomer.message}
            </MessageBox>
          )}
        {dataloggedin && !dataloggedin.activeCustomer && (
          <MessageBox className="error">
            Please <Link to={'/login'}>Sign in</Link> before selecting shipping
            address
          </MessageBox>
        )}
        {loadingAddres && <LoadingSpinner />}
        {errorAddress && errorAddress.message && (
          <MessageBox className="error">{errorAddress.message}</MessageBox>
        )}
        {dataAddress &&
          dataAddress.setOrderShippingAddress &&
          dataAddress.setOrderShippingAddress.errorCode && (
            <MessageBox className="error">
              {dataAddress.setOrderShippingAddress.message}
            </MessageBox>
          )}
        {loading && <LoadingSpinner />}
        {error && error.message && (
          <MessageBox className="error">{error.message}</MessageBox>
        )}
        {data && data.activeCustomer && data.activeCustomer.errorCode && (
          <MessageBox className="error">
            {data.activeCustomer.message}
          </MessageBox>
        )}
        {data &&
        data.activeCustomer &&
        data.activeCustomer.addresses &&
        data.activeCustomer.addresses.length === 0 ? (
          <MessageBox className="loading">No address added</MessageBox>
        ) : (
          data &&
          data.activeCustomer &&
          data.activeCustomer.addresses &&
          data.activeCustomer.addresses.map((address) => {
            return (
              <div className="address-div">
                <div className="row">
                  {' '}
                  <div className="address-border-left"></div>
                  {props.cartScreen && address.id === orderaddress.id ? (
                    <AiOutlineCheckCircle color="green" size={20} />
                  ) : props.cartScreen ? (
                    <BsCircle
                      onClick={() => setorderaddress(address)}
                      size={20}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <p className="para-1">{address.fullName}</p>
                <p className="bold">{`${address.streetLine1}, ${address.streetLine2}, ${address.city}, ${address.province}, ${address.country.name} - ${address.postalCode}`}</p>
                <p className="para-1">{`Mobile: ${address.phoneNumber}`}</p>
                <div className="row address-button">
                  <button>Remove</button>
                  <button>Edit</button>
                </div>
              </div>
            );
          })
        )}
        <h3 className="new-address">+ Add a New Address</h3>
      </div>
    );
}

export default CartAddressList;
