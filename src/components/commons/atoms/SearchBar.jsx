/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function SearchBar({ event }) {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const searchProduct = () => {
    if (event) {
      navigate(`/articles-evenement/recherche/${search}`);
    } else {
      navigate(`/stock/recherche/${search}`);
    }
  };
  console.log(event);
  return (
    <form onSubmit={searchProduct}>
      <input
        type="text"
        className="bg-gray-700 bg-opacity-100 rounded-2xl w-80 h-8 text-white"
        placeholder="   Recherche"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
