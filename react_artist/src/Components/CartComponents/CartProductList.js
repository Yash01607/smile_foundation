import { useMutation } from '@apollo/client';
import React, { useEffect } from 'react';

import { MdDeliveryDining } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import { GoTriangleDown } from 'react-icons/go';

import { REMOVE_ITEM_FROM_ORDER } from '../../GraphQL/Orders/Mutations';
import MessageBox from './../MessageBox';
import LoadingSpinner from './../LoadingSpinner';

function CartProductList(props) {
  const data = props.data;

  const [
    removeOrderLine,
    { data: dataRemove, loading: loadingRemove, error: errorRemove },
  ] = useMutation(REMOVE_ITEM_FROM_ORDER);

  useEffect(() => {
    if (
      dataRemove &&
      dataRemove.removeOrderLine &&
      dataRemove.removeOrderLine.id
    ) {
      props.refetch();
    }
  }, [dataRemove, props]);

  const removeFromCartHandler = (orderLineId) => {
    // const updatedItems = cartItems.filter((x) => x.id !== id);
    // Cookies.set("cartItems", JSON.stringify(updatedItems));
    // setcartItems(updatedItems);
    removeOrderLine({
      variables: {
        orderLineId,
      },
    });
  };

  return (
    <div className="cart-list-items">
      {loadingRemove && <LoadingSpinner />}
      {errorRemove && errorRemove.message && (
        <MessageBox className="error">{errorRemove.message}</MessageBox>
      )}
      {dataRemove &&
        dataRemove.removeOrderLine &&
        dataRemove.removeOrderLine.errorCode && (
          <MessageBox className="error">
            {dataRemove.removeOrderLine.message}
          </MessageBox>
        )}
      {dataRemove &&
        dataRemove.removeOrderLine &&
        dataRemove.removeOrderLine.id && (
          <MessageBox className="success">
            Product Removed Successfully.
          </MessageBox>
        )}
      {data &&
        data.activeOrder &&
        data.activeOrder.lines &&
        data.activeOrder.lines.map((line) => {
          return (
            <div className="row cart-items">
              <div className="cart-line-image-div">
                <img
                  className="cart-line-image"
                  alt={line && line.productVariant && line.productVariant.name}
                  src={
                    line &&
                    line.productVariant &&
                    line.productVariant.featuredAsset &&
                    line.productVariant.featuredAsset.source
                  }
                ></img>
              </div>
              <div className="cart-line-content">
                <div className="row">
                  <div>
                    <div className="cart-border-line-top"></div>
                    <p>
                      {line &&
                        line.productVariant &&
                        line.productVariant.product &&
                        line.productVariant.product.collections &&
                        line.productVariant.product.collections[0].name}
                    </p>
                    <p className="bold">
                      {line && line.productVariant && line.productVariant.name}
                    </p>
                    <p>
                      <MdDeliveryDining /> Delivered by : 28 May, 2022
                    </p>
                  </div>
                  <div style={{ alignItems: 'flex-start' }}>
                    <h2>
                      <FaRupeeSign />
                      {line && line.unitPrice}
                    </h2>
                    <p className="qty-div">
                      Qty: {line && line.quantity} <GoTriangleDown />
                    </p>
                  </div>
                </div>
                <div className="row right cart-line-buttons">
                  <button className="Addtowishlist-button" type="button">
                    Move To Wishlist
                  </button>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => removeFromCartHandler(line.id)}
                  >
                    {' '}
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default CartProductList;
