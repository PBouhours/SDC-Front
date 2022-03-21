/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from '../../../axios-order';
import React, { useState } from 'react';
import Button from '../atoms/Button';
import TextArea from '../atoms/TextArea';

function ProductInStore({ name, size, sexe, refe, quantity, price, id, refresh }) {
  const [changeQuantity, setChangeQuantity] = useState(quantity);

  const changeValue = (e) => {
    setChangeQuantity(e.target.value);
  };

  const updateQuantity = () => {
    const accepte = window.confirm('Moddifier la quantité de cet article?');
    if (accepte) {
      axios
        .post('/products/update-quantity-inStore', { id: id, quantity: changeQuantity })
        .then(() => {
          refresh();
        });
    }
  };

  const deleteProduct = () => {
    const accepte = window.confirm('Supprimer cet article?');
    if (accepte) {
      axios.post('/products/deleteProduct-inStore', { id: id }).then(() => {
        refresh();
      });
    }
  };
  console.log(id);

  return (
    <>
      <div className="flex justify-between">
        <div id="product" className="w-1/2 border-r-2 border-black flex flex-col justify-center">
          <h1 className="text-3xl">{name}</h1>

          <div className="flex flex-wrap justify-around">
            <h1 className="mr-2">Taille: {size}</h1>
            <h1 className="mr-2">Sexe: {sexe}</h1>
            <h1 className="mr-2">Ref: {refe}</h1>
          </div>
        </div>
        <div
          id="quantity"
          className="w-1/4 border-r-2 border-black pb-2 flex flex-col justify-around">
          <h1>Qté:</h1>
          <div className="flex flex-wrap justify-around">
            <TextArea
              type="Number"
              verySmall
              step={1}
              min={1}
              value={changeQuantity}
              onChange={changeValue}
            />
            <Button verySmall color="green" type="ok" onClick={updateQuantity} />
          </div>
        </div>
        <div id="price" className="w-1/4 relative flex flex-col justify-center">
          <button onClick={deleteProduct} className="absolute top-0 right-0">
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
          <h1>P.U. :</h1>
          <h1 className="text-black">{price} €</h1>
        </div>
      </div>
      <div className="h-0.5 w-full bg-black"></div>
    </>
  );
}

export default ProductInStore;
