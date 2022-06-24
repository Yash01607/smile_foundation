import { useQuery } from '@apollo/client';
import React from 'react';
import LoadingSpinner from '../Components/LoadingSpinner';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import { GET_WISHLIST } from '../GraphQL/Wishlist/Querries';

function MyWishlistScreen() {
  const { data, loading, error } = useQuery(GET_WISHLIST);

  // console.log(data);

  return (
    <div className="row body-pad">
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.products && data.products.errorCode && (
        <MessageBox className="error">{data.products.message}</MessageBox>
      )}
      {!data ? (
        <MessageBox className="loading">
          Please SignIn to View Wishlist
        </MessageBox>
      ) : data &&
        data.activeCustomer &&
        data.activeCustomer.customFields &&
        data.activeCustomer.customFields.Favourite &&
        data.activeCustomer.customFields.Favourite.length === 0 ? (
        <MessageBox className="loading">No Items Added to wishList</MessageBox>
      ) : (
        data &&
        data.activeCustomer &&
        data.activeCustomer.customFields &&
        data.activeCustomer.customFields.Favourite &&
        data.activeCustomer.customFields.Favourite.map((product) => {
          return <Product id={product}></Product>;
        })
      )}
    </div>
  );
}

export default MyWishlistScreen;
