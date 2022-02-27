import axios from '../../../axios-order';
import { useState } from 'react';
import Button from '../atoms/Button';

/* eslint-disable react/prop-types */
function UserItem(props) {
  const { name, mail, admin, CA, nb_vente, actif, refresh, id } = props;

  const [user, setUser] = useState({
    mail: mail,
    admin: admin,
    actif: actif
  });

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function updateUser() {
    const accepted = window.confirm('Voulez vous vraiment modifier cet utilisateur ?');
    if (accepted) {
      axios
        .post(`/users/updateUser`, user)
        .then(() => {
          window.alert('Utilisateur modifié');
          refresh();
        })
        .catch((err) => {
          window.alert(
            "une erreur s'est produit pendant la modification. Veuillez vérifier vos modification."
          );
          console.log(err);
        });
    }
  }

  function deleteUser() {
    const accepted = window.confirm(
      'Cet utilisteur va être supprimé. Voulez vous vraiment le supprimer?'
    );
    if (accepted) {
      axios
        .delete(`/users/${id}`)
        .then(() => {
          window.alert("L'utilisateur' à bien été supprimé");
          refresh();
        })
        .catch((err) => {
          window.alert("cet utilisateur n'a pas pu être supprimé");
          console.log(err);
        });
    }
  }

  return (
    <div className="bg-gray-400 w-11/12  mt-4 mb-4 p-2 flex flex-wrap justify-between items-center">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl">{name}</h1>
        <h1>{mail}</h1>
        <div className="flex">
          <h1 className="text-white mr-2">{admin ? 'Admin' : 'Vendeur'}</h1>
          <h1 className={`${actif ? 'text-yellow-400' : 'text-red-500'}`}>
            {actif ? 'Actif' : 'Bloqué'}
          </h1>
        </div>
      </div>
      <div>
        <div className="flex mr-8">
          <h1>nb_vente: </h1>
          <p className="text-white">{nb_vente}</p>
        </div>
        <div className="flex">
          <h1>CA: </h1>
          <p className="text-white">{CA}€</p>
        </div>
      </div>
      <div className="w-5/6 flex justify-around">
        <div className=" flex flex-col items-start">
          <h1 className="text-white text-xl">Role:</h1>
          <div>
            <input type="radio" name="admin" onChange={inputGroupChangeHandler} value={1} />
            <label className="text-xl"> Admin</label>
          </div>
          <div>
            <input type="radio" name="admin" onChange={inputGroupChangeHandler} value={0} />
            <label className="text-xl"> Vendeur</label>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-white text-xl">Status:</h1>
          <div>
            <input type="radio" name="actif" onChange={inputGroupChangeHandler} value={1} />
            <label className="text-xl"> Actif</label>
          </div>
          <div>
            <input type="radio" name="actif" onChange={inputGroupChangeHandler} value={0} />
            <label className="text-xl"> Bloqué</label>
          </div>
        </div>
        <Button color="green" type="Modifier" small onClick={updateUser} />
      </div>
      <div className="mr-2">
        {admin ? (
          <svg
            width="40"
            height="40"
            viewBox="0 0 71 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.7507 4.69637C13.2681 4.77355 12.0201 5.08824 11.5486 5.26043C9.97328 5.81855 8.24265 7.18418 7.18875 8.6923C6.20695 10.0936 5.82422 10.9723 5.46367 12.6467C5.35828 13.1217 5.24734 13.7689 5.21961 14.0836C5.1364 14.8732 5.1364 60.9661 5.21406 61.7142C5.34719 62.9551 5.7632 64.5167 6.20695 65.4548C6.78937 66.6779 7.83773 68.0495 8.7918 68.8451C10.0676 69.9079 10.9495 70.377 12.4195 70.7748C13.8505 71.1607 11.9147 71.131 36.2488 71.131C60.4998 71.131 58.6083 71.1607 60.0449 70.7807C61.3207 70.4423 62.1084 70.0623 63.2011 69.2429C64.4991 68.2692 65.5752 66.9273 66.2852 65.4014C66.7955 64.3029 67.1616 62.8957 67.2836 61.5598C67.3224 61.1501 67.3391 53.1761 67.3224 37.4654C67.3058 15.3957 67.3002 13.9529 67.2115 13.4779C66.8066 11.3998 66.4294 10.3845 65.5252 9.01293C64.9484 8.12824 64.2827 7.39199 63.5062 6.77449C62.3025 5.80668 61.4483 5.3673 60.1281 5.01105C58.5805 4.60136 60.5719 4.63105 36.1656 4.63699C24.0069 4.64293 13.9227 4.66668 13.7507 4.69637ZM54.5424 13.1811C55.9846 13.3592 57.5211 14.4457 58.2977 15.8411C58.6138 16.417 58.8912 17.177 58.9633 17.6639C59.0021 17.9548 59.0187 24.0467 59.0077 37.9998L58.991 57.9201L58.8302 58.3654C58.2644 59.9626 57.3991 61.0373 56.1621 61.6904C55.4798 62.0467 55.1803 62.1536 54.6423 62.2307C54.3649 62.2664 47.7808 62.2842 35.7773 62.2723L17.334 62.2545L16.7571 62.0348C15.0709 61.3876 13.9282 60.1586 13.3291 58.3357L13.1738 57.8607V37.7326V17.6045L13.3014 17.1889C13.6176 16.1854 14.0502 15.4373 14.7103 14.7486C15.2151 14.2201 15.62 13.9173 16.2191 13.6264C16.7793 13.3592 17.1398 13.2404 17.5725 13.1811C18.1438 13.1098 53.96 13.1098 54.5424 13.1811Z"
              fill="#B81609"
            />
            <path
              d="M31.4785 17.2424C31.3343 17.3077 31.2732 17.4324 30.8961 18.4418L30.4745 19.564L24.9997 19.5937C19.6193 19.6233 19.525 19.6233 19.4196 19.7421C19.3197 19.8549 19.1644 21.0008 18.6597 25.353C18.6319 25.5668 18.6486 25.6499 18.7484 25.7865L18.8649 25.9468L36.2599 25.9349L53.6549 25.9171L53.7658 25.7568L53.8768 25.5965L53.5273 22.7287C53.2333 20.3121 53.1668 19.843 53.0725 19.7421C52.9726 19.6233 52.8783 19.6233 47.4979 19.5937L42.0231 19.564L41.7291 18.7921C41.1411 17.2424 41.1633 17.2899 40.9803 17.2246C40.714 17.1236 31.7004 17.1415 31.4785 17.2424Z"
              fill="#B81609"
            />
            <path
              d="M20.9617 27.2587C20.823 27.4072 20.8174 27.1934 21.0227 30.8747C21.0837 31.9672 21.1946 34.0097 21.2723 35.4168C21.4165 38.1243 22.1487 51.5728 22.3817 55.8122L22.5203 58.3356L22.659 58.4662L22.8032 58.6028H36.2488H49.6945L49.8331 58.4662C49.9662 58.3475 49.9773 58.2822 50.0328 57.5043C50.0827 56.7503 50.3046 53.4134 50.6707 47.7075C50.8038 45.665 50.9425 43.5453 51.3086 37.9997C51.5194 34.7697 51.9132 28.7015 51.9576 27.9593C51.9853 27.4309 51.9798 27.3775 51.8688 27.2587L51.7523 27.134H48.1524H44.547L44.436 27.2884L44.3195 27.4487V40.5053V53.5618L43.5041 53.544L42.6832 53.5262L42.6666 40.44C42.6555 28.3631 42.6499 27.3418 42.5612 27.2409C42.478 27.14 42.3171 27.134 39.882 27.134C37.3194 27.134 37.2916 27.134 37.1863 27.2587C37.0809 27.3834 37.0809 27.6981 37.0642 40.4697L37.0531 53.5559H36.2488H35.4445L35.4334 41.9897C35.4224 35.6306 35.4168 29.7465 35.4168 28.9093C35.4168 27.4903 35.4113 27.3775 35.3114 27.2587C35.206 27.134 35.1838 27.134 32.4492 27.134C29.7202 27.134 29.6924 27.134 29.587 27.2587C29.4817 27.3834 29.4817 27.6981 29.465 40.4697L29.4539 53.5559H28.6496H27.8453L27.8342 40.4697C27.8176 27.6981 27.8176 27.3834 27.7122 27.2587C27.6068 27.134 27.5902 27.134 24.3397 27.134H21.0782L20.9617 27.2587Z"
              fill="#B81609"
            />
          </svg>
        ) : (
          <button onClick={deleteUser}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 71 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.7507 4.69637C13.2681 4.77355 12.0201 5.08824 11.5486 5.26043C9.97328 5.81855 8.24265 7.18418 7.18875 8.6923C6.20695 10.0936 5.82422 10.9723 5.46367 12.6467C5.35828 13.1217 5.24734 13.7689 5.21961 14.0836C5.1364 14.8732 5.1364 60.9661 5.21406 61.7142C5.34719 62.9551 5.7632 64.5167 6.20695 65.4548C6.78937 66.6779 7.83773 68.0495 8.7918 68.8451C10.0676 69.9079 10.9495 70.377 12.4195 70.7748C13.8505 71.1607 11.9147 71.131 36.2488 71.131C60.4998 71.131 58.6083 71.1607 60.0449 70.7807C61.3207 70.4423 62.1084 70.0623 63.2011 69.2429C64.4991 68.2692 65.5752 66.9273 66.2852 65.4014C66.7955 64.3029 67.1616 62.8957 67.2836 61.5598C67.3224 61.1501 67.3391 53.1761 67.3224 37.4654C67.3058 15.3957 67.3002 13.9529 67.2115 13.4779C66.8066 11.3998 66.4294 10.3845 65.5252 9.01293C64.9484 8.12824 64.2827 7.39199 63.5062 6.77449C62.3025 5.80668 61.4483 5.3673 60.1281 5.01105C58.5805 4.60136 60.5719 4.63105 36.1656 4.63699C24.0069 4.64293 13.9227 4.66668 13.7507 4.69637ZM54.5424 13.1811C55.9846 13.3592 57.5211 14.4457 58.2977 15.8411C58.6138 16.417 58.8912 17.177 58.9633 17.6639C59.0021 17.9548 59.0187 24.0467 59.0077 37.9998L58.991 57.9201L58.8302 58.3654C58.2644 59.9626 57.3991 61.0373 56.1621 61.6904C55.4798 62.0467 55.1803 62.1536 54.6423 62.2307C54.3649 62.2664 47.7808 62.2842 35.7773 62.2723L17.334 62.2545L16.7571 62.0348C15.0709 61.3876 13.9282 60.1586 13.3291 58.3357L13.1738 57.8607V37.7326V17.6045L13.3014 17.1889C13.6176 16.1854 14.0502 15.4373 14.7103 14.7486C15.2151 14.2201 15.62 13.9173 16.2191 13.6264C16.7793 13.3592 17.1398 13.2404 17.5725 13.1811C18.1438 13.1098 53.96 13.1098 54.5424 13.1811Z"
                fill="white"
              />
              <path
                d="M31.4785 17.2424C31.3343 17.3077 31.2732 17.4324 30.8961 18.4418L30.4745 19.564L24.9997 19.5937C19.6193 19.6233 19.525 19.6233 19.4196 19.7421C19.3197 19.8549 19.1644 21.0008 18.6597 25.353C18.6319 25.5668 18.6486 25.6499 18.7484 25.7865L18.8649 25.9468L36.2599 25.9349L53.6549 25.9171L53.7658 25.7568L53.8768 25.5965L53.5273 22.7287C53.2333 20.3121 53.1668 19.843 53.0725 19.7421C52.9726 19.6233 52.8783 19.6233 47.4979 19.5937L42.0231 19.564L41.7291 18.7921C41.1411 17.2424 41.1633 17.2899 40.9803 17.2246C40.714 17.1236 31.7004 17.1415 31.4785 17.2424Z"
                fill="white"
              />
              <path
                d="M20.9617 27.2587C20.823 27.4072 20.8174 27.1934 21.0227 30.8747C21.0837 31.9672 21.1946 34.0097 21.2723 35.4168C21.4165 38.1243 22.1487 51.5728 22.3817 55.8122L22.5203 58.3356L22.659 58.4662L22.8032 58.6028H36.2488H49.6945L49.8331 58.4662C49.9662 58.3475 49.9773 58.2822 50.0328 57.5043C50.0827 56.7503 50.3046 53.4134 50.6707 47.7075C50.8038 45.665 50.9425 43.5453 51.3086 37.9997C51.5194 34.7697 51.9132 28.7015 51.9576 27.9593C51.9853 27.4309 51.9798 27.3775 51.8688 27.2587L51.7523 27.134H48.1524H44.547L44.436 27.2884L44.3195 27.4487V40.5053V53.5618L43.5041 53.544L42.6832 53.5262L42.6666 40.44C42.6555 28.3631 42.6499 27.3418 42.5612 27.2409C42.478 27.14 42.3171 27.134 39.882 27.134C37.3194 27.134 37.2916 27.134 37.1863 27.2587C37.0809 27.3834 37.0809 27.6981 37.0642 40.4697L37.0531 53.5559H36.2488H35.4445L35.4334 41.9897C35.4224 35.6306 35.4168 29.7465 35.4168 28.9093C35.4168 27.4903 35.4113 27.3775 35.3114 27.2587C35.206 27.134 35.1838 27.134 32.4492 27.134C29.7202 27.134 29.6924 27.134 29.587 27.2587C29.4817 27.3834 29.4817 27.6981 29.465 40.4697L29.4539 53.5559H28.6496H27.8453L27.8342 40.4697C27.8176 27.6981 27.8176 27.3834 27.7122 27.2587C27.6068 27.134 27.5902 27.134 24.3397 27.134H21.0782L20.9617 27.2587Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default UserItem;