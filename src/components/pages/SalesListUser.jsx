import axios from '../../axios-order';
import React, { useEffect, useState } from 'react';
import SaleItemUser from '../commons/organisms/SaleItemUser';
import MainLayout from '../layout/MainLayout';
import ReactPaginate from 'react-paginate';

function SalesListUser() {
  const [sales, setSales] = useState([]);
  const mail = localStorage.getItem('emailId');
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  const getSales = async () => {
    const res = await axios.post('/products/sales-User', { email: mail });
    const data = res.data;
    const endOffset = offset + perPage;
    const slice = data.reverse().slice(offset, endOffset);
    setSales(slice);
    setPageCount(Math.ceil(data.length / perPage));
  };
  const handlePageClick = (e) => {
    console.log(e.selected);
    const selectedPage = e.selected * perPage;
    setOffset(selectedPage);
  };

  useEffect(() => {
    getSales();
  }, [offset]);

  return (
    <div>
      <MainLayout>
        <h1 className="text-white text-3xl">VOS VENTES</h1>
        <div className="flex flex-col items-center">
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            renderOnZeroPageCount={null}
          />
          {sales.map((sale) => (
            <SaleItemUser
              key={sale.id}
              id={sale.id}
              date={sale.date}
              nbProducts={sale.nb_produit}
              eventName={sale.eventName}
              solde={sale.solde}
            />
          ))}
        </div>
      </MainLayout>
    </div>
  );
}

export default SalesListUser;
