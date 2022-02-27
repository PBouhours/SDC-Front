/* eslint-disable no-undef */
import axios from '../../axios-order';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginUserContext';
import { TokenContext } from '../../contexts/TokenUserContext';
import Button from '../commons/atoms/Button';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const { updateTokenStatus } = useContext(TokenContext);
  const { updateLoginStatus } = useContext(LoginContext);

  const navigate = useNavigate();

  const text = process.env.REACT_APP_BACKEND_URL;
  console.log(text);
  function connexion() {
    if (mail && password) {
      axios
        .post('/users/login', {
          mail,
          password
        })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('emailId', data.message);
          localStorage.setItem('name', data.result[0].name);
          if (data.result[0].admin === 1) {
            localStorage.setItem('admin', true);
          } else {
            localStorage.setItem('admin', false);
          }
          const user = localStorage.getItem('name');
          const admin = localStorage.getItem('admin');
          const mail = localStorage.getItem('emailId');
          updateLoginStatus({ user, admin, mail });
          updateTokenStatus(data.token);
          navigate('/mon-compte');
        })
        .catch((err) => {
          window.alert(
            'Probleme de connexion! Votre compte est peut-être momentanément bloqué pour plusieur raison. Faites appelle à un administrateur du site! '
          );
          console.log(err);
        });
    }
  }

  return (
    <div>
      <MainLayout>
        <div className="flex flex-col items-center w-full">
          <input
            type="text"
            placeholder="   Email"
            className="m-2 w-4/6 h-12 rounded-xl "
            onChange={(e) => {
              setMail(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="   Password"
            className="m-2 w-4/6 h-12 rounded-xl "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <div className="flex justify-between items-end w-4/6">
            <Link className="text-xs text-blue-700" to="/mot-de-passe-perdu">
              Mot de passe oublié
            </Link>
            <Button color="green" type="Connexion" small onClick={connexion} />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default Login;
