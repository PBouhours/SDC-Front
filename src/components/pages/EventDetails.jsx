/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import moment from 'moment';
import Button from '../commons/atoms/Button';
import axiosOrder from '../../axios-order';
import SaleItemEvent from '../commons/organisms/SaleItemEvent';
import TextArea from '../commons/atoms/TextArea';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

function EventDetails() {
  const [event, setEvent] = useState({});
  const [sales, setSales] = useState([]);
  const [baseCash, setBaseCash] = useState('');
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  let params = useParams();
  const newDate = moment.utc(event.date).format('DD/MM/YYYY');
  const navigate = useNavigate();

  const getEvent = async () => {
    const response = await axiosOrder.get(`/events/${params.id}`);
    console.log(response);
    const data = response.data;
    console.log(data);
    setBaseCash(data.event[0].fond_caisse);
    setEvent(data.event[0]);
    const endOffset = offset + perPage;
    const slice = data.sales.reverse().slice(offset, endOffset);
    setSales(slice);
    setPageCount(Math.ceil(data.sales.length / perPage));
  };
  const handlePageClick = (e) => {
    console.log(e.selected);
    const selectedPage = e.selected * perPage;
    setOffset(selectedPage);
  };

  const closeEvent = () => {
    const accepte = window.confirm('voulez vous vraiment cloturer cet évènement ?');
    if (accepte) {
      axiosOrder.put(`/events/close-event/${params.id}`).then(() => {
        getEvent();
      });
    }
  };

  const changeBaseCash = () => {
    axiosOrder
      .post('/events/update-base-cash', { id: params.id, fond_caisse: baseCash })
      .then(() => {
        getEvent();
      });
  };

  useEffect(() => {
    if (localStorage.getItem('admin') === 'false') {
      return navigate('/mon-compte');
    }
    getEvent();
  }, [offset]);

  return (
    <div>
      <MainLayout>
        <div name="title">
          <h1 className="text-white text-3xl">Evenement: {event.name}</h1>
          <h1 className="text-white text-xl">{newDate}</h1>
        </div>
        <div name="event" className="flex flex-wrap-reverse justify-around">
          <div name="listSale" className=" w-11/12 flex flex-col items-center m-2">
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              renderOnZeroPageCount={null}
            />
            {sales.map((sale) => (
              <SaleItemEvent
                key={sale.id}
                nbProducts={sale.nb_produit}
                userName={sale.user_name}
                solde={sale.solde}
                id={sale.id}
                eventOpen={event.status === 1}
                refresh={getEvent}
              />
            ))}
          </div>
          <div name="infoSale" className="text-white text-xl w-5/6 ">
            {event.status === 1 ? (
              <div className="flex flex-col items-start m-4">
                <h1>Fond de caisse:</h1>
                <div className="flex items-baseline">
                  <TextArea
                    small={true}
                    value={baseCash}
                    min={0}
                    step={0.5}
                    className="mr-4"
                    type="Number"
                    onChange={(e) => setBaseCash(e.target.value)}
                  />
                  <h1 className="mr-4 ml-1">€</h1>
                  <Button small={true} color="green" type="Modifier" onClick={changeBaseCash} />
                </div>
              </div>
            ) : (
              <div className="flex justify-between m-4 border-b-2 border-white">
                <h1>Fond de Caisse:</h1>
                <h1>{event.fond_caisse} €</h1>
              </div>
            )}

            <div className="flex justify-between m-4 border-b-2 border-white">
              <h1>Nb Ventes:</h1>
              <h1>{event.nb_vente}</h1>
            </div>
            <div className="flex justify-between m-4 border-b-2 border-white">
              <h1>Solde Espèces:</h1>
              <h1>{event.solde_espece} €</h1>
            </div>
            <div className="flex justify-between m-4 border-b-2 border-white">
              <h1>Solde CB:</h1>
              <h1>{event.solde_cb} €</h1>
            </div>
            <div className="flex justify-between m-4 border-b-2 border-white">
              <h1>Solde Chèque:</h1>
              <h1>{event.solde_cheque} €</h1>
            </div>
            <div className="flex justify-between m-4 border-b-2 border-white">
              <h1>Total Remise:</h1>
              <h1>{event.total_remise} €</h1>
            </div>
            <div className="flex justify-between m-4 border-b-2 border-green-400">
              <h1>CA:</h1>
              <h1 className="text-green-400">{event.CA} €</h1>
            </div>
            {event.status === 1 ? (
              <button className="flex items-center m-4" onClick={closeEvent}>
                <svg
                  width="40"
                  height="59"
                  viewBox="0 0 56 59"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.8457 3.64598C10.465 3.70591 9.48067 3.9502 9.10879 4.08387C7.86629 4.51716 6.50129 5.57731 5.67004 6.74809C4.89567 7.83591 4.59379 8.51809 4.30942 9.81794C4.22629 10.1867 4.13879 10.6891 4.11692 10.9334C4.05129 11.5465 4.05129 47.329 4.11254 47.9098C4.21754 48.8732 4.54567 50.0854 4.89567 50.8137C5.35504 51.7633 6.18192 52.828 6.93442 53.4457C7.94067 54.2708 8.63629 54.6349 9.79567 54.9437C10.9244 55.2433 9.39754 55.2203 28.5907 55.2203C47.7182 55.2203 46.2263 55.2433 47.3594 54.9483C48.3657 54.6856 48.9869 54.3906 49.8488 53.7545C50.8725 52.9986 51.7213 51.9568 52.2813 50.7722C52.6838 49.9195 52.9725 48.8271 53.0688 47.79C53.0994 47.4719 53.1125 41.2815 53.0994 29.0851C53.0863 11.9521 53.0819 10.832 53.0119 10.4632C52.6925 8.84997 52.395 8.06177 51.6819 6.997C51.2269 6.3102 50.7019 5.73864 50.0894 5.25927C49.14 4.50794 48.4663 4.16684 47.425 3.89028C46.2044 3.57224 47.775 3.59528 28.525 3.59989C18.935 3.6045 10.9813 3.62294 10.8457 3.64598ZM43.0194 10.2328C44.1569 10.3711 45.3688 11.2146 45.9813 12.2978C46.2307 12.7449 46.4494 13.3349 46.5063 13.7129C46.5369 13.9387 46.55 18.6679 46.5413 29.5L46.5282 44.9644L46.4013 45.3101C45.955 46.55 45.2725 47.3843 44.2969 47.8914C43.7588 48.1679 43.5225 48.2509 43.0982 48.3108C42.8794 48.3385 37.6863 48.3523 28.2188 48.3431L13.6719 48.3293L13.2169 48.1587C11.8869 47.6563 10.9857 46.7022 10.5132 45.2871L10.3907 44.9183V29.2925V13.6668L10.4913 13.3441C10.7407 12.5651 11.0819 11.9843 11.6025 11.4497C12.0007 11.0394 12.32 10.8043 12.7925 10.5785C13.2344 10.3711 13.5188 10.2789 13.86 10.2328C14.3107 10.1775 42.56 10.1775 43.0194 10.2328Z"
                    fill="green"
                  />
                  <path
                    d="M27.322 12.6068C23.8089 13.1046 20.7683 15.437 19.0751 18.9263C18.3183 20.475 17.8195 22.4801 17.7495 24.2455L17.7408 24.499L16.4895 24.5128C15.282 24.5221 15.2339 24.5267 15.1551 24.6189C15.072 24.7157 15.072 24.9646 15.072 34.3723V44.0289L15.177 44.1165C15.2776 44.2041 15.5489 44.2041 28.5908 44.2041C41.6326 44.2041 41.9039 44.2041 42.0045 44.1165L42.1095 44.0289V34.3677C42.1095 25.1628 42.1051 24.7064 42.0308 24.6281C41.9608 24.5543 41.8251 24.5405 40.6964 24.5221L39.4408 24.499L39.432 24.2455C39.2658 20.0464 37.0958 16.1054 33.8233 14.0542C32.7295 13.3674 31.5614 12.9157 30.2533 12.6714C29.5839 12.5469 27.9958 12.51 27.322 12.6068ZM29.6845 18.1842C30.7958 18.4377 31.7845 19.0139 32.5939 19.8666C33.6876 21.0236 34.3308 22.4986 34.497 24.2317L34.5233 24.5221H28.5908H22.6583L22.6845 24.2547C22.7458 23.6739 22.8026 23.3282 22.9033 22.9318C23.3714 21.1065 24.5483 19.5393 26.0576 18.7281C26.6701 18.4008 27.2345 18.2118 27.9783 18.0966C28.2408 18.0551 29.387 18.115 29.6845 18.1842ZM29.3739 29.3804C30.0914 29.7261 30.5639 30.4359 30.6689 31.3163C30.7608 32.0768 30.5289 32.8005 29.9995 33.4089L29.7064 33.7408V36.3682V38.9955H28.5689H27.4314V36.3543V33.7178L27.1558 33.4136C26.6789 32.8835 26.4689 32.3396 26.4689 31.6205C26.4689 30.9291 26.6745 30.3668 27.0989 29.8828C27.6983 29.2006 28.5995 29.0024 29.3739 29.3804Z"
                    fill="white"
                  />
                </svg>
                <h1 className="ml-2">Cloturer l'évenement</h1>
              </button>
            ) : (
              <h1 className="text-red-500 text-3xl">&#x26A0; EVENEMENT CLOTURER</h1>
            )}
            <Link to="/evenements" className="m-4">
              <svg
                width="40"
                height="64"
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
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default EventDetails;
