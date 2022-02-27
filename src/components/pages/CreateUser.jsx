import axios from '../../axios-order';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../commons/atoms/Button';
import TextArea from '../commons/atoms/TextArea';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    mail: '',
    admin: '',
    actif: ''
  });

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function createUser() {
    const accepted = window.confirm('Cet utilisateur va être créé. Voulez vous vraiment le creer?');
    console.log(user);
    if (accepted) {
      axios
        .post('/users/addUser', user)
        .then(() => {
          window.alert('utilisateur créé');
          navigate('/gestion-utilisateurs');
        })
        .catch(() => {
          window.alert('Utilisateur déjà existant');
        });
      console.log(user);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('admin') === 'false') {
      navigate('/mon-compte');
    }
  }, []);
  return (
    <MainLayout>
      <div className=" flex flex-col items-center">
        <div className="bg-gray-500 w-11/12 h-3/5 flex flex-col items-center pt-4 pb-4">
          <h1 className="text-white text-3xl">CREEZ UN UTILISATEUR</h1>
          <div className="w-5/6 flex flex-wrap justify-around">
            <TextArea
              type="text"
              name="name"
              placeOrder="Nom"
              required
              onChange={inputGroupChangeHandler}
            />
            <TextArea
              type="mail"
              name="mail"
              placeOrder="Email"
              required
              onChange={inputGroupChangeHandler}
            />
          </div>
          <div className="w-5/6 flex justify-around">
            <div className=" flex flex-col items-start">
              <h1 className="text-white text-xl">Rôle:</h1>
              <div>
                <input type="radio" name="admin" onChange={inputGroupChangeHandler} value={1} />
                <label className="text-2xl"> Admin</label>
              </div>
              <div>
                <input type="radio" name="admin" onChange={inputGroupChangeHandler} value={0} />
                <label className="text-2xl"> Vendeur</label>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-white text-xl">Status:</h1>
              <div>
                <input type="radio" name="actif" onChange={inputGroupChangeHandler} value={1} />
                <label className="text-2xl"> Actif</label>
              </div>
              <div>
                <input type="radio" name="actif" onChange={inputGroupChangeHandler} value={0} />
                <label className="text-2xl"> Bloqué</label>
              </div>
            </div>
          </div>
          <Button color="green" type="CREER" onClick={createUser} />
        </div>
      </div>
      <Link to="/gestion-utilisateurs">
        <svg
          className="ml-8 mt-2"
          width="50"
          height="50"
          viewBox="0 0 75 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M34.9935 0.100761C33.7644 0.327713 32.7941 0.807556 31.8669 1.65053C31.1481 2.30545 30.7313 2.90201 30.4366 3.69959C30.1778 4.3999 30.106 4.90568 30.106 6.01451V7.00662H47.0325C59.2081 7.00662 64.0597 7.02607 64.3328 7.07795C65.5331 7.3049 66.4963 8.18029 66.755 9.26318C66.87 9.756 66.87 53.4088 66.755 53.9016C66.4963 54.9845 65.526 55.8599 64.3328 56.0869C64.0597 56.1387 59.2081 56.1582 47.0325 56.1582H30.106V57.1438C30.106 58.2591 30.1778 58.7649 30.4366 59.4652C30.7313 60.2563 31.1481 60.8529 31.8669 61.5143C32.8228 62.3832 33.865 62.8825 35.166 63.09C35.4606 63.1419 40.9663 63.1613 52.3656 63.1613C70.8303 63.1613 69.5797 63.1872 70.7872 62.7658C71.5563 62.4999 72.1672 62.1173 72.8716 61.4754C73.7772 60.6519 74.3163 59.6922 74.5175 58.5574C74.6253 57.9673 74.6253 5.19748 74.5175 4.6074C74.1222 2.35084 72.1528 0.528728 69.6516 0.0942764C68.8897 -0.0354118 35.7194 -0.0289268 34.9935 0.100761Z"
            fill="white"
          />
          <path
            d="M33.161 15.0214C32.8447 15.1122 32.6004 15.3003 31.0838 16.6555C29.1719 18.3739 29.0282 18.5489 29.0282 19.2298C29.0282 19.4697 29.0857 19.7226 29.1647 19.8847C29.2582 20.0663 30.631 21.3567 33.8079 24.2292L38.3216 28.3079L19.821 28.3403L1.3204 28.3728L1.02572 28.5154C0.623218 28.71 0.170406 29.1833 0.0697812 29.5205C0.00509377 29.7215 -0.00928121 30.4478 0.00509377 32.004C0.0266562 34.1309 0.0338437 34.2152 0.184781 34.4746C0.364468 34.7858 0.781343 35.1295 1.11197 35.2527C1.31322 35.3305 4.31759 35.3435 19.8282 35.3435C29.9841 35.3435 38.3001 35.3629 38.3001 35.3889C38.3001 35.4148 36.2804 37.2628 33.8079 39.4935C30.3722 42.5995 29.2869 43.6175 29.1791 43.838C28.9851 44.2271 28.9851 44.8107 29.1791 45.1997C29.3876 45.6147 32.4422 48.3835 32.9382 48.604C33.3982 48.8115 34.0666 48.8245 34.5122 48.6364C34.7351 48.5392 37.1213 46.4253 43.2666 40.8746C51.6041 33.3398 51.7191 33.2296 51.9491 32.7627C52.1647 32.3347 52.1863 32.2439 52.1647 31.79C52.1288 31.161 51.9132 30.746 51.2807 30.0846C51.0291 29.8188 47.2341 26.3756 42.8569 22.4266C37.2291 17.3623 34.7926 15.216 34.5697 15.1122C34.1601 14.9242 33.6138 14.8918 33.161 15.0214Z"
            fill="white"
          />
        </svg>
      </Link>
    </MainLayout>
  );
}

export default CreateUser;
