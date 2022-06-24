import React from 'react';

import { useQuery } from '@apollo/client';

import { GET_ASSET_LIST } from '../GraphQL/Asstes/Querries';
import MessageBox from '../Components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner';

function AssetListScreen() {
  const { loading, error, data } = useQuery(GET_ASSET_LIST, {
    context: {
      clientName: 'admin_api',
    },
  });

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          className="primary"
          onClick={() => {
            navigate('/createasset');
          }}
        >
          Create asset
        </button>
      </div>
      {loading && <LoadingSpinner />}
      {error && error.message && (
        <MessageBox className="error">{error.message}</MessageBox>
      )}
      {data && data.assets && data.assets.errorCode && (
        <MessageBox className="error">{data.assets.message}</MessageBox>
      )}
      {!data ? (
        <MessageBox className="loading">No assets Founs</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>asset</th>
              <th>NAME</th>
              <th>TYPE</th>
            </tr>
          </thead>
          <tbody>
            {data.assets.items.map((asset) => {
              return (
                <tr key={asset.id}>
                  <td>
                    {' '}
                    <Link to={`/asset/` + asset.id}>
                      <img alt={asset.name} src={asset && asset.source}></img>
                    </Link>
                  </td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AssetListScreen;
