/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import axios from '../../../axios-order';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import Select from '../atoms/Select';
import TextArea from '../atoms/TextArea';
import { useNavigate } from 'react-router-dom';

function Form({ typeForm, id }) {
  const genre = ['', 'Homme', 'Femme', 'Enfant', 'Unisexe'];
  const taille = ['', 'S', 'M', 'L', 'XL', '2XL'];
  const type = ['', 'vêtement', 'goodies'];

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    ref: '',
    cat: '',
    gender: '',
    size: '',
    price: '',
    quantity: ''
  });

  if (typeForm === 'update') {
    useEffect(() => {
      axios.get(`/products/${id}`).then((res) => {
        console.log(res);
        const temp = res.data[0];
        setProduct((prevState) => ({
          ...prevState,
          name: temp.name,
          ref: temp.ref,
          cat: temp.catégorie,
          gender: temp.genre,
          size: temp.taille,
          price: temp.prix,
          quantity: temp.quantité
        }));
      });
    }, [id]);
    console.log(product);
  }

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function createProduct() {
    const accepted = window.confirm(
      "Ce nouveau produit va être ajouté à votre stock. Voulez vous vraiment l'ajouter?"
    );
    console.log(product);
    if (accepted) {
      axios
        .post('/products/addProduct', product)
        .then(() => {
          window.alert('produit créé');
          navigate('/stock');
        })
        .catch(() => {
          window.alert('ce produit existe déjà');
        });
      console.log(product);
    }
  }

  function deleteProduct() {
    const accepted = window.confirm(
      'Ce produit va être supprimé de votre stock. Voulez vous vraiment le supprimer?'
    );
    if (accepted) {
      axios
        .delete(`/products/${id}`)
        .then(() => {
          window.alert('Le produit à bien été supprimé');
          navigate('/stock');
        })
        .catch((err) => {
          window.alert("ce produit n'a pas pu être supprimé");
          console.log(err);
        });
    }
  }

  function updateProduct() {
    const accepted = window.confirm('Voulez vous vraiment modifier cette article ?');
    if (accepted) {
      axios
        .put(`/products/${id}`, product)
        .then(() => {
          window.alert('Produit modifié');
          navigate('/stock');
        })
        .catch((err) => {
          window.alert(
            "une erreur s'est produit pendant la modification. Veuillez vérifier vos modification."
          );
          console.log(err);
        });
    }
  }

  return (
    <div className="bg-gray-400 w-5/6 h-auto flex flex-wrap justify-evenly items-center p-8 mb-4">
      <div className="h-full w-auto flex flex-col justify-around ">
        <TextArea
          type="text"
          placeOrder="Nom"
          name="name"
          onChange={inputGroupChangeHandler}
          value={product.name}
        />
        <TextArea
          type="text"
          placeOrder="Référence"
          name="ref"
          onChange={inputGroupChangeHandler}
          value={product.ref}
        />
        <Select
          title="Catégorie :"
          tab={type}
          name="cat"
          onChange={inputGroupChangeHandler}
          value={product.cat}
        />
        {product.cat === 'vêtement' ? (
          <>
            <Select
              title="Taille :"
              tab={taille}
              name="size"
              onChange={inputGroupChangeHandler}
              value={product.size}
            />
            <Select
              title="Sexe :"
              tab={genre}
              name="gender"
              onChange={inputGroupChangeHandler}
              value={product.gender}
            />
          </>
        ) : null}
      </div>
      <div className="h-full w-auto flex flex-col justify-between mt-4 ">
        <TextArea
          type="number"
          placeOrder="Prix en €"
          min={0}
          step={0.5}
          name="price"
          onChange={inputGroupChangeHandler}
          value={product.price}
        />
        <TextArea
          type="number"
          placeOrder="Quantité"
          min={0}
          step={1}
          name="quantity"
          onChange={inputGroupChangeHandler}
          value={product.quantity}
        />
        {typeForm === 'create' ? (
          <Button type="VALIDER" color="green" onClick={createProduct} />
        ) : (
          ''
        )}
        {typeForm === 'update' ? (
          <>
            {' '}
            <Button type="MODIFIER" color="green" onClick={updateProduct} />{' '}
            <Button type="SUPPRIMER" color="red" onClick={deleteProduct} />{' '}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Form;
