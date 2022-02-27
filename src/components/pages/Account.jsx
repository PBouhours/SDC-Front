import React, { useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginUserContext';
import { TokenContext } from '../../contexts/TokenUserContext';
import Button from '../commons/atoms/Button';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import axios from '../../axios-order';

function Account() {
  const { loginStatus } = useContext(LoginContext);
  const { updateLoginStatus } = useContext(LoginContext);
  const { updateTokenStatus } = useContext(TokenContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [form, setForm] = useState(false);

  const navigate = useNavigate();

  function statusForm() {
    setForm(!form);
  }

  function disconnected() {
    updateTokenStatus('');
    updateLoginStatus('');
    localStorage.clear();
    navigate('/');
  }

  function changePassword() {
    const accepted = window.confirm(
      'Voulez vous vraiment changer de mot de passe? Cette action vous déconnectera du site.'
    );

    if (accepted) {
      axios
        .post('/users/updatePassword', {
          mail: loginStatus.mail,
          password: password,
          newPassword: newPassword
        })
        .then(() => {
          window.alert('mot de passe modifié');
          disconnected();
          navigate('/');
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
    <div>
      <MainLayout>
        <div className="flex flex-col items-center">
          <h1 className="text-white text-3xl mb-4">VOTRE COMPTE</h1>
          <div className=" bg-gray-500 w-11/12 p-4">
            <div className="flex flex-col items-start">
              <h1 className="text-white text-xl">Nom : {loginStatus.user}</h1>
              <h1 className="text-white text-xl">Mail : {loginStatus.mail}</h1>
              <h1 className="text-white text-xl">
                Status : {loginStatus.admin === 'true' ? 'Admin' : 'Vendeur'}
              </h1>
            </div>
            <div>
              <button onClick={statusForm}>
                <h1 className="text-2xl text-blue-500">modifier mot de passe?</h1>
              </button>
            </div>
            <div className={`flex flex-col items-center ${!form ? 'hidden' : ''}`}>
              <input
                type="password"
                placeholder="   Ancien mot de passe"
                className="m-2 w-4/6 h-12 rounded-xl "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <input
                type="password"
                placeholder="   Nouveau mot de passe"
                className="m-2 w-4/6 h-12 rounded-xl "
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                required
              />
              <Button color="green" type="Modifier" onClick={changePassword} />
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default Account;
