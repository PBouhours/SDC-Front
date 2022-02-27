import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Stock from '../pages/Stock';
import CreateItem from '../pages/CreateItem';
import DetailsItem from '../pages/DetailsItem';
import EventList from '../pages/EventList';
import StockEvent from '../pages/StockEvent';
import UserManager from '../pages/UserManager';
import CreateUser from '../pages/CreateUser';
import { LoginContext } from '../../contexts/LoginUserContext';
import axios from '../../axios-order';
import Login from '../pages/Login';
import { TokenContext } from '../../contexts/TokenUserContext';
import Account from '../pages/Account';
import ChangePassword from '../pages/ChangePassword';
import Store from '../pages/Store';
import SalesListUser from '../pages/SalesListUser';
import SaleUser from '../pages/SaleUser';
import EventDetails from '../pages/EventDetails';
import SaleEvent from '../pages/SaleEvent';
import SearchStock from '../pages/SearchStock';
import SearchProductsEvent from '../pages/SearchProductsEvent';

function MainRouter() {
  const { updateLoginStatus } = useContext(LoginContext);
  const { updateTokenStatus } = useContext(TokenContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('/users/login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res.data)
      .then((data) => {
        if (data.loggedIn === true) {
          const user = localStorage.getItem('name');
          const mail = localStorage.getItem('emailId');
          const admin = localStorage.getItem('admin');
          updateLoginStatus({ user, admin, mail });
          updateTokenStatus(token);
        } else if (data.loggedIn === false) {
          updateLoginStatus('');
          updateTokenStatus('');
          localStorage.clear();
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/connexion" element={<Login />} />
        <Route exact path="/mot-de-passe-perdu" element={<ChangePassword />} />
        <Route exact path="/mon-compte" element={<Account />} />
        <Route exact path="/stock" element={<Stock />}></Route>
        <Route path="/stock/:id" element={<DetailsItem />} />
        <Route exact path="/stock/ajout-article" element={<CreateItem />} />
        <Route exact path="/evenements" element={<EventList />} />
        <Route path="/evenements/:id" element={<EventDetails />} />
        <Route path="/evenements/:id/vente/:idVente" element={<SaleEvent />} />
        <Route exact path="/articles-evenement" element={<StockEvent />} />
        <Route exact path="/gestion-utilisateurs" element={<UserManager />} />
        <Route exact path="/gestion-utilisateurs/creation" element={<CreateUser />} />
        <Route exact path="/store" element={<Store />} />
        <Route exact path="/ventes-utilisateur" element={<SalesListUser />} />
        <Route path="/ventes-utilisateur/:id" element={<SaleUser />} />
        <Route path="/stock/recherche/:search" element={<SearchStock />} />
        <Route path="/articles-evenement/recherche/:search" element={<SearchProductsEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
