import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../GraphQL/Users/Mutations";

import MessageBox from "../Components/MessageBox";

const RegisterScreen = () => {
  const [emailAddress, setemailAddress] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [title, settitle] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

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
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <MessageBox className="loading">loading...</MessageBox>}
        {data &&
          data.registerCustomerAccount &&
          data.registerCustomerAccount.success && (
            <MessageBox className="success">
              You Have Successfully Registered. Please{" "}
              <Link to={"/login"}>Log In</Link> again to continue
            </MessageBox>
          )}
        {error && <MessageBox className="error">{error.message}</MessageBox>}
        <div>
          <label id="title">Enter Title</label>
          <input
            type="text"
            name="title"
            id="title"
            key="title"
            placeholder="Title"
            required={true}
            onChange={(e) => settitle(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="firstname">Enter First Name</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            key="firstname"
            placeholder="First Name"
            required={true}
            onChange={(e) => setfirstName(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="lastname">Enter Last Name</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            key="lastname"
            placeholder="Last Name"
            required={true}
            onChange={(e) => setlastName(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="phoneNumber">Enter Phone No.</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            key="phoneNumber"
            placeholder="Phone Number"
            required={true}
            onChange={(e) => setphoneNumber(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="emailAddress">Enter E-Mail</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            key="emailAddress"
            placeholder="E-mail"
            required={true}
            onChange={(e) => setemailAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="password">Enter Password</label>
          <input
            type="password"
            name="password"
            id="password"
            key="password"
            placeholder="Password"
            required={true}
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{"  "}
            <Link to={"/login"}>Sign In.</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
