import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner';
import MessageBox from '../Components/MessageBox';

import { GET_COLLECTION_VARIANT_LIST } from '../GraphQL/Collections/Querries';

function ProductVariantsList() {
  const { id: collectionId } = useParams();

  const { data, loading, error } = useQuery(GET_COLLECTION_VARIANT_LIST, {
    variables: {
      collectionId,
    },
  });

  console.log(data);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.collection && data.collection.errorCode && (
        <MessageBox className="error">{data.collection.message}</MessageBox>
      )}
      {data &&
        data.collection &&
        data.collection.productVariants &&
        data.collection.productVariants.items &&
        data.collection.productVariants.items.map((productVariant) => {
          return <div>{productVariant.name}</div>;
        })}
    </div>
  );
}

export default ProductVariantsList;
