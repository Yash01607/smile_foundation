import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { GET_PRODUCT_DETAILS } from '../GraphQL/Products/Querries';
import { GET_PRODUCT_LIST } from '../GraphQL/Products/Querries';
import { ADD_ITEM_TO_WISHLIST } from '../GraphQL/Wishlist/Mutation';
import { GET_WISHLIST } from '../GraphQL/Wishlist/Querries';
import { ADD_ITEM_TO_ORDER } from '../GraphQL/Orders/Mutations';

import { FaRupeeSign } from 'react-icons/fa';

import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import LoadingSpinner from '../Components/LoadingSpinner';

function ProductScreen(props) {
  const { productid: productId, productvariantid: productVariantId } =
    useParams();

  // let cartItems;
  // if (Cookies.get('cartItems')) {
  //   cartItems = JSON.parse(Cookies.get('cartItems'));
  // }

  // let initialQty = 1;
  // if (cartItems) {
  //   const currentItemIndex = cartItems.findIndex(
  //     (item) => item.id === productId
  //   );
  //   if (currentItemIndex >= 0) {
  //     initialQty = cartItems[currentItemIndex].qty;
  //   }
  // }

  const [qty, setqty] = useState(1);
  const [zeroError, setzeroError] = useState(false);
  const [isWishlisted, setisWishlisted] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      id: productId,
    },
  });

  const {
    data: dataproducts,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(GET_PRODUCT_LIST);

  const { data: dataWishList } = useQuery(GET_WISHLIST);

  const [
    updateCustomer,
    {
      loading: loadingAddItemToWishlist,
      error: errorAddItemToWishlist,
      data: dataAddItemToWishList,
    },
  ] = useMutation(ADD_ITEM_TO_WISHLIST);

  const [
    addItemToOrder,
    { loading: loadingAddItem, data: dataAddItem, error: errorAddItem },
  ] = useMutation(ADD_ITEM_TO_ORDER);

  let variantDetails;

  if (data && data.product) {
    // console.log(productVariantId);
    // console.log(data.product.variants.find((variant) => variant.id));
    variantDetails = data.product.variants.find(
      (variant) => variant.id === productVariantId
    );
  }

  // console.log(variantDetails);

  useEffect(() => {
    if (
      dataAddItem &&
      dataAddItem.addItemToOrder &&
      dataAddItem.addItemToOrder.id
    ) {
      navigate(`/cart`);
    }

    if (
      dataAddItemToWishList &&
      dataAddItemToWishList.updateCustomer &&
      dataAddItemToWishList.updateCustomer.id
    ) {
      setisWishlisted(true);
    }
  }, [dataAddItem, navigate, dataAddItemToWishList]);

  const AddtoCartHandler = () => {
    if (qty > 0) {
      addItemToOrder({
        variables: {
          productVariantId,
          quantity: Number(qty),
        },
      });
    } else {
      setzeroError(true);
    }
  };

  const addToWishlostHandler = () => {
    if (
      dataWishList &&
      dataWishList.activeCustomer &&
      dataWishList.activeCustomer.customFields &&
      dataWishList.activeCustomer.customFields.Favourite
    ) {
      // console.log(dataWishList.activeCustomer.customFields.Favourite);

      updateCustomer({
        variables: {
          Favourite: [
            ...dataWishList.activeCustomer.customFields.Favourite,
            productVariantId.toString(),
          ],
        },
      });
    }
  };

  return (
    <div className="body-pad">
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.product && data.product.errorCode && (
        <MessageBox className="error">{data.product.message}</MessageBox>
      )}
      {variantDetails && (
        <>
          {/* {console.log(variantDetails)} */}
          <div className="row product-details">
            <div className="featured-asset">
              <img
                className="featured-asset-image"
                alt={variantDetails && variantDetails.name}
                src={
                  variantDetails.featuredAsset &&
                  variantDetails.featuredAsset.source
                }
              ></img>
              <div className="row asset-list">
                {variantDetails &&
                  variantDetails.assets &&
                  variantDetails.assets.map((asset) => {
                    return (
                      <div className="asset-list-img">
                        <img
                          key={asset.id}
                          src={asset && asset.source}
                          alt={asset.id}
                        ></img>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="product-details-content">
              <h2>{variantDetails.name}</h2>
              <p className="collection-name">
                {data.product.collections[0].name}
              </p>
              <h1>
                <FaRupeeSign size={27} /> {variantDetails.price}.00
              </h1>
              <p className="taxes-statement">Inclusive of all taxes</p>
              <div className="cart-actions row">
                <div className="row">
                  <div className="row">
                    <span
                      className="qty-handler-sub"
                      onClick={() => {
                        if (qty - 1 > 0) {
                          setqty(Number(Number(qty) - 1));
                        }
                      }}
                    >
                      -
                    </span>
                    <input
                      value={qty}
                      onChange={(e) => setqty(e.target.value)}
                      type={'number'}
                      min={0}
                      className="qty-input"
                    ></input>
                    <span
                      className="qty-handler-add"
                      onClick={() => setqty(Number(Number(qty) + 1))}
                    >
                      +
                    </span>
                  </div>

                  <button className="block-button" onClick={AddtoCartHandler}>
                    Add To Cart
                  </button>
                  <button
                    onClick={addToWishlostHandler}
                    className="block-button"
                    style={
                      !isWishlisted
                        ? {
                            backgroundColor: '#fbfafa',
                            color: '#080808',
                          }
                        : {}
                    }
                  >
                    Add To Wishlist
                  </button>
                </div>
                {loadingAddItemToWishlist && <LoadingSpinner />}
                {errorAddItemToWishlist && errorAddItemToWishlist.message && (
                  <MessageBox className="error">
                    {errorAddItemToWishlist.message}
                  </MessageBox>
                )}
                {dataAddItemToWishList &&
                  dataAddItemToWishList.updateCustomer &&
                  dataAddItemToWishList.updateCustomer.errorCode && (
                    <MessageBox className="error">
                      {dataAddItemToWishList.updateCustomer.message}
                    </MessageBox>
                  )}
              </div>
              {zeroError && (
                <MessageBox className="error">
                  Quantity cannot be zero
                </MessageBox>
              )}
              {loadingAddItem && <LoadingSpinner />}
              {errorAddItem && errorAddItem.message && (
                <MessageBox className="error">
                  {errorAddItem.message}
                </MessageBox>
              )}
              {dataAddItem &&
                dataAddItem.addItemToOrder &&
                dataAddItem.addItemToOrder.errorCode && (
                  <MessageBox className="error">
                    {dataAddItem.addItemToOrder.message}
                  </MessageBox>
                )}

              <p className="bold delivery-options">
                {' '}
                Check for delivery options
              </p>
              <input
                className="delivery-options-input"
                placeholder="Enter Location"
                type={'number'}
              ></input>
              <button className="delivery-options-button">Check</button>
              <p>
                Please enter PIN code to check delivery time & Pay on Delivery
                Availability
              </p>
              <p className="sku">
                <strong>SKU : </strong>
                {variantDetails.sku}{' '}
              </p>
              <p>
                <strong>Categories : </strong>
                {data &&
                  data.product &&
                  data.product.collections &&
                  data.product.collections.map((collection) => {
                    return <span>{collection.name}, </span>;
                  })}{' '}
              </p>
              <p>
                <strong>Tags : </strong>
                {variantDetails.facetValues &&
                  variantDetails.facetValues.map((facetValue) => {
                    return <span>{facetValue.name}, </span>;
                  })}{' '}
              </p>
            </div>
          </div>
          <div>
            <h3>Material : Aluminium</h3>
            <p>{data.product.description}</p>
          </div>
          <div>
            <h3>Artist Information</h3>
            <p>{data.product.description}</p>
          </div>
          <div className="border-complete"></div>
          <div className="row">
            <h1>Feedback</h1>
            <button className="block-button">Write a review</button>
          </div>
          <div>
            <div className="row">
              <h1>Similar Products</h1>
              <h2>View All</h2>
            </div>
            <div className="row">
              {loadingProducts && <LoadingSpinner />}
              {errorProducts && errorProducts.message && (
                <MessageBox className="error">
                  {errorProducts.message}
                </MessageBox>
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
        </>
      )}
    </div>
  );
}

export default ProductScreen;
