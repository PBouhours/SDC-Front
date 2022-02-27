/* eslint-disable react/prop-types */
import moment from 'moment';
import { Link } from 'react-router-dom';
function Event(props) {
  const { name, date, nb_vente, CA, status, id } = props;
  const newDate = moment.utc(date).format('DD/MM/YY');

  return (
    <div className="bg-gray-400 m-4 p-4 w-4/6 h-auto rounded-3xl flex flex-wrap justify-evenly items-center text-white">
      <Link to={`/evenements/${id}`} className="w-1-4">
        <h1 className="text-3xl text-yellow-400">{name}</h1>
        <h1 className="text-black">{newDate}</h1>
      </Link>
      <div className="flex">
        <label>Ventes:</label>
        <h1 className="ml-2 text-black">{nb_vente}</h1>
      </div>
      <div className="flex ">
        <label>C.A: </label>
        <h1 className="ml-2 text-green-700">{CA}€</h1>
      </div>
      <div>
        <h1 className="text-xl">Status:</h1>
        <h1 className={`${status ? 'text-green-400' : 'text-red-500'} text-2xl`}>
          {status ? 'Open' : 'Close'}
        </h1>
      </div>
    </div>
  );
}

export default Event;
