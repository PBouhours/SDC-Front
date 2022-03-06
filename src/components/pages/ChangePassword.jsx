/* eslint-disable no-undef */
import axios from '../../axios-order';
import React from 'react';
import { useState } from 'react';
import Button from '../commons/atoms/Button';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import generator from 'generate-password';
import emailjs from '@emailjs/browser';

const { REACT_APP_MAIL_ID, REACT_APP_MAIL_ID_USER, REACT_APP_TEMPLATE_CHANGE_PASSWORD } =
  process.env;

function ChangePassword() {
  const [mail, setMail] = useState('');
  const password = generator.generate({
    length: 10,
    numbers: true
  });
  console.log(password);

  const navigate = useNavigate();
  function newPassword() {
    axios
      .post('/users/newPassword', { mail: mail, password: password })
      .then((res) => {
        console.log(res);
        emailjs.send(
          REACT_APP_MAIL_ID,
          REACT_APP_TEMPLATE_CHANGE_PASSWORD,
          { mail: mail, password: password },
          REACT_APP_MAIL_ID_USER
        );
        window.alert('Un mail avec votre nouveau mot de passe vien de vous être envoyé');
        navigate('/');
      })
      .catch(() => {
        window.alert("Ce compte n'existe pas.");
      });
  }
  return (
    <div>
      <MainLayout>
        <div className="flex flex-col items-center">
          <h1 className="text-white text-3xl">Envoi de votre mot de passe</h1>
          <div className=" bg-gray-500 w-4/6 p-4">
            <div>
              <input
                type="text"
                placeholder="   Votre adresse Email"
                className="m-2 w-5/6 h-12 rounded-xl "
                onChange={(e) => {
                  setMail(e.target.value);
                }}
                required
              />

              <Button color="green" type="Valider" onClick={newPassword} small />
            </div>

            <h1 className="text-white mt-4">
              Votre nouveau mot de passe vous seras envoyé sur votre adresse mail.
            </h1>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default ChangePassword;
