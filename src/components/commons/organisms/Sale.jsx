/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axiosOrder from '../../../axios-order';
import ProductInSale from './ProductInSale';
import moment from 'moment';

function Sale({ id }) {
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({});
  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});
  const newDate = moment.utc(sale.date).format('DD/MM/YYYY');

  const getSale = () => {
    axiosOrder.get(`products/sales-User/${id}`).then((response) => {
      setProducts(response.data.products);
      setSale(response.data.sale[0]);
      setEvent(response.data.event[0]);
      setUser(response.data.user[0]);
    });
  };
  console.log(id);

  useEffect(() => {
    getSale();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-white text-2xl">
        <h1>Ventes N°: V00{sale.id}</h1>
        <h1>Date: {newDate}</h1>
        <h1>Vendeur: {user.name}</h1>
        <h1>Event : {event.name}</h1>
      </div>
      <div className="bg-gray-500 w-5/6 text-white text-xl rounded-xl mt-8">
        <div name="article">
          {products.map((product) => (
            <ProductInSale
              key={product.id}
              name={product.name}
              size={product.taille}
              refe={product.ref}
              sexe={product.genre}
              quantity={product.quantité}
              price={product.prix_unitaire}
            />
          ))}
        </div>
        <div name="sale" className="flex justify-between mt-2 mb-2">
          <div className="w-1/2 border-r-2 border-black">
            <h1 className="text-xl">Mode Paiement : {sale.pay_type}</h1>
          </div>
          <div className="w-1/4 border-r-2 border-black">
            <h1 className="text-xl">Remise:</h1>
            <h1>{sale.remise} €</h1>
          </div>
          <div className="w-1/4">
            <h1 className="text-xl">Total:</h1>
            <p className="text-green-400">{sale.solde} €</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
