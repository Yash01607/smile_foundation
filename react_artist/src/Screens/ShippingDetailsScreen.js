import { useMutation, useQuery } from '@apollo/client';

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { SET_ORDER_SHIPPING_ADDRESS } from '../GraphQL/Orders/Mutations';
import { GET_COUNTRIES_LIST } from '../GraphQL/Orders/Querries';

import MessageBox from '../Components/MessageBox';
import LoadingSpinner from '../Components/LoadingSpinner';

function ShippingDetailsScreen() {
  const [fullName, setfullName] = useState('');
  const [streetLine1, setstreetLine1] = useState('');
  const [streetLine2, setstreetLine2] = useState('');
  const [city, setcity] = useState('');
  const [province, setprovince] = useState('');
  const [postalCode, setpostalCode] = useState('');
  const [countryCode, setcountryCode] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  const navigate = useNavigate();

  const [setOrderShippingAddress, { data, error, loading }] = useMutation(
    SET_ORDER_SHIPPING_ADDRESS
  );

  useEffect(() => {
    if (
      data &&
      data.setOrderShippingAddress &&
      data.setOrderShippingAddress.id
    ) {
      navigate('/paymentmethod');
    }
  }, [data, navigate]);

  const {
    data: dataCountries,
    loading: loadingCountries,
    error: errorCountries,
  } = useQuery(GET_COUNTRIES_LIST);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setOrderShippingAddress({
      variables: {
        fullName,
        streetLine1,
        streetLine2,
        city,
        province,
        postalCode,
        countryCode,
        phoneNumber,
      },
    });
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1>Enter Address</h1>
        </div>
        {loading && <LoadingSpinner />}
        {error && error.message && (
          <MessageBox className="error">{error.message}</MessageBox>
        )}
        {data &&
          data.setOrderShippingAddress &&
          data.setOrderShippingAddress.errorCode && (
            <MessageBox className="error">
              {data.setOrderShippingAddress.message}
            </MessageBox>
          )}
        <div>
          <label id="fullName">Enter Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            key="fullName"
            placeholder="Enter fullName"
            required={true}
            onChange={(e) => setfullName(e.target.value)}
          ></input>
        </div>

        <div>
          <label id="StreetLine1">Enter StreetLine1</label>
          <input
            type="text"
            name="StreetLine1"
            id="StreetLine1"
            key="StreetLine1"
            placeholder="Enter StreetLine1"
            required={true}
            onChange={(e) => setstreetLine1(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="StreetLine2">Enter StreetLine2</label>
          <input
            type="text"
            name="StreetLine2"
            id="StreetLine2"
            key="StreetLine2"
            placeholder="Enter  StreetLine2"
            required={true}
            onChange={(e) => setstreetLine2(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="City">Enter City</label>
          <input
            type="text"
            name="City"
            id="City"
            key="City"
            placeholder="Enter  City"
            required={true}
            onChange={(e) => setcity(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="Province">Enter Province</label>
          <input
            type="text"
            name="Province"
            id="Province"
            key="Province"
            placeholder="Enter  Province"
            required={true}
            onChange={(e) => setprovince(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="postalCode">Enter Postal Code</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            key="postalCode"
            placeholder="Enter postalCode"
            required={true}
            onChange={(e) => setpostalCode(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Select Country</label>
          {loadingCountries && <LoadingSpinner />}
          {errorCountries && errorCountries.message && (
            <MessageBox className="error">{errorCountries.message}</MessageBox>
          )}
          {dataCountries &&
            dataCountries.availableCountries &&
            dataCountries.availableCountries.errorCode && (
              <MessageBox className="error">
                {dataCountries.availableCountries.message}
              </MessageBox>
            )}
          {!dataCountries ? (
            <MessageBox className="loading">No Countries Found</MessageBox>
          ) : (
            <select
              value={countryCode}
              onChange={(e) => setcountryCode(e.target.value)}
            >
              <option value="default">---Select Country---</option>
              {dataCountries.availableCountries.map((country) => {
                return (
                  <option key={country.id} value={country.code}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <label id="phoneNumber">Enter Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            key="phoneNumber"
            placeholder="phoneNumber"
            required={true}
            onChange={(e) => setphoneNumber(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">Proceed</button>
        </div>
      </form>
    </div>
  );
}

export default ShippingDetailsScreen;
