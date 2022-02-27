/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

function ProductInSale({ name, size, sexe, refe, quantity, price }) {
  return (
    <>
      <div className="flex flex-wrap justify-between mt-4 mb-4">
        <div id="product" className="w-1/2 border-r-2 border-black">
          <h1 className="text-3xl">{name}</h1>
          <div className="flex flex-wrap justify-around mt-4">
            <h1>Taille: {size}</h1>
            <h1>Sexe: {sexe}</h1>
            <h1>Ref: {refe}</h1>
          </div>
        </div>
        <div id="quantity" className="w-1/4 border-r-2 border-black flex flex-col justify-center">
          <h1>Qté:</h1>
          <h1>{quantity}</h1>
        </div>
        <div id="price" className="w-1/4 flex flex-col justify-center">
          <h1>P.U. :</h1>
          <h1>{price} €</h1>
        </div>
      </div>
      <div className="h-0.5 w-full bg-black"></div>
    </>
  );
}

export default ProductInSale;
