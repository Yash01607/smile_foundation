import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_ACTIVE_CUSTOMRE_DETAILS } from '../GraphQL/Users/Querries';

import CartAddressList from '../Components/CartComponents/CartAddressList';
import TermsOfUse from '../Components/UserScreenCOmponents/TermsOfUse';
import PrivacyPolicy from '../Components/UserScreenCOmponents/PrivacyPolicy';
import MessageBox from '../Components/MessageBox';
import LoadingSpinner from '../Components/LoadingSpinner';

function UserInfoScreen() {
  const [currentSelected, setcurrentSelected] = useState('overview');

  const { data, loading, error } = useQuery(GET_ACTIVE_CUSTOMRE_DETAILS);

  return (
    <div className="body-pad">
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.activeCustomer && data.activeCustomer.errorCode && (
        <MessageBox className="error">{data.activeCustomer.message}</MessageBox>
      )}
      {data && data.activeCustomer && (
        <div className="userName">
          <h4>Account</h4>
          <h4>
            <strong>
              {data.activeCustomer.firstName} {data.activeCustomer.lastName}
            </strong>
          </h4>
        </div>
      )}
      {data && data.activeCustomer && (
        <div className="row userinfo">
          <div className="infolist">
            <h4
              onClick={() => setcurrentSelected('overview')}
              style={{
                fontWeight: currentSelected === 'overview' ? '700' : '400',
              }}
            >
              Overview
            </h4>
            <h4
              onClick={() => setcurrentSelected('orders&returns')}
              style={{
                fontWeight:
                  currentSelected === 'orders&returns' ? '700' : '400',
              }}
            >
              Oders & Returns
            </h4>
            <h4
              onClick={() => setcurrentSelected('coupons')}
              style={{
                fontWeight: currentSelected === 'coupons' ? '700' : '400',
              }}
            >
              Coupons
            </h4>
            <h4
              onClick={() => setcurrentSelected('addresses')}
              style={{
                fontWeight: currentSelected === 'addresses' ? '700' : '400',
              }}
            >
              Addresses
            </h4>
            <h4
              onClick={() => setcurrentSelected('payments')}
              style={{
                fontWeight: currentSelected === 'payments' ? '700' : '400',
              }}
            >
              Payments
            </h4>
            <h4
              onClick={() => setcurrentSelected('termsofuse')}
              style={{
                fontWeight: currentSelected === 'termsofuse' ? '700' : '400',
              }}
            >
              Terms of Use
            </h4>
            <h4
              onClick={() => setcurrentSelected('privacypolicy')}
              style={{
                fontWeight: currentSelected === 'privacypolicy' ? '700' : '400',
              }}
            >
              Privacy Policy
            </h4>
          </div>
          <div className="infoinfo">
            {currentSelected === 'overview' ? (
              <div className="row overview">
                <div className="entitity-name">
                  <p>Full Name</p>
                  <p>Mobile Number</p>
                  <p>Email Address</p>
                  <p>Alternate Mobile Number</p>
                </div>
                <div className="entitity-value">
                  <h2>
                    {data.activeCustomer.firstName
                      ? `${data.activeCustomer.firstName} ${data.activeCustomer.lastName}`
                      : '- Not Added -'}
                  </h2>
                  <h2>{data.activeCustomer.phoneNumber || '- Not Added -'}</h2>
                  <h2>{data.activeCustomer.emailAddress || '- Not Added -'}</h2>
                  <h2>{`${
                    data.activeCustomer.altphoneNumber
                      ? data.activeCustomer.altphoneNumber
                      : '- Not Added -'
                  }`}</h2>
                </div>
              </div>
            ) : currentSelected === 'orders&returns' ? (
              <p></p>
            ) : currentSelected === 'coupons' ? (
              <p></p>
            ) : currentSelected === 'addresses' ? (
              <CartAddressList />
            ) : currentSelected === 'payments' ? (
              <p></p>
            ) : currentSelected === 'termsofuse' ? (
              <TermsOfUse />
            ) : currentSelected === 'privacypolicy' ? (
              <PrivacyPolicy />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfoScreen;
