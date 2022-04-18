import axios from '../../axios-order';
import { useEffect, useState } from 'react';
import MainLayout from '../layout/MainLayout';
import Event from '../commons/molecules/Event';
import PopCreateEvent from '../commons/molecules/PopCreateEvent';
import ReactPaginate from 'react-paginate';
import '../commons/organisms/pagination.css';
import { useNavigate } from 'react-router-dom';

function EventList() {
  const [statusPop, setStatusPop] = useState(false);
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const getEvents = async () => {
    const res = await axios.get('/events/');
    const data = res.data;
    setOpen(data.find((el) => el.status));
    const endOffset = offset + perPage;
    const slice = data.reverse().slice(offset, endOffset);
    setEvents(slice);
    setPageCount(Math.ceil(data.length / perPage));
  };
  const handlePageClick = (e) => {
    console.log(e.selected);
    const selectedPage = e.selected * perPage;
    setOffset(selectedPage);
  };

  useEffect(() => {
    if (localStorage.getItem('admin') === 'false') {
      return navigate('/mon-compte');
    }
    getEvents();
  }, [offset]);
  console.log(events);

  function togglePop() {
    setStatusPop(!statusPop);
  }

  return (
    <MainLayout>
      <div className="relative">
        <h1 className="text-white text-3xl">VOS EVENEMENTS</h1>
        {open ? (
          <button>
            <div className="flex items-baseline justify-end mt-2 mr-8">
              <svg
                width="41"
                height="41"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38.7899 7.14934C32.5822 7.62981 27.1369 9.48762 22.1336 12.8445C20.2053 14.1322 18.7191 15.3622 17.0406 17.0406C15.3302 18.7511 14.1194 20.2309 12.7805 22.2297C9.73749 26.7909 7.98218 31.5892 7.29031 37.2331C7.16218 38.2709 7.14937 38.7001 7.14937 41C7.14937 43.7482 7.21343 44.6515 7.56577 46.6887C8.75734 53.6395 12.0309 59.9496 17.0406 64.9593C18.7511 66.6698 20.2309 67.8806 22.2297 69.2195C26.3169 71.9421 30.7564 73.6911 35.5611 74.4662C37.6624 74.8057 38.2966 74.8506 41 74.8506C43.7034 74.8506 44.3377 74.8057 46.4389 74.4662C59.2322 72.4034 69.841 63.0631 73.5117 50.635C74.0819 48.7003 74.4406 46.945 74.7097 44.7668C74.8378 43.729 74.8506 43.2998 74.8506 41C74.8506 38.2517 74.7866 37.3356 74.4342 35.3112C73.6335 30.6731 71.9038 26.2912 69.3413 22.3962C64.1458 14.5101 55.9138 9.12887 46.6439 7.55934C44.7733 7.24544 43.8252 7.16856 41.4164 7.14934C40.148 7.13653 38.9692 7.13653 38.7899 7.14934ZM43.8828 12.4601C49.847 13.0815 55.4013 15.4967 59.8344 19.3917C65.1644 24.0747 68.5085 30.3143 69.4438 37.2972C70.1933 42.9411 69.1939 48.7772 66.5994 53.9086C64.9081 57.2398 62.6788 60.1098 59.8344 62.6082C51.218 70.174 38.7578 71.8332 28.4694 66.7915C22.7742 64.0048 18.1809 59.4564 15.3494 53.8061C11.2814 45.7022 11.3006 36.1889 15.4006 28.0914C17.0919 24.7601 19.3212 21.8901 22.1656 19.3917C26.4578 15.6248 31.7814 13.2481 37.5406 12.5242C39.4177 12.2872 41.9866 12.2615 43.8828 12.4601Z"
                  fill="red"
                />
                <path
                  d="M36.6117 22.031C36.3042 22.172 36.1056 22.377 35.9711 22.6909C35.8878 22.9023 35.875 23.7031 35.875 29.4046V35.875H29.3919C23.2226 35.875 22.8895 35.8814 22.6461 35.9967C22.3386 36.1376 22.14 36.3426 22.0055 36.6565C21.9222 36.8615 21.9094 37.4381 21.9094 41C21.9094 44.5618 21.9222 45.1384 22.0055 45.3434C22.14 45.6573 22.3386 45.8623 22.6461 46.0032C22.8895 46.1185 23.2226 46.125 29.3919 46.125H35.875V52.6081C35.875 58.7773 35.8814 59.1104 35.9967 59.3539C36.1376 59.6614 36.3426 59.86 36.6566 59.9945C36.8616 60.0778 37.4381 60.0906 41.0128 60.0906C44.8694 60.0906 45.1512 60.0778 45.3883 59.9689C45.7086 59.8279 45.9712 59.5268 46.0609 59.2065C46.0994 59.0528 46.125 56.7657 46.125 52.544V46.125H52.5953C58.2969 46.125 59.0976 46.1121 59.3091 46.0289C59.623 45.8943 59.828 45.6957 59.9689 45.3882C60.0778 45.1448 60.0906 44.8821 60.0906 41C60.0906 37.1306 60.0778 36.8487 59.9689 36.6117C59.828 36.2914 59.5269 36.0287 59.2066 35.939C59.0528 35.9006 56.7658 35.875 52.5505 35.875H46.125V29.4495C46.125 25.2342 46.0994 22.9471 46.0609 22.7934C45.9712 22.4731 45.7086 22.172 45.3883 22.031C45.1512 21.9221 44.8694 21.9093 41 21.9093C37.1178 21.9093 36.8551 21.9221 36.6117 22.031Z"
                  fill="red"
                />
              </svg>
              <h1 className="text-red-500 text-xl"> Créer un nouvel évènement</h1>
            </div>
          </button>
        ) : (
          <button onClick={togglePop}>
            <div className="flex items-baseline justify-end mt-2 mr-8">
              <svg
                width="41"
                height="41"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38.7899 7.14934C32.5822 7.62981 27.1369 9.48762 22.1336 12.8445C20.2053 14.1322 18.7191 15.3622 17.0406 17.0406C15.3302 18.7511 14.1194 20.2309 12.7805 22.2297C9.73749 26.7909 7.98218 31.5892 7.29031 37.2331C7.16218 38.2709 7.14937 38.7001 7.14937 41C7.14937 43.7482 7.21343 44.6515 7.56577 46.6887C8.75734 53.6395 12.0309 59.9496 17.0406 64.9593C18.7511 66.6698 20.2309 67.8806 22.2297 69.2195C26.3169 71.9421 30.7564 73.6911 35.5611 74.4662C37.6624 74.8057 38.2966 74.8506 41 74.8506C43.7034 74.8506 44.3377 74.8057 46.4389 74.4662C59.2322 72.4034 69.841 63.0631 73.5117 50.635C74.0819 48.7003 74.4406 46.945 74.7097 44.7668C74.8378 43.729 74.8506 43.2998 74.8506 41C74.8506 38.2517 74.7866 37.3356 74.4342 35.3112C73.6335 30.6731 71.9038 26.2912 69.3413 22.3962C64.1458 14.5101 55.9138 9.12887 46.6439 7.55934C44.7733 7.24544 43.8252 7.16856 41.4164 7.14934C40.148 7.13653 38.9692 7.13653 38.7899 7.14934ZM43.8828 12.4601C49.847 13.0815 55.4013 15.4967 59.8344 19.3917C65.1644 24.0747 68.5085 30.3143 69.4438 37.2972C70.1933 42.9411 69.1939 48.7772 66.5994 53.9086C64.9081 57.2398 62.6788 60.1098 59.8344 62.6082C51.218 70.174 38.7578 71.8332 28.4694 66.7915C22.7742 64.0048 18.1809 59.4564 15.3494 53.8061C11.2814 45.7022 11.3006 36.1889 15.4006 28.0914C17.0919 24.7601 19.3212 21.8901 22.1656 19.3917C26.4578 15.6248 31.7814 13.2481 37.5406 12.5242C39.4177 12.2872 41.9866 12.2615 43.8828 12.4601Z"
                  fill="white"
                />
                <path
                  d="M36.6117 22.031C36.3042 22.172 36.1056 22.377 35.9711 22.6909C35.8878 22.9023 35.875 23.7031 35.875 29.4046V35.875H29.3919C23.2226 35.875 22.8895 35.8814 22.6461 35.9967C22.3386 36.1376 22.14 36.3426 22.0055 36.6565C21.9222 36.8615 21.9094 37.4381 21.9094 41C21.9094 44.5618 21.9222 45.1384 22.0055 45.3434C22.14 45.6573 22.3386 45.8623 22.6461 46.0032C22.8895 46.1185 23.2226 46.125 29.3919 46.125H35.875V52.6081C35.875 58.7773 35.8814 59.1104 35.9967 59.3539C36.1376 59.6614 36.3426 59.86 36.6566 59.9945C36.8616 60.0778 37.4381 60.0906 41.0128 60.0906C44.8694 60.0906 45.1512 60.0778 45.3883 59.9689C45.7086 59.8279 45.9712 59.5268 46.0609 59.2065C46.0994 59.0528 46.125 56.7657 46.125 52.544V46.125H52.5953C58.2969 46.125 59.0976 46.1121 59.3091 46.0289C59.623 45.8943 59.828 45.6957 59.9689 45.3882C60.0778 45.1448 60.0906 44.8821 60.0906 41C60.0906 37.1306 60.0778 36.8487 59.9689 36.6117C59.828 36.2914 59.5269 36.0287 59.2066 35.939C59.0528 35.9006 56.7658 35.875 52.5505 35.875H46.125V29.4495C46.125 25.2342 46.0994 22.9471 46.0609 22.7934C45.9712 22.4731 45.7086 22.172 45.3883 22.031C45.1512 21.9221 44.8694 21.9093 41 21.9093C37.1178 21.9093 36.8551 21.9221 36.6117 22.031Z"
                  fill="white"
                />
              </svg>
              <h1 className="text-white text-xl"> Créer un nouvel évènement</h1>
            </div>
          </button>
        )}
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
          {events.map((el) => (
            <Event key={el.id} {...el} />
          ))}
        </div>
        <div className={`${statusPop ? '' : 'hidden'}`}>
          <PopCreateEvent togglePop={togglePop} refreshList={getEvents} />
        </div>
      </div>
    </MainLayout>
  );
}

export default EventList;
