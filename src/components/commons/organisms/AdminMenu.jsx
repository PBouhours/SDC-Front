/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginUserContext';
import { TokenContext } from '../../../contexts/TokenUserContext';
import { useNavigate } from 'react-router-dom';

function MenuAdmin({ statusBurger, toggleBurger }) {
  const { updateLoginStatus } = useContext(LoginContext);
  const { updateTokenStatus } = useContext(TokenContext);

  const navigate = useNavigate();

  function disconnected() {
    updateTokenStatus('');
    updateLoginStatus('');
    localStorage.clear();
    toggleBurger();
    navigate('/');
  }
  return (
    <div
      className={`${statusBurger ? '' : 'hidden'} bg-black h-screen w-11/12 flex justify-center `}>
      <nav className="w-4/5 mt-24">
        <ul className="flex flex-col w-full">
          <li className="mb-2">
            <Link
              to="/mon-compte"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>MON COMPTE</h1>
              <h1>1</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <Link
              to="/articles-evenement"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>ARTICLE EVENEMENT</h1>
              <h1>2</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <Link
              to="/evenements"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>EVENEMENT</h1>
              <h1>3</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <Link
              to="/store"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>PANIERS</h1>
              <h1>4</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <Link
              to="/ventes-utilisateur"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>VENTES</h1>
              <h1>5</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <Link
              to="/gestion-utilisateurs"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>GESTION UTILISATEURS</h1>
              <h1>6</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <Link
              to="/stock"
              onClick={toggleBurger}
              className="text-white text-lg flex justify-between">
              <h1>STOCK</h1>
              <h1>7</h1>
            </Link>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
          <li className="mb-2">
            <button
              onClick={(toggleBurger, disconnected)}
              className="text-white text-lg flex justify-between">
              <h1>DECONNEXION</h1>
            </button>
            <div className="w-perso h-0.5 bg-red-500"></div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuAdmin;
