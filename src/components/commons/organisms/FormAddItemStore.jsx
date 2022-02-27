/* eslint-disable react/prop-types */
import axios from '../../../axios-order';
import React, { useState } from 'react';
import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';

function FormAddItemStore({
  name,
  popAddStatus,
  id,
  quantityEvent,
  togglePopAddStore,
  refreshList
}) {
  const mail = localStorage.getItem('emailId');
  const [quantity, setQuantity] = useState({
    mail,
    idProduct: id,
    quantité: ''
  });

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setQuantity((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function addProductInStore() {
    axios
      .post('/products/addProductInSale', quantity)
      .then(() => {
        window.alert('Cet Article va être mis dans votre panier');
        togglePopAddStore();
        refreshList();
      })
      .catch(() => {
        window.alert("impossible d'ajouter cette article au panier");
        togglePopAddStore();
      });
  }
  return (
    <div
      className={`${
        popAddStatus ? '' : 'hidden'
      } bg-white rounded-2xl w-72 h-96 flex flex-col justify-around`}>
      <h1 className="text-2xl">AJOUTEZ AU PANIER</h1>
      <h1 className="text-xl">{name}</h1>
      <div className="flex items-center justify-around">
        <p>Qté:</p>
        <TextArea
          type="Number"
          grey={true}
          small={true}
          step={1}
          min={0}
          max={quantityEvent}
          onChange={inputGroupChangeHandler}
          name="quantité"
          value={quantity.quantité}
        />
      </div>
      <Button type="Ajouter" color="green" onClick={addProductInStore} />
    </div>
  );
}

export default FormAddItemStore;
