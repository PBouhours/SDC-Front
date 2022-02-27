/* eslint-disable react/prop-types */
import React from 'react';

import { Link } from 'react-router-dom';
import axiosOrder from '../../../axios-order';

function SaleItemEvent({ id, nbProducts, userName, solde, eventOpen, refresh }) {
  const invalidationSale = () => {
    if (eventOpen) {
      const accept = window.confirm('Voulez vous vraiment annuler cette vente?');
      if (accept) {
        axiosOrder.post(`/products/invalidation-sale/${id}`).then(() => {
          refresh();
        });
      }
    }
  };

  return (
    <div
      className={`relative bg-gray-500 rounded-xl text-white flex justify-around items-center p-4 mt-8 w-full
        `}>
      <div>
        <Link to={`vente/${id}`}>
          <h1 className="text-2xl ">{userName}</h1>
        </Link>
      </div>
      <div>
        <h1 className="">
          {`Nb d'articles : `}
          {nbProducts}
        </h1>
      </div>
      <div>
        <div className="flex justify-around">
          <label>Total:</label>
          <h1 className="text-green-300">{solde} €</h1>
        </div>
        <h1>Numéro de vente : S00{id}</h1>
      </div>
      {eventOpen ? (
        <button onClick={invalidationSale} className="absolute top-0 left-0">
          <svg
            width="35"
            height="35"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37.6966 36.1055L57.1862 16.6158C57.6256 16.1765 57.6256 15.4642 57.1862 15.0249C56.7468 14.5856 56.0347 14.5856 55.5952 15.0249L36.1056 34.5144L16.6159 15.0248C16.1766 14.5855 15.4644 14.5855 15.025 15.0248C14.5856 15.4641 14.5856 16.1764 15.025 16.6157L34.5145 36.1055L15.0249 55.5951C14.5854 56.0346 14.5854 56.7467 15.0249 57.1861C15.2446 57.4058 15.5324 57.5156 15.8204 57.5156C16.1084 57.5156 16.3963 57.4058 16.6159 57.1861L36.1056 37.6965L55.5952 57.1861C55.815 57.4058 56.1027 57.5156 56.3907 57.5156C56.6787 57.5156 56.9666 57.4058 57.1862 57.1861C57.6256 56.7467 57.6256 56.0346 57.1862 55.5951L37.6966 36.1055Z"
              fill="red"
            />
          </svg>
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default SaleItemEvent;
