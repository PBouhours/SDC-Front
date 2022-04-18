/* eslint-disable react/prop-types */

import axios from '../../../axios-order';
import { useEffect, useState } from 'react';
import Items from '../molecules/Items';
import ReactPaginate from 'react-paginate';
import './pagination.css';

function ItemsList({ stock, Type, Sexe, Size }) {
  const [offset, setOffset] = useState(0);
  const [products, SetProducts] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const getItems = async () => {
    const res = await axios.get(stock ? '/products' : '/products/event');
    const data = res.data;
    const endOffset = offset + perPage;
    if (Type != 'Tous') {
      if (Type === 'goodies') {
        const filter2 = data.filter((el) => el.catégorie === Type);
        SetProducts(filter2);
        setPageCount(Math.ceil(filter2.length / perPage));
      } else if (Type === 'vêtement') {
        if (Sexe && Size) {
          const filter2 = data.filter(
            (el) => el.catégorie === Type && el.genre === Sexe && el.taille === Size
          );
          const slice = filter2.reverse().slice(offset, endOffset);
          SetProducts(slice);
          setPageCount(Math.ceil(filter2.length / perPage));
        } else if (Sexe) {
          const filter2 = data.filter((el) => el.catégorie === Type && el.genre === Sexe);
          const slice = filter2.reverse().slice(offset, endOffset);
          SetProducts(slice);
          setPageCount(Math.ceil(filter2.length / perPage));
        } else if (Size) {
          const filter2 = data.filter((el) => el.catégorie === Type && el.taille === Size);
          const slice = filter2.reverse().slice(offset, endOffset);
          SetProducts(slice);
          setPageCount(Math.ceil(filter2.length / perPage));
        } else {
          const filter2 = data.filter((el) => el.catégorie === Type);
          const slice = filter2.reverse().slice(offset, endOffset);
          SetProducts(slice);
          setPageCount(Math.ceil(filter2.length / perPage));
        }
      }
    } else if (Type === 'Tous') {
      const slice = data.reverse().slice(offset, endOffset);
      SetProducts(slice);
      setPageCount(Math.ceil(data.length / perPage));
    }
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected * perPage;
    setOffset(selectedPage);
  };

  useEffect(() => {
    getItems();
  }, [offset, Type, Sexe, Size]);
  return (
    <div className="w-999 flex flex-col items-center mt-4">
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        renderOnZeroPageCount={null}
      />

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
          stock={stock}
          vendor={false}
          refreshList={getItems}
        />
      ))}
    </div>
  );
}

export default ItemsList;
