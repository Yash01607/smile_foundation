import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { MdFavoriteBorder } from 'react-icons/md';

import { LOGIN_USER, LOGOUT_USER } from '../GraphQL/Users/Mutations';
import { GET_ACTIVE_CUSTOMRE_DETAILS } from '../GraphQL/Users/Querries';

import MessageBox from '../Components/MessageBox';

import logo from '../Assets/Images/logo.png';
import RegisterModal from '../Modals/RegisterModal';
import LoadingSpinner from './LoadingSpinner';

function Header() {
  const [openModal, setopenModal] = useState(false);
  const [openDropdown, setopenDropdown] = useState(false);

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const [superAdminLogin, setsuperAdminLogin] = useState(false);

  const [currentState, setcurrentState] = useState('login');

  const navigate = useNavigate();

  const [login, { loading, data, error }] = useMutation(LOGIN_USER);
  const [
    logout,
    { loading: loadingLogout, data: dataLogout, error: errorLogout },
  ] = useMutation(LOGOUT_USER);

  const { data: dataActiveCustomer, refetch } = useQuery(
    GET_ACTIVE_CUSTOMRE_DETAILS
  );

  useEffect(() => {
    if (data && data.login && data.login.id) {
      setopenModal(false);
      refetch();
    }
    if (dataLogout && dataLogout.logout && dataLogout.logout.success) {
      navigate('/');
      window.location.reload();
      refetch();
    }
  }, [data, refetch, dataLogout, navigate]);

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
    } else {
      login({
        variables: {
          username,
          password,
        },
      });
    }
  };

  const closeModal = () => {
    setopenModal(false);
    setcurrentState('login');
  };

  const signouthandler = () => {
    logout();
  };

  return (
    <header className="header row body-pad">
      <div className="row left-header">
        <div>
          <Link to="/">
            <h2>Home</h2>
          </Link>
        </div>
        <div>
          <Link to="/shop">
            {' '}
            <h4>Shop</h4>
          </Link>
        </div>
        <div>
          <Link to="/ourstory">
            {' '}
            <h4>Our Story</h4>
          </Link>
        </div>
      </div>
      {loadingLogout && <LoadingSpinner />}
      <div className="logo">
        <img onClick={() => navigate('/')} alt="logo" src={logo}></img>
      </div>
      <div className="row right-header">
        <div>
          {dataActiveCustomer &&
          dataActiveCustomer.activeCustomer &&
          dataActiveCustomer.activeCustomer.id ? (
            <div>
              <h4
                className="dropdown"
                onMouseEnter={() => setopenDropdown(true)}
                onMouseLeave={() => setopenDropdown(false)}
              >
                {dataActiveCustomer.activeCustomer.firstName ||
                  dataActiveCustomer.activeCustomer.emailAddress}
              </h4>
              {openDropdown && (
                <div
                  className="dropdown-content"
                  onMouseEnter={() => setopenDropdown(true)}
                  onMouseLeave={() => setopenDropdown(false)}
                >
                  <div onClick={() => navigate('/userinfo')}>
                    <p>My Profile</p>
                  </div>
                  <div onClick={signouthandler}>
                    <p>Sign Out</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <h4 className="login" onClick={() => setopenModal(true)}>
              Log In/Sign Up
            </h4>
          )}
        </div>
        <div className="header-icons row">
          <Link to={`/search`}>
            <AiOutlineSearch size={25} />
          </Link>
          <Link to={`/wishlist`}>
            <MdFavoriteBorder size={25} />
          </Link>
          <Link to={`/cart`}>
            <AiOutlineShoppingCart size={25} />
          </Link>
        </div>
      </div>
      {openModal && (
        <div className="login-modal" onClick={closeModal}>
          {currentState === 'login' ? (
            <div className="login-form" onClick={(e) => e.stopPropagation()}>
              <h4>
                <strong>Login</strong> or <strong>Sign Up</strong> with your
                E-Mail Address
              </h4>
              {loading && <LoadingSpinner />}
              {error && error.message && (
                <MessageBox className="error">{error.message}</MessageBox>
              )}
              {data && data.login && data.login.errorCode && (
                <MessageBox className="error">{data.login.message}</MessageBox>
              )}
              <div>
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
                <button type="submit" onClick={onSubmitHandler}>
                  Sign In
                </button>
              </div>
              <div>
                <div>
                  New Here?{'  '}
                  <span onClick={() => setcurrentState('register')}>
                    Create your Account.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <RegisterModal setcurrentState={setcurrentState} />
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
