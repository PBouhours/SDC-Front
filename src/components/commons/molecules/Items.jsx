/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import FormAddItemEvent from '../organisms/FormAddItemEvent';
import FormAddItemStore from '../organisms/FormAddItemStore';

function Items({
  name,
  référence,
  size,
  sex,
  quantity,
  price,
  stock,
  id,
  quantityEvent,
  refreshList
}) {
  const [popStatus, setPopStatus] = useState(false);
  const [popAddStatus, setPopAddStatus] = useState(false);

  function togglePop() {
    setPopStatus(!popStatus);
  }

  function togglePopAddStore() {
    setPopAddStatus(!popAddStatus);
  }

  return (
    <>
      <div className="bg-gray-300 bg-opacity-50 h-24 w-4/5 rounded-xl mt-8 mb-2 text-white flex justify-between">
        <div className="flex justify-between">
          <div className="flex flex-col items-start justify-around ml-2">
            {stock ? (
              <Link to={`/stock/${id}`}>
                <h1 className="text-2xl">{name}</h1>
              </Link>
            ) : (
              <h1 className="text-2xl">{name}</h1>
            )}

            <div className="flex">
              <div className="flex flex-col items-start mr-1">
                <p>Taille: {size}</p>
                <p>Ref: {référence}</p>
              </div>
              <div className="flex flex-col">
                <p>Sexe: {sex}</p>
                <div className="flex">
                  <p>Stock: </p>
                  <p className={`${quantity === 0 ? 'text-red-500' : 'text-green-500'} ml-1`}>
                    {quantity}
                  </p>
                  <div className="flex ml-1">
                    <p>Event:</p>
                    <p
                      className={`${
                        quantityEvent === 0 ? 'text-red-500' : 'text-yellow-300'
                      } ml-1`}>
                      {quantityEvent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-around mr-4">
          <h1 className="text-xl">{price}€</h1>

          {stock ? (
            <button onClick={togglePop} disabled={quantity === 0 ? true : false}>
              <svg
                width="31"
                height="31"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M38.7899 7.14934C32.5822 7.62981 27.1369 9.48762 22.1336 12.8445C20.2053 14.1322 18.7191 15.3622 17.0406 17.0406C15.3302 18.7511 14.1194 20.2309 12.7805 22.2297C9.73749 26.7909 7.98218 31.5892 7.29031 37.2331C7.16218 38.2709 7.14937 38.7001 7.14937 41C7.14937 43.7482 7.21343 44.6515 7.56577 46.6887C8.75734 53.6395 12.0309 59.9496 17.0406 64.9593C18.7511 66.6698 20.2309 67.8806 22.2297 69.2195C26.3169 71.9421 30.7564 73.6911 35.5611 74.4662C37.6624 74.8057 38.2966 74.8506 41 74.8506C43.7034 74.8506 44.3377 74.8057 46.4389 74.4662C59.2322 72.4034 69.841 63.0631 73.5117 50.635C74.0819 48.7003 74.4406 46.945 74.7097 44.7668C74.8378 43.729 74.8506 43.2998 74.8506 41C74.8506 38.2517 74.7866 37.3356 74.4342 35.3112C73.6335 30.6731 71.9038 26.2912 69.3413 22.3962C64.1458 14.5101 55.9138 9.12887 46.6439 7.55934C44.7733 7.24544 43.8252 7.16856 41.4164 7.14934C40.148 7.13653 38.9692 7.13653 38.7899 7.14934ZM43.8828 12.4601C49.847 13.0815 55.4013 15.4967 59.8344 19.3917C65.1644 24.0747 68.5085 30.3143 69.4438 37.2972C70.1933 42.9411 69.1939 48.7772 66.5994 53.9086C64.9081 57.2398 62.6788 60.1098 59.8344 62.6082C51.218 70.174 38.7578 71.8332 28.4694 66.7915C22.7742 64.0048 18.1809 59.4564 15.3494 53.8061C11.2814 45.7022 11.3006 36.1889 15.4006 28.0914C17.0919 24.7601 19.3212 21.8901 22.1656 19.3917C26.4578 15.6248 31.7814 13.2481 37.5406 12.5242C39.4177 12.2872 41.9866 12.2615 43.8828 12.4601Z"
                  fill={quantity > 0 ? 'white' : 'red'}
                />
                <path
                  d="M36.6117 22.031C36.3042 22.172 36.1056 22.377 35.9711 22.6909C35.8878 22.9023 35.875 23.7031 35.875 29.4046V35.875H29.3919C23.2226 35.875 22.8895 35.8814 22.6461 35.9967C22.3386 36.1376 22.14 36.3426 22.0055 36.6565C21.9222 36.8615 21.9094 37.4381 21.9094 41C21.9094 44.5618 21.9222 45.1384 22.0055 45.3434C22.14 45.6573 22.3386 45.8623 22.6461 46.0032C22.8895 46.1185 23.2226 46.125 29.3919 46.125H35.875V52.6081C35.875 58.7773 35.8814 59.1104 35.9967 59.3539C36.1376 59.6614 36.3426 59.86 36.6566 59.9945C36.8616 60.0778 37.4381 60.0906 41.0128 60.0906C44.8694 60.0906 45.1512 60.0778 45.3883 59.9689C45.7086 59.8279 45.9712 59.5268 46.0609 59.2065C46.0994 59.0528 46.125 56.7657 46.125 52.544V46.125H52.5953C58.2969 46.125 59.0976 46.1121 59.3091 46.0289C59.623 45.8943 59.828 45.6957 59.9689 45.3882C60.0778 45.1448 60.0906 44.8821 60.0906 41C60.0906 37.1306 60.0778 36.8487 59.9689 36.6117C59.828 36.2914 59.5269 36.0287 59.2066 35.939C59.0528 35.9006 56.7658 35.875 52.5505 35.875H46.125V29.4495C46.125 25.2342 46.0994 22.9471 46.0609 22.7934C45.9712 22.4731 45.7086 22.172 45.3883 22.031C45.1512 21.9221 44.8694 21.9093 41 21.9093C37.1178 21.9093 36.8551 21.9221 36.6117 22.031Z"
                  fill={quantity > 0 ? 'white' : 'red'}
                />
              </svg>
            </button>
          ) : (
            <button onClick={togglePopAddStore}>
              <svg
                width="31"
                height="31"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M37.3642 0.600382C35.5694 0.930341 34.0239 1.22871 33.9288 1.26732C33.8369 1.30242 33.6991 1.38667 33.6236 1.44985C33.3611 1.67099 33.3775 1.63589 32.5802 3.82275C32.3997 4.31418 31.8058 5.94642 31.2578 7.44528L30.2636 10.1762H30.011C29.8732 10.1762 27.7075 10.2324 25.2007 10.2991C22.6971 10.3658 18.2543 10.4851 15.3307 10.5623C0.460048 10.959 0.994891 10.9414 0.824266 11.0046C0.610985 11.0783 0.496141 11.1591 0.328797 11.3416C0.161454 11.5276 0.0236411 11.833 0.000672402 12.0787C-0.00917134 12.1981 0.0892661 13.1915 0.28286 14.8799C0.446922 16.3191 0.771766 19.201 1.00802 21.286C1.67411 27.1796 1.61505 26.7128 1.71677 26.955C1.80536 27.1691 2.05473 27.4605 2.24176 27.5623C2.47145 27.6886 1.92676 27.636 10.0314 28.324C11.6294 28.4609 14.2347 28.682 15.8229 28.8154C17.411 28.9523 19.7768 29.1524 21.0827 29.2647L23.4518 29.4648L25.6174 31.2831C26.8052 32.2835 27.8617 33.1961 27.9602 33.312C28.1735 33.5577 28.3933 34.007 28.4425 34.3089C28.5377 34.874 28.3211 35.3303 27.8617 35.5234L27.6682 35.6041L24.5674 35.6322C22.8611 35.6463 17.0303 35.6743 11.6064 35.6884L1.7463 35.7165L1.55598 35.7972C1.2902 35.9095 1.0113 36.1939 0.889891 36.4747C0.811141 36.6607 0.798016 36.7379 0.798016 36.9766C0.801297 37.1486 0.820984 37.3171 0.857078 37.4119C0.929266 37.619 1.1163 37.8788 1.2902 38.0121C1.57567 38.2298 1.61833 38.2368 2.73723 38.2579L3.76426 38.2754L3.58708 38.4228C3.21301 38.7317 2.88817 39.2583 2.75364 39.7778C2.71426 39.9357 2.69786 40.1218 2.70114 40.4517C2.70114 40.8484 2.71426 40.9467 2.78973 41.1889C3.11458 42.2244 3.94145 42.9159 4.94551 42.9861C5.8577 43.0458 6.77317 42.4982 7.20301 41.6347C7.59676 40.8414 7.57379 39.8725 7.14723 39.1003C7.01598 38.8651 6.73707 38.5352 6.50411 38.3386L6.37286 38.2263H9.1652C10.7008 38.2228 15.2847 38.2122 19.3535 38.2017L26.7494 38.1806L26.6018 38.2824C25.8963 38.7809 25.4763 39.6725 25.5288 40.5746C25.5944 41.733 26.3885 42.7053 27.4614 42.9405C27.993 43.0563 28.4589 42.9896 28.9938 42.7088C29.2924 42.5579 29.3744 42.4912 29.6205 42.2279C29.8502 41.9822 29.9289 41.8663 30.0569 41.5925C30.2669 41.1432 30.3227 40.8905 30.3227 40.4166C30.3227 39.9568 30.2669 39.6935 30.0832 39.2934C29.9257 38.9529 29.7025 38.651 29.44 38.4228C29.2202 38.2368 28.7936 37.9911 28.6164 37.956C28.4524 37.9244 28.4524 37.8893 28.623 37.8191C28.8461 37.7278 29.2071 37.5067 29.4564 37.3101C30.0832 36.8116 30.6935 35.8393 30.805 35.1619C30.8542 34.8459 30.8542 34.2141 30.805 33.9052C30.7427 33.5436 30.5852 33.0347 30.4342 32.7117C30.011 31.8166 29.6303 31.413 27.6452 29.7491C26.8183 29.0576 26.1424 28.4749 26.1424 28.4574C26.1424 28.4398 26.3786 27.7729 26.6707 26.9796C26.9627 26.1827 27.3138 25.2174 27.4549 24.8313C27.596 24.4452 27.9799 23.3956 28.308 22.497C28.6361 21.5984 29.0233 20.5419 29.1677 20.1452C29.4925 19.2501 30.2078 17.2984 31.2939 14.3183C31.4186 13.9813 31.7861 12.9703 32.1142 12.0717C32.7508 10.3272 32.8361 10.099 33.7549 7.57867C34.3521 5.94291 34.7327 4.90038 35.0411 4.05091C35.133 3.79818 35.2117 3.59108 35.215 3.58406C35.2216 3.57703 36.5571 3.33132 38.1846 3.03295C41.4625 2.43622 41.3575 2.4643 41.643 2.13785C41.8825 1.86406 41.9711 1.62185 41.9711 1.2603C41.9711 0.923321 41.8891 0.677606 41.7021 0.449443C41.4789 0.175647 41.1114 -0.00688357 40.7964 0.000136834C40.7046 0.000136834 39.1591 0.270423 37.3642 0.600382ZM29.2924 12.3947C28.4097 14.8307 27.7764 16.5648 27.7403 16.635L27.6977 16.7227H26.6182H25.5353V14.4762V12.2297L26.8643 12.1911C27.596 12.17 28.4622 12.1525 28.7903 12.149L29.3842 12.1419L29.2924 12.3947ZM24.6921 14.4832L24.6822 16.7227L22.6741 16.7333L20.6627 16.7403V14.5464V12.3525L21.0499 12.349C21.2599 12.3455 22.0769 12.3245 22.8611 12.3034C23.6453 12.2788 24.3803 12.2543 24.4952 12.2543L24.6986 12.2472L24.6921 14.4832ZM19.8194 14.5534L19.8096 16.7227H17.8014H15.79L15.7802 14.6061L15.7736 12.493L15.9114 12.4894C15.9902 12.4859 16.6957 12.4649 17.4799 12.4438C18.2641 12.4192 19.1139 12.3947 19.3666 12.3947L19.826 12.3876L19.8194 14.5534ZM14.9533 14.6342V16.7403L12.9452 16.7333L10.9338 16.7227L10.9239 14.6763C10.9207 13.553 10.9207 12.6299 10.9239 12.6299C10.9469 12.6193 13.7885 12.5386 14.3397 12.5351L14.9533 12.5281V14.6342ZM10.0807 14.6868V16.7227L8.07254 16.7298L6.06114 16.7403V14.7395V12.7387L6.51395 12.7352C6.76004 12.7316 7.61317 12.7106 8.40723 12.686C9.20129 12.6614 9.90348 12.6439 9.96582 12.6474L10.0807 12.6509V14.6868ZM5.20801 14.757V16.7403H3.75114C2.79958 16.7403 2.28442 16.7263 2.2713 16.7052C2.23848 16.649 1.82505 12.9072 1.84801 12.8826C1.86442 12.865 3.85286 12.7948 4.85692 12.7808L5.20801 12.7738V14.757ZM5.20801 19.6362V21.6546H4.01036C3.35083 21.6546 2.8127 21.6476 2.8127 21.6405C2.8127 21.616 2.38942 17.8601 2.37301 17.7302L2.35661 17.6179H3.78395H5.20801V19.6362ZM10.0971 19.6362V21.6546H8.0791H6.06114V19.6362V17.6179H8.0791H10.0971V19.6362ZM14.9533 19.6362V21.6546H12.9354H10.9174V19.6362V17.6179H12.9354H14.9533V19.6362ZM19.8194 19.6257L19.8096 21.637H17.8014H15.79L15.7802 19.6257L15.7736 17.6179H17.7982H19.826L19.8194 19.6257ZM24.6986 19.6362V21.6546H22.6807H20.6627V19.6362V17.6179H22.6807H24.6986V19.6362ZM27.3105 17.8355C27.2088 18.1198 26.0603 21.2614 25.9422 21.5739C25.9193 21.6441 25.8897 21.6546 25.7158 21.6546H25.5189V19.6362V17.6179H26.4541H27.3893L27.3105 17.8355ZM5.20801 23.9819V25.4316L4.23348 25.3473C3.69536 25.3017 3.24583 25.2561 3.23598 25.242C3.22286 25.228 3.15395 24.6558 3.07848 23.9713C3.00301 23.2868 2.93411 22.6831 2.92426 22.6269L2.90458 22.5321H4.0563H5.20801V23.9819ZM10.0971 24.1819V25.8317H10.0019C9.9527 25.8317 9.07989 25.7615 8.06598 25.6738C7.05207 25.586 6.18583 25.5158 6.14317 25.5158H6.06114V24.024V22.5321H8.0791H10.0971V24.1819ZM14.9533 24.3925C14.9533 25.414 14.9435 26.253 14.9304 26.253C14.8549 26.2565 10.9929 25.93 10.96 25.916C10.9272 25.9054 10.9174 25.5369 10.9174 24.217V22.5321H12.9354H14.9533V24.3925ZM19.8194 24.6172L19.826 26.6812L19.6291 26.6601C19.5208 26.6496 18.6578 26.5759 17.7096 26.4987C16.7613 26.4214 15.9443 26.3477 15.8885 26.3407L15.79 26.3232L15.7966 24.4382C15.8032 23.3992 15.8064 22.5462 15.8064 22.5392C15.8064 22.5356 16.7088 22.5356 17.808 22.5392L19.8096 22.5497L19.8194 24.6172ZM24.6986 23.7607V24.9858L24.341 25.9616C24.1474 26.4987 23.9735 26.9725 23.9603 27.0182C23.9439 27.0779 23.9243 27.0954 23.8849 27.0779C23.7405 27.0112 23.5075 26.9831 22.3033 26.8848C21.5913 26.8251 20.9285 26.769 20.8366 26.7584L20.6627 26.7374V24.6347V22.5321H22.6807H24.6986V23.7607ZM25.5846 22.5567C25.5846 22.5743 25.5682 22.6094 25.5518 22.6374C25.5255 22.6796 25.5189 22.6761 25.5189 22.6094C25.5189 22.5672 25.5353 22.5321 25.5518 22.5321C25.5714 22.5321 25.5846 22.5427 25.5846 22.5567ZM5.68051 39.0476C6.03817 39.2302 6.33348 39.5952 6.43848 39.9919C6.52707 40.3219 6.49754 40.7747 6.36301 41.0695C6.23833 41.3468 5.94301 41.6628 5.69364 41.7856C4.83395 42.2033 3.85286 41.6487 3.69208 40.6483C3.59036 40.02 3.9152 39.353 4.46317 39.0652C4.82411 38.8756 5.32614 38.8686 5.68051 39.0476ZM28.5541 39.0687C28.8166 39.2056 29.1021 39.518 29.2136 39.7848C29.7517 41.0871 28.5114 42.3718 27.3007 41.7681C26.7658 41.5048 26.4344 40.8203 26.5296 40.1955C26.6871 39.1881 27.7043 38.6194 28.5541 39.0687Z"
                  fill="white"
                />
                <path
                  d="M4.76501 39.7078C4.56814 39.8096 4.47955 39.9079 4.39095 40.1185C4.12517 40.7433 4.67314 41.4173 5.29001 41.2277C5.63454 41.1189 5.84126 40.8276 5.84126 40.452C5.84454 39.9922 5.55907 39.6692 5.12595 39.6376C4.96517 39.6271 4.89954 39.6376 4.76501 39.7078Z"
                  fill="white"
                />
                <path
                  d="M27.6813 39.6762C27.4976 39.7464 27.3663 39.8623 27.2679 40.0413C27.1891 40.1782 27.176 40.2449 27.176 40.452C27.1793 40.7258 27.2219 40.8486 27.3926 41.0242C27.5501 41.1856 27.7043 41.2558 27.9307 41.2523C28.1735 41.2523 28.3507 41.1646 28.5148 40.9575C29.007 40.3432 28.3966 39.4024 27.6813 39.6762Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      <FormAddItemEvent
        popStatus={popStatus}
        name={name}
        id={id}
        quantityEvent={quantityEvent}
        togglePop={togglePop}
        refreshList={refreshList}
      />
      <FormAddItemStore
        popAddStatus={popAddStatus}
        name={name}
        id={id}
        quantityEvent={quantityEvent}
        togglePopAddStore={togglePopAddStore}
        refreshList={refreshList}
      />
    </>
  );
}

export default Items;
