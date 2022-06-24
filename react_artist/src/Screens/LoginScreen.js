import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';

import Cookies from 'js-cookie';

import { LOGIN_USER } from '../GraphQL/Users/Mutations';
import MessageBox from '../Components/MessageBox';

function LoginScreen(props) {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const [superAdminLogin, setsuperAdminLogin] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const [login, { loading, data, error }] = useMutation(LOGIN_USER);

  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.login && data.login.id) {
      let userInfo = data.login;
      if (isAdmin) {
        userInfo = { ...userInfo, isAdmin: true };
      } else {
        userInfo = { ...userInfo, isAdmin: false };
      }
      Cookies.set('userInfo', JSON.stringify(userInfo));
      navigate('/');
    }
  }, [data, navigate, isAdmin]);

  console.log(data);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (superAdminLogin) {
      login({
        variables: {
          username,
          password,
        },
        context: {
          clientName: 'admin_api',
        },
      });
      setisAdmin(true);
    } else {
      login({
        variables: {
          username,
          password,
        },
      });
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1 className="heading">Sign-In</h1>
        </div>
        {loading && <MessageBox className="loading">loading...</MessageBox>}
        {error && error.message && (
          <MessageBox className="error">{error.message}</MessageBox>
        )}
        {data && data.login && data.login.errorCode && (
          <MessageBox className="error">{data.login.message}</MessageBox>
        )}

        <div>
          <label id="email">Enter E-Mail</label>
          <input
            type="text"
            name="email"
            id="email"
            key="email"
            placeholder="Enter E-mail"
            required={true}
            onChange={(e) => setusername(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="password">Enter Password</label>
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
        <div className="row">
          <label id="admin">Admin Login</label>
          <input
            id="admin"
            type="checkbox"
            value={superAdminLogin}
            onClick={() => setsuperAdminLogin(!superAdminLogin)}
          ></input>
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
        <div>
          <div>
            New Here?{'  '}
            <Link to={'/register'}>Create your Account.</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
