import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function CartPaymentMethodsList() {
  return (
    <div className="payment-options-div">
      <ul className="payment-options">
        <li>
          {' '}
          <div className="row">
            <div className="tick">
              {' '}
              <AiOutlineCheckCircle color="green" size={20} />
            </div>
            <div className="method-name">Cash on Delivery</div>
          </div>
        </li>
        <li>
          {' '}
          <div className="row">
            <div>
              {' '}
              <AiOutlineCheckCircle color="green" size={20} />
            </div>
            <div>Credit/Debit Card</div>
          </div>
        </li>
        <li>
          {' '}
          <div className="row">
            <div>
              {' '}
              <AiOutlineCheckCircle color="green" size={20} />
            </div>
            <div>PhonePe/Google Pay/BHIM UPI</div>
          </div>
        </li>
        <li>
          {' '}
          <div className="row">
            <div>
              {' '}
              <AiOutlineCheckCircle color="green" size={20} />
            </div>
            <div>Paytm/Payzapp/Wallets</div>
          </div>
        </li>
        <li>
          {' '}
          <div className="row">
            <div>
              {' '}
              <AiOutlineCheckCircle color="green" size={20} />
            </div>
            <div>Net Banking</div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CartPaymentMethodsList;
