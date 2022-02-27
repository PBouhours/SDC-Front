/* eslint-disable react/prop-types */
import axios from '../../../axios-order';
import { useState } from 'react/cjs/react.development';
import Button from '../atoms/Button';
import TextArea from '../atoms/TextArea';
// import { useNavigate } from 'react-router-dom';

function PopCreateEvent({ togglePop, refreshList }) {
  const [event, setEvent] = useState({
    name: '',
    date: '',
    fond_caisse: ''
  });
  // const navigate = useNavigate();

  const inputGroupChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setEvent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function createEvent() {
    const accepted = window.confirm(
      "Cet évènement va être ajouté à vos autres évènement. Voulez vous vraiment l'ajouter?"
    );
    console.log(event);
    if (accepted) {
      axios
        .post('/events/addEvent', event)
        .then((res) => {
          if (res.data.message === 'A event is already open') {
            window.alert(
              "impossible de créer cet évènement. Un évènement est déjà ouvert. Fermez l'évènement en cours avant d'en créer un nouveau"
            );
            togglePop();
          } else {
            window.alert('évènement créé');
            refreshList();

            togglePop();
          }
        })
        .catch(() => {
          window.alert(
            "Une erreur c'est produit pendant la création. Veuillez recommencer ultérieurement "
          );
          togglePop();
        });
      console.log(event);
    }
  }

  return (
    <div className="bg-white rounded-2xl w-72 h-96 absolute top-0 right-0 ">
      <div className="flex justify-end">
        <button onClick={togglePop}>
          <svg
            width="50"
            height="50"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M37.6966 36.1055L57.1862 16.6158C57.6256 16.1765 57.6256 15.4642 57.1862 15.0249C56.7468 14.5856 56.0347 14.5856 55.5952 15.0249L36.1056 34.5144L16.6159 15.0248C16.1766 14.5855 15.4644 14.5855 15.025 15.0248C14.5856 15.4641 14.5856 16.1764 15.025 16.6157L34.5145 36.1055L15.0249 55.5951C14.5854 56.0346 14.5854 56.7467 15.0249 57.1861C15.2446 57.4058 15.5324 57.5156 15.8204 57.5156C16.1084 57.5156 16.3963 57.4058 16.6159 57.1861L36.1056 37.6965L55.5952 57.1861C55.815 57.4058 56.1027 57.5156 56.3907 57.5156C56.6787 57.5156 56.9666 57.4058 57.1862 57.1861C57.6256 56.7467 57.6256 56.0346 57.1862 55.5951L37.6966 36.1055Z"
              fill="black"
            />
          </svg>
        </button>
      </div>

      <h1 className="text-lg text-black">CREER EVENEMENT</h1>
      <TextArea
        grey={true}
        type="texte"
        name="name"
        placeOrder="  Nom"
        onChange={inputGroupChangeHandler}
        value={event.name}
      />
      <TextArea
        grey={true}
        type="date"
        name="date"
        onChange={inputGroupChangeHandler}
        value={event.date}
      />
      <div className="flex items-center justify-around">
        <h1>Fond de caisse:</h1>
        <TextArea
          grey={true}
          small={true}
          type="number"
          name="fond_caisse"
          min={0}
          step={0.5}
          onChange={inputGroupChangeHandler}
          value={event.fond_caisse}
        />
      </div>
      <Button color="green" type="CREER" onClick={createEvent} />
    </div>
  );
}

export default PopCreateEvent;
