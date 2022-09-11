/* eslint-disable no-unused-vars */
import axios from '../../axios-order';
import React, { useEffect, useState } from 'react';
import Button from '../commons/atoms/Button';
import Select from '../commons/atoms/Select';
import TextArea from '../commons/atoms/TextArea';
import ProductInStore from '../commons/organisms/ProductInStore';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';

function Store() {
  const paie = [null, 'CB', 'espece', 'cheque'];
  const mail = localStorage.getItem('emailId');
  const [store, setStore] = useState({});
  const [total, setTotal] = useState('');
  const [products, setProducts] = useState([]);
  const [remise, setRemise] = useState('');

  const [sale, setSale] = useState({
    date: '',
    evenement_id: '',
    id: '',
    nb_produit: '',
    pay_type: '',
    remise: '',
    solde: '',
    user_id: '',
    valide: ''
  });

  console.log(products);

  const navigate = useNavigate();

  const getStore = () => {
    axios.post('/products/store', { mail }).then((response) => {
      setStore(response.data);
      setTotal(response.data.sale[0].solde);
      setProducts(response.data.products);
      setRemise(response.data.sale[0].remise);
      setSale(response.data.sale[0]);
    });
  };

  const changeRemise = (e) => {
    setRemise(e.target.value);
  };

  const updateRemise = () => {
    axios.post('/products/update-remise', { id: store.sale[0].id, remise }).then((response) => {
      getStore();
    });
  };

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setSale((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validationStore = () => {
    if (!sale.pay_type) {
      window.alert('Choisissez un moyen de paiement.');
    } else {
      const validation = window.confirm('voulez vous vraiment valider ce panier ?');
      if (validation) {
        axios.post('/products/validation-store', sale).then(() => {
          navigate('/articles-evenement');
        });
      }
    }
  };

  const AnnulationStore = () => {
    const validation = window.confirm(
      'voulez vous vraiment annuler ce panier ? Vous serez obligé de recommencer vôtre panier'
    );
    if (validation) {
      axios.post(`/products/annulation-sale/${sale.id}`, sale).then(() => {
        navigate('/articles-evenement');
      });
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <div>
      <MainLayout>
        {products.length === 0 ? (
          <h1 className="text-white text-3xl">VOTRE PANIER EST VIDE</h1>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-white text-3xl">VOTRE PANIER</h1>
            <div className="bg-gray-500 w-5/6 text-white text-xl rounded-xl mt-8">
              <div name="article">
                {products.map((product) => (
                  <ProductInStore
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    size={product.taille}
                    refe={product.ref}
                    sexe={product.genre}
                    quantity={product.quantité}
                    price={product.prix_unitaire}
                    refresh={getStore}
                  />
                ))}
              </div>
              <div name="sale" className="flex justify-between">
                <div className="w-1/2 border-r-2 border-black">
                  <Select
                    tab={paie}
                    title="Mode Paiement:"
                    name="pay_type"
                    value={sale.pay_type}
                    onChange={inputGroupChangeHandler}
                  />
                </div>
                <div className="w-1/4 border-r-2 border-black pb-2">
                  <h1 className="text-xl">Remise:</h1>
                  <div className="flex flex-wrap justify-around items-baseline">
                    <div>
                      <TextArea
                        type="Number"
                        verySmall
                        min={0}
                        step={0.5}
                        value={remise}
                        onChange={changeRemise}
                      />
                    </div>

                    <Button color="green" type="ok" verySmall onClick={updateRemise} />
                  </div>
                </div>
                <div className="w-1/4 flex flex-col justify-center">
                  <h1 className="text-xl">Total:</h1>
                  <p className="text-green-400">{total} €</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end w-9/12">
              <Button color="green" type="Valider la vente" onClick={validationStore} />
            </div>
            <div className="flex justify-end w-9/12">
              <Button color="red" type="Annuler la vente" onClick={AnnulationStore} />
            </div>
          </div>
        )}
      </MainLayout>
    </div>
  );
}

export default Store;
