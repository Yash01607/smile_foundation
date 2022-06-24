import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdFavoriteBorder } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';

import { ADD_ITEM_TO_ORDER } from '../GraphQL/Orders/Mutations';
import { GET_PRODUCT_DETAILS } from '../GraphQL/Products/Querries';
import { GET_WISHLIST } from '../GraphQL/Wishlist/Querries';
import { ADD_ITEM_TO_WISHLIST } from '../GraphQL/Wishlist/Mutation';

import MessageBox from './MessageBox';
import LoadingSpinner from './LoadingSpinner';

function Product(props) {
  const [isVisible, setisVisible] = useState(false);
  const productId = props.id;
  let productVariantId = props.variantId;

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      id: productId,
    },
  });

  const [
    addItemToOrder,
    { loading: loadingAddItem, data: dataAddItem, error: errorAddItem },
  ] = useMutation(ADD_ITEM_TO_ORDER);

  const { data: dataWishList, refetch: refetchWishList } =
    useQuery(GET_WISHLIST);

  const [
    updateCustomer,
    {
      loading: loadingAddItemToWishlist,
      error: errorAddItemToWishlist,
      data: dataAddItemToWishList,
    },
  ] = useMutation(ADD_ITEM_TO_WISHLIST);

  if (
    !productVariantId &&
    data &&
    data.product &&
    data.product.variants &&
    data.product.variants.length !== 0
  ) {
    productVariantId = data.product.variants[0].id;
  }

  let variantDetails;

  if (
    data &&
    data.product &&
    data.product.variants &&
    data.product.variants.length !== 0
  ) {
    variantDetails = data.product.variants.find(
      (variant) => variant.id === productVariantId
    );
  }

  useEffect(() => {
    if (
      dataAddItem &&
      dataAddItem.addItemToOrder &&
      dataAddItem.addItemToOrder.id
    ) {
      // console.log(dataAddItem.addItemToOrder.id);
      navigate(`/cart`);
    }
  }, [dataAddItem, navigate]);

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
      refetchWishList();
    }
  };

  if (
    dataAddItemToWishList &&
    dataAddItemToWishList.updateCustomer &&
    dataAddItemToWishList.updateCustomer.id
  ) {
    navigate('/wishlist');
  }

  const AddtoCartHandler = () => {
    if (productVariantId) {
      addItemToOrder({
        variables: {
          productVariantId,
          quantity: 1,
        },
      });
    }
  };

  // console.log(data);

  return (
    <div
      className="product-card"
      key={productId}
      onMouseEnter={() => setisVisible(true)}
      onMouseLeave={() => setisVisible(false)}
    >
      {isVisible && (
        <div className="quick-view-modal">
          <div onClick={addToWishlostHandler}>
            <MdFavoriteBorder size={25} />
          </div>
          <h3
            onClick={() =>
              navigate(`/product/${productId}/${productVariantId}`)
            }
          >
            Quick View
          </h3>
        </div>
      )}
      {loading && <LoadingSpinner />}
      {loadingAddItem && <LoadingSpinner />}
      {loadingAddItemToWishlist && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.product && data.product.errorCode && (
        <MessageBox className="error">{data.product.message}</MessageBox>
      )}
      {data &&
      data.product &&
      data.product.variants &&
      data.product.variants.length === 0 ? (
        <MessageBox className="error">No Product Found</MessageBox>
      ) : (
        <>
          <img
            style={isVisible ? { filter: 'brightness(50%)' } : {}}
            alt={data && data.product && data.product.name}
            src={
              data &&
              data.product &&
              data.product.featuredAsset &&
              data.product.featuredAsset.source
            }
          ></img>
          <div id="border-bottom"></div>
          <p className="collection-name">
            {data &&
              data.product &&
              data.product.collections &&
              data.product.collections.map(
                (collection) => `${collection.name}, `
              )}
          </p>
          <p>{variantDetails && variantDetails.name}</p>
          <h2>
            <FaRupeeSign size={15} />
            {variantDetails && variantDetails.price}.00
          </h2>
          {isVisible && (
            <button className="add-to-cart-button" onClick={AddtoCartHandler}>
              Add to cart{' '}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Product;
