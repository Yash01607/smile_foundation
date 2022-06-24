import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_COLLECTION_VARIANT_LIST } from '../GraphQL/Collections/Querries';
import { GET_COLLECTIONS_LIST } from '../GraphQL/Collections/Querries';

import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import { FaRupeeSign } from 'react-icons/fa';
import LoadingSpinner from '../Components/LoadingSpinner';

function ProductListScreen() {
  const { collectionId: paramsCollectionId, userId: paramsUserId } =
    useParams();

  const [collectionId, setcollectionId] = useState(
    paramsCollectionId ? paramsCollectionId : 1
  );

  const { loading, data, error } = useQuery(GET_COLLECTION_VARIANT_LIST, {
    variables: {
      collectionId: collectionId,
    },
  });

  const {
    loading: loadingCollectionList,
    error: errorCollectionList,
    data: dataCollectionist,
  } = useQuery(GET_COLLECTIONS_LIST);

  const clearFilters = () => {};

  return (
    <div className="body-pad row filters-div">
      <div className="filters-list">
        <div className="row">
          <h2>Filters</h2>
          <p>Clear All</p>
        </div>
        {!paramsCollectionId ||
          (paramsCollectionId < 1 && (
            <div className="filter-category-list">
              <h2>Categories</h2>
              {loadingCollectionList && <LoadingSpinner />}
              {errorCollectionList && errorCollectionList.message && (
                <MessageBox className="error">
                  {errorCollectionList.message}
                </MessageBox>
              )}
              {dataCollectionist &&
                dataCollectionist.collections &&
                dataCollectionist.collections.errorCode && (
                  <MessageBox className="error">
                    {dataCollectionist.collections.message}
                  </MessageBox>
                )}
              {dataCollectionist &&
                dataCollectionist.collections &&
                dataCollectionist.collections.items &&
                dataCollectionist.collections.items.map((collection) => {
                  return (
                    <div
                      key={collection.id}
                      onClick={() => setcollectionId(collection.id)}
                      className="row filter-list-item"
                    >
                      <div>
                        <p>{collection.name}</p>
                      </div>
                      <div>
                        {collection.id === collectionId ? (
                          <ImCheckboxChecked size={20} />
                        ) : (
                          <ImCheckboxUnchecked size={20} />
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        <div className="filter-price-list">
          <h2>Price</h2>
          <div className="row">
            <div>
              <p>
                <FaRupeeSign size={12} /> 599 - <FaRupeeSign size={12} /> 1999
              </p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
          <div className="row">
            <div>
              <p>
                <FaRupeeSign size={12} /> 1999 - <FaRupeeSign size={12} /> 2999
              </p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
          <div className="row">
            <div>
              <p>
                <FaRupeeSign size={12} /> 2999 - <FaRupeeSign size={12} /> 3999
              </p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
          <div className="row">
            <div>
              <p>
                <FaRupeeSign size={12} /> 3999 - and above
              </p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
        </div>
        <div className="filter-discount-list">
          <h2>Discount</h2>
          <div className="row">
            <div>
              <p>10% and above</p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
          <div className="row">
            <div>
              <p>20% and above</p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
          <div className="row">
            <div>
              <p>30% and above</p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
          <div className="row">
            <div>
              <p>40% and above</p>
            </div>
            <div>
              <ImCheckboxUnchecked size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="product-list">
        <div className="row">
          {collectionId > 0 && loading && <LoadingSpinner />}
          {collectionId > 0 && error && error.message && (
            <MessageBox className="error">{error.message}</MessageBox>
          )}
          {collectionId > 0 &&
            data &&
            data.collection &&
            data.collection.productVariants &&
            data.collection.productVariants.errorCode && (
              <MessageBox className="error">
                {data.collection.productVariants.message}
              </MessageBox>
            )}
          {collectionId > 0 && !data ? (
            <MessageBox className="loading">No Products Found</MessageBox>
          ) : (
            data &&
            data.collection &&
            data.collection.productVariants &&
            data.collection.productVariants.items.map((productVariant) => {
              // console.log(productVariant);
              return (
                <Product
                  variantId={productVariant.id}
                  id={productVariant.productId}
                ></Product>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListScreen;
