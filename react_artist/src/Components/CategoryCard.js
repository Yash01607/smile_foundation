import { useQuery } from '@apollo/client';
import React from 'react';

import { GET_COLLECTION_DETAILS } from '../GraphQL/Collections/Querries';
import LoadingSpinner from './LoadingSpinner';
import MessageBox from './MessageBox';

function CategoryCard(props) {
  const categoryId = props.id;

  const { data, loading, error } = useQuery(GET_COLLECTION_DETAILS, {
    variables: {
      collectionId: categoryId,
    },
  });

  let backgroundImageURL =
    "url('https://media.smallbiztrends.com/2016/06/shutterstock_312190337.jpg')";

  if (
    data &&
    data.collection &&
    data.collection.featuredAsset &&
    data.collection.featuredAsset.source
  ) {
    backgroundImageURL = `url(${
      data &&
      data.collection &&
      data.collection.featuredAsset &&
      data.collection.featuredAsset.source
    })`;
    // backgroundImageURL.replace('', '/');
    backgroundImageURL.replaceAll(/\\/g, '/');
    // for (let i = 0; i < backgroundImageURL.length; i++) {
    //   if (backgroundImageURL[i] === '') {
    //     backgroundImageURL[i] = '/';
    //   }
    // }
  }
  // console.log(data.collection.featuredAsset.source);
  // console.log(backgroundImageURL);

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.collection && data.collection.errorCode && (
        <MessageBox className="error">{data.collection.message}</MessageBox>
      )}
      {data && data.collection && data.collection.id && (
        <div
          className="styling-div"
          style={{
            background: backgroundImageURL,
            filter: 'brightness(50%)',
          }}
        >
          <h3>{data.collection.name}</h3>
          <h3>{data.collection.description}</h3>
        </div>
      )}
    </>
  );
}

export default CategoryCard;
