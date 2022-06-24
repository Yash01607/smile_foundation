import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PRODUCT_LIST } from '../GraphQL/Products/Querries';
import { GET_COLLECTIONS_LIST } from '../GraphQL/Collections/Querries';

import { FaRupeeSign } from 'react-icons/fa';

import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import LoadingSpinner from '../Components/LoadingSpinner';

import image_13 from '../Assets/Images/image_13.png';
import Rectangle_5 from '../Assets/Images/Rectangle_5.png';

const ShopScreen = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [activeCategory, setactiveCategory] = useState({});

  const { data, loading, error } = useQuery(GET_COLLECTIONS_LIST);

  const navigate = useNavigate();

  const {
    data: dataproducts,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(GET_PRODUCT_LIST);

  const onStartCategoryHover = (id) => {
    if (data && data.collections && data.collections.items) {
      const currentCategory = data.collections.items.filter(
        (collection) => collection.id === id
      );
      setactiveCategory(currentCategory);
    }
    setmodalOpen(true);
  };

  return (
    <div className="">
      <div className="row category-list body-pad">
        {loading && <LoadingSpinner />}
        {error && error.message && (
          <MessageBox className="error">{error.message}</MessageBox>
        )}
        {data && data.collections && data.collections.errorCode && (
          <MessageBox className="error">{data.collections.message}</MessageBox>
        )}
        {data &&
          data.collections &&
          data.collections.items &&
          data.collections.items.map((collection) => {
            return (
              <div
                key={collection.id}
                onClick={() =>
                  navigate(`/productlist/collection/${collection.id}/user/0`)
                }
              >
                <p
                  className="bold"
                  onMouseLeave={() => setmodalOpen(false)}
                  onMouseEnter={() => onStartCategoryHover(collection.id)}
                >
                  {collection.name}
                </p>
              </div>
            );
          })}
      </div>
      {modalOpen && (
        <div
          onMouseLeave={() => setmodalOpen(false)}
          onMouseEnter={() => setmodalOpen(true)}
          className="row category-modal"
        >
          <div className="category-modal-name">
            {activeCategory[0] &&
              activeCategory[0].children &&
              activeCategory[0].children.map((category) => (
                <h2
                  key={category.id}
                  onClick={() =>
                    navigate(`/productlist/collection/${category.id}/user/0`)
                  }
                >
                  {category.name}
                </h2>
              ))}
          </div>
          <div className="category-modal-images row">
            {activeCategory[0] &&
              activeCategory[0].children &&
              activeCategory[0].children.slice(0, 3).map((category) => (
                <div
                  key={category.id}
                  onClick={() =>
                    navigate(`/productlist/collection/${category.id}/user/0`)
                  }
                >
                  <img
                    alt={category && category.name}
                    src={
                      category.featuredAsset && category.featuredAsset.source
                    }
                  ></img>
                  <h2>{category.name}</h2>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="offers row">
        <img src={image_13} alt="offer"></img>
        <div className="offers-content">
          <h1>Home Decor</h1>
          <p>Upto 55% OFF on selective decoratives</p>
          <h2>Explore Products</h2>
        </div>
      </div>
      <div className="body-pad">
        <div className="row">
          <h1>Deal of the Day</h1>
          <h2>View all</h2>
        </div>
        <div className="row">
          {loadingProducts && <LoadingSpinner />}
          {errorProducts && errorProducts.message && (
            <MessageBox className="error">{errorProducts.message}</MessageBox>
          )}
          {dataproducts &&
            dataproducts.products &&
            dataproducts.products.errorCode && (
              <MessageBox className="error">
                {dataproducts.products.message}
              </MessageBox>
            )}
          {!dataproducts ? (
            <MessageBox className="loading">No Products Founs</MessageBox>
          ) : (
            dataproducts.products.items.slice(0, 4).map((product) => {
              return <Product id={product.id}></Product>;
            })
          )}
        </div>
      </div>
      <div className="body-pad">
        <p className="for-this-season-p">For this Season</p>
        <div className="row">
          <h1>Deal of the Day</h1>
          <h2>View all</h2>
        </div>
        <div className="row for-this-season">
          <div
            style={{
              background: `url(${Rectangle_5})`,
            }}
            className="for-this-season-div"
          >
            <div className="">
              <h5>
                Unique styles starts at <FaRupeeSign size={15} /> 799
              </h5>
              <p>
                Get extra 10% discount. Use Code <strong>“FLAT10”</strong>{' '}
              </p>
            </div>
          </div>
          <div
            style={{
              background: `url(${Rectangle_5})`,
            }}
            className="for-this-season-div"
          >
            <div className="">
              <h5>
                Unique styles starts at <FaRupeeSign size={15} /> 799
              </h5>
              <p>
                Get extra 10% discount. Use Code<strong>“FLAT10”</strong>
              </p>
            </div>
          </div>
          <div
            style={{
              background: `url(${Rectangle_5})`,
            }}
            className="for-this-season-div"
          >
            <div className="">
              <h5>
                Unique styles starts at <FaRupeeSign size={15} /> 799
              </h5>
              <p>
                Get extra 10% discount. Use Code <strong>“FLAT10”</strong>
              </p>
            </div>
          </div>
          <div
            style={{
              background: `url(${Rectangle_5})`,
            }}
            className="for-this-season-div"
          >
            <div className="">
              <h5>
                Unique styles starts at <FaRupeeSign size={15} /> 799
              </h5>
              <p>
                Get extra 10% discount. Use Code <strong>“FLAT10”</strong>
              </p>
            </div>
          </div>
          <div
            style={{
              background: `url(${Rectangle_5})`,
            }}
            className="for-this-season-div"
          >
            <div className="">
              <h5>
                Unique styles starts at <FaRupeeSign size={15} /> 799
              </h5>
              <p>
                Get extra 10% discount. Use Code <strong>“FLAT10”</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="offers row">
        <img src={image_13} alt="offer"></img>
        <div className="offers-content">
          <h1>Home Decor</h1>
          <p>Upto 55% OFF on selective decoratives</p>
          <h2>Explore Products</h2>
        </div>
      </div>
      <div className="body-pad">
        <div className="row">
          <h1>Explore More</h1>
          <h2>View all</h2>
        </div>
        <div className="row">
          {loadingProducts && <LoadingSpinner />}
          {errorProducts && errorProducts.message && (
            <MessageBox className="error">{errorProducts.message}</MessageBox>
          )}
          {dataproducts &&
            dataproducts.products &&
            dataproducts.products.errorCode && (
              <MessageBox className="error">
                {dataproducts.products.message}
              </MessageBox>
            )}
          {!dataproducts ? (
            <MessageBox className="loading">No Products Founs</MessageBox>
          ) : (
            dataproducts.products.items.slice(0, 4).map((product) => {
              return <Product id={product.id}></Product>;
            })
          )}
        </div>
      </div>
      <div className="body-pad">
        <div className="row">
          <h1>HandPicked For you</h1>
          <h2>View all</h2>
        </div>
        <div className="row">
          {loadingProducts && <LoadingSpinner />}
          {errorProducts && errorProducts.message && (
            <MessageBox className="error">{errorProducts.message}</MessageBox>
          )}
          {dataproducts &&
            dataproducts.products &&
            dataproducts.products.errorCode && (
              <MessageBox className="error">
                {dataproducts.products.message}
              </MessageBox>
            )}
          {!dataproducts ? (
            <MessageBox className="loading">No Products Founs</MessageBox>
          ) : (
            dataproducts.products.items.slice(0, 4).map((product) => {
              return <Product id={product.id}></Product>;
            })
          )}
        </div>
      </div>
      <div className="body-pad">
        <div className="row">
          <h1>Items related to your last view</h1>
          <h2>View all</h2>
        </div>
        <div className="row">
          {loadingProducts && <LoadingSpinner />}
          {errorProducts && errorProducts.message && (
            <MessageBox className="error">{errorProducts.message}</MessageBox>
          )}
          {dataproducts &&
            dataproducts.products &&
            dataproducts.products.errorCode && (
              <MessageBox className="error">
                {dataproducts.products.message}
              </MessageBox>
            )}
          {!dataproducts ? (
            <MessageBox className="loading">No Products Founs</MessageBox>
          ) : (
            dataproducts.products.items.slice(0, 4).map((product) => {
              return <Product id={product.id}></Product>;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
