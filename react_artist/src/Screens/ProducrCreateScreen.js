import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';

import MessageBox from '../Components/MessageBox';
import { GET_ASSET_LIST } from '../GraphQL/Asstes/Querries';
import { CREATE_PRODUCT } from '../GraphQL/Products/Mutation';
import LoadingSpinner from '../Components/LoadingSpinner';

function CreateProductScreen() {
  const [name, setname] = useState('');
  const [slug, setslug] = useState('');
  const [description, setdescription] = useState('');
  // const [facetId, setfacetId] = useState(" ");
  const [assetId, setassetId] = useState(' ');

  const [featuerdAssetId, setfeatuerdAssetId] = useState(' ');

  const {
    loading: loadingAssets,
    error: errorAssets,
    data: dataAssets,
  } = useQuery(GET_ASSET_LIST, {
    context: {
      clientName: 'admin_api',
    },
  });

  const [
    createProduct,
    {
      data: dataProductSave,
      error: errorProductSave,
      loading: loadingProductSave,
    },
  ] = useMutation(CREATE_PRODUCT);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    createProduct({
      variables: {
        assetId: [assetId],
        featuredAssetId: featuerdAssetId,
        name,
        slug,
        description,
        languageCode: 'en',
        enabled: true,
      },
      context: {
        clientName: 'admin_api',
      },
    });
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <div>
          <h1 className="heading">Create Product</h1>
        </div>
        {loadingProductSave && <LoadingSpinner />}
        {errorProductSave && errorProductSave.message && (
          <MessageBox className="error">{errorAssets.message}</MessageBox>
        )}
        {dataProductSave &&
          dataProductSave.createProduct &&
          dataProductSave.createProduct.errorCode && (
            <MessageBox className="error">
              {dataProductSave.createProduct.errorCode}
            </MessageBox>
          )}
        {dataProductSave &&
          dataProductSave.createProduct &&
          dataProductSave.createProduct.id && (
            <MessageBox className="success">
              Product Created Successfully with id{' '}
              {dataProductSave.createProduct.id}
            </MessageBox>
          )}
        <div>
          <label id="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            key="name"
            placeholder="Enter Product Name"
            required={true}
            onChange={(e) => setname(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="slug">Enter SLug</label>
          <input
            type="text"
            name="slug"
            id="slug"
            key="slug"
            placeholder="Enter SLug"
            required={true}
            onChange={(e) => setslug(e.target.value)}
          ></input>
        </div>
        <div>
          <label id="description">Enter Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            key="description"
            placeholder="Enter Description"
            required={true}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Select Featured asset</label>
          {loadingAssets && <LoadingSpinner />}
          {errorAssets && errorAssets.message && (
            <MessageBox className="error">{errorAssets.message}</MessageBox>
          )}
          {dataAssets && dataAssets.assets && dataAssets.assets.errorCode && (
            <MessageBox className="error">
              {dataAssets.assets.message}
            </MessageBox>
          )}
          {!dataAssets ? (
            <MessageBox className="loading">No assets Found</MessageBox>
          ) : (
            <select
              value={featuerdAssetId}
              onChange={(e) => setfeatuerdAssetId(e.target.value)}
            >
              <option value="default">Select Featured Asset</option>
              {dataAssets.assets.items.map((asset) => {
                return (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <label>Select asset</label>
          {loadingAssets && <LoadingSpinner />}
          {errorAssets && errorAssets.message && (
            <MessageBox className="error">{errorAssets.message}</MessageBox>
          )}
          {dataAssets && dataAssets.assets && dataAssets.assets.errorCode && (
            <MessageBox className="error">
              {dataAssets.assets.message}
            </MessageBox>
          )}
          {!dataAssets ? (
            <MessageBox className="loading">No assets Founs</MessageBox>
          ) : (
            <select onChange={(e) => setassetId(e.target.value)}>
              <option value="default">Select Asset</option>
              {dataAssets.assets.items.map((asset) => {
                return (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div>
          <button type="submit">Create Product</button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductScreen;
