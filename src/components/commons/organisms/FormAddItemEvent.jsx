import axios from '../../../axios-order';
import { useState } from 'react';
import Button from '../atoms/Button';
import TextArea from '../atoms/TextArea';

/* eslint-disable react/prop-types */
function FormAddItemEvent({ name, popStatus, id, quantityEvent, togglePop, refreshList }) {
  const [changeQuantity, setChangeQuantity] = useState({
    id,
    quantité_evenement: quantityEvent
  });

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setChangeQuantity((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function addProductInEvents() {
    axios
      .post('/products/updateProductEvent', changeQuantity)
      .then(() => {
        window.alert('La quantité de cet article pour vos évènements a été modifié');
        togglePop();
        refreshList();
      })
      .catch(() => {
        window.alert('impossible de faire les modifications.');
        togglePop();
      });
  }

  return (
    <div
      className={`${
        popStatus ? '' : 'hidden'
      } bg-white rounded-2xl w-72 h-96 flex flex-col justify-around`}>
      <h1 className="text-2xl">MODIFIER QUANTITE EVENEMENT</h1>
      <h1 className="text-xl">{name}</h1>
      <div className="flex items-center justify-around">
        <p>Qté:</p>
        <TextArea
          type="Number"
          grey={true}
          small={true}
          step={1}
          onChange={inputGroupChangeHandler}
          name="quantité_evenement"
          value={changeQuantity.quantité_evenement}
        />
      </div>
      <Button type="MODIFIER" color="green" onClick={addProductInEvents} />
    </div>
  );
}

export default FormAddItemEvent;
