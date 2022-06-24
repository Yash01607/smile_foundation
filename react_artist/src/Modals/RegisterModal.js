import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { REGISTER_USER } from '../GraphQL/Users/Mutations';

import MessageBox from '../Components/MessageBox';
import LoadingSpinner from '../Components/LoadingSpinner';

const RegisterModal = (props) => {
  const [emailAddress, setemailAddress] = useState('');
  const [password, setpassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [title, settitle] = useState('');
  const [lastName, setlastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  const [registerCustomerAccount, { loading, data, error }] =
    useMutation(REGISTER_USER);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    registerCustomerAccount({
      variables: {
        emailAddress,
        password,
        firstName,
        lastName,
        title,
        phoneNumber,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login-form" onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <LoadingSpinner />}
        {data &&
          data.registerCustomerAccount &&
          data.registerCustomerAccount.success && (
            <MessageBox className="success">
              You Have Successfully Registered. Please{' '}
              <span onClick={() => props.setcurrentState('login')}>Log In</span>{' '}
              again to continue
            </MessageBox>
          )}
        {error && <MessageBox className="error">{error.message}</MessageBox>}
        <div>
          {/* <label id="title">Enter Title</label> */}
          <input
            type="text"
            name="title"
            id="title"
            key="title"
            placeholder="Enter Title"
            required={true}
            onChange={(e) => settitle(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label id="firstname">Enter First Name</label> */}
          <input
            type="text"
            name="firstname"
            id="firstname"
            key="firstname"
            placeholder="Enter First Name"
            required={true}
            onChange={(e) => setfirstName(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label id="lastname">Enter Last Name</label> */}
          <input
            type="text"
            name="lastname"
            id="lastname"
            key="lastname"
            placeholder="Enter Last Name"
            required={true}
            onChange={(e) => setlastName(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label id="phoneNumber">Enter Phone No.</label> */}
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            key="phoneNumber"
            placeholder="Enter Phone Number"
            required={true}
            onChange={(e) => setphoneNumber(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label id="emailAddress">Enter E-Mail</label> */}
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            key="emailAddress"
            placeholder="Enter E-mail"
            required={true}
            onChange={(e) => setemailAddress(e.target.value)}
          ></input>
        </div>
        <div>
          {/* <label id="password">Enter Password</label> */}
          <input
            type="password"
            name="password"
            id="password"
            key="password"
            placeholder="Enter Password"
            required={true}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button onClick={onSubmitHandler} type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{'  '}
            <span onClick={() => props.setcurrentState('login')}>Log In.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
