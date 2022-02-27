import React, { useEffect, useState } from 'react';
import axiosOrder from '../../axios-order';
import MainLayout from '../layout/MainLayout';
import { Link, useParams } from 'react-router-dom';
import Items from '../commons/molecules/Items';
import { useNavigate } from 'react-router-dom';

function SearchStock() {
  let params = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axiosOrder.get(`/products/search/${params.search}`).then((response) => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    if (localStorage.getItem('admin') === 'false') {
      return navigate('/mon-compte');
    }
    getProducts();
  }, []);
  console.log(products);
  return (
    <div>
      <MainLayout>
        <div className="flex items-center justify-center ">
          <h1 className="text-white text-3xl mr-8">Recherche dans le Stock</h1>
          <Link to="/stock">
            <svg
              width="30"
              height="64"
              viewBox="0 0 75 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M34.9936 0.10125C33.7646 0.328201 32.7943 0.808044 31.8671 1.65102C31.1483 2.30593 30.7315 2.9025 30.4368 3.70008C30.178 4.40039 30.1061 4.90617 30.1061 6.015V7.00711H47.0327C59.2083 7.00711 64.0599 7.02656 64.333 7.07844C65.5333 7.30539 66.4965 8.18078 66.7552 9.26367C66.8702 9.75648 66.8702 53.4093 66.7552 53.9021C66.4965 54.985 65.5261 55.8604 64.333 56.0873C64.0599 56.1392 59.2083 56.1587 47.0327 56.1587H30.1061V57.1443C30.1061 58.2596 30.178 58.7654 30.4368 59.4657C30.7315 60.2568 31.1483 60.8534 31.8671 61.5148C32.823 62.3837 33.8652 62.883 35.1661 63.0905C35.4608 63.1423 40.9665 63.1618 52.3658 63.1618C70.8305 63.1618 69.5799 63.1877 70.7874 62.7663C71.5565 62.5004 72.1674 62.1178 72.8718 61.4759C73.7774 60.6523 74.3165 59.6927 74.5177 58.5579C74.6255 57.9678 74.6255 5.19797 74.5177 4.60789C74.1224 2.35133 72.153 0.529217 69.6518 0.0947647C68.8899 -0.0349236 35.7196 -0.0284386 34.9936 0.10125Z"
                fill="white"
              />
              <path
                d="M33.161 15.0219C32.8447 15.1127 32.6004 15.3008 31.0838 16.656C29.1719 18.3743 29.0282 18.5494 29.0282 19.2303C29.0282 19.4702 29.0857 19.7231 29.1647 19.8852C29.2582 20.0668 30.631 21.3572 33.8079 24.2297L38.3216 28.3084L19.821 28.3408L1.3204 28.3733L1.02572 28.5159C0.623218 28.7104 0.170406 29.1838 0.0697812 29.521C0.00509377 29.722 -0.00928121 30.4483 0.00509377 32.0045C0.0266562 34.1314 0.0338437 34.2157 0.184781 34.475C0.364468 34.7863 0.781343 35.13 1.11197 35.2532C1.31322 35.331 4.31759 35.344 19.8282 35.344C29.9841 35.344 38.3001 35.3634 38.3001 35.3893C38.3001 35.4153 36.2804 37.2633 33.8079 39.494C30.3722 42.6 29.2869 43.618 29.1791 43.8385C28.9851 44.2275 28.9851 44.8111 29.1791 45.2002C29.3876 45.6152 32.4422 48.384 32.9382 48.6045C33.3982 48.812 34.0666 48.825 34.5122 48.6369C34.7351 48.5397 37.1213 46.4258 43.2666 40.8751C51.6041 33.3403 51.7191 33.2301 51.9491 32.7632C52.1647 32.3352 52.1863 32.2444 52.1647 31.7905C52.1288 31.1615 51.9132 30.7465 51.2807 30.0851C51.0291 29.8193 47.2341 26.3761 42.8569 22.4271C37.2291 17.3628 34.7926 15.2165 34.5697 15.1127C34.1601 14.9247 33.6138 14.8922 33.161 15.0219Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col items-center">
          {products.map((el) => (
            <Items
              id={el.id}
              name={el.name}
              référence={el.ref}
              size={el.taille}
              sex={el.genre}
              quantity={el.quantité}
              quantityEvent={el.quantité_evenement}
              price={el.prix}
              key={el.id}
              stock={true}
              vendor={false}
              refreshList={getProducts}
            />
          ))}
        </div>
      </MainLayout>
    </div>
  );
}

export default SearchStock;
