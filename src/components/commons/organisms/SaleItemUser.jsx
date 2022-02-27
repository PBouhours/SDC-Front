/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function SaleItemUser({ id, date, nbProducts, eventName, solde }) {
  const newDate = moment.utc(date).format('DD/MM/YYYY');
  return (
    <Link
      to={`/ventes-utilisateur/${id}`}
      className="bg-gray-500 rounded-xl text-white flex justify-around items-center p-4 w-5/6 mt-8">
      <div>
        <h1 className="text-3xl">{eventName}</h1>
        <h1>{newDate}</h1>
      </div>
      <div>
        <h1>
          {`Nb d'articles : `}
          {nbProducts}
        </h1>
      </div>
      <div>
        <div className="flex justify-around">
          <label>Total:</label>
          <h1 className="text-green-300">{solde} €</h1>
        </div>
        <h1>Numero de vente : S00{id}</h1>
      </div>
    </Link>
  );
}

export default SaleItemUser;
