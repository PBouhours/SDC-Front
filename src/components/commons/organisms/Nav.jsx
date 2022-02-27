import { useContext, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import AdminMenu from './AdminMenu';
import VendorMenu from './VendorMenu';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../../contexts/LoginUserContext';

function Nav() {
  const { loginStatus } = useContext(LoginContext);
  const [statusBurger, setStatusBurger] = useState(false);

  function toggleBurger() {
    setStatusBurger(!statusBurger);
  }
  return (
    <>
      <div className="bg-black h-28 w-full flex items-center justify-between static border-b-2 border-red-500 ">
        <div className="w-28 h-20 bg-white border-solid border-2 border-red-700 rounded-full ml-3 flex items-center justify-center ">
          <h2 className="text-green-700 text-3xl">S.D.C</h2>
        </div>
        {!loginStatus ? (
          <Link to="/connexion" className="text-green-500 mr-12 text-xl">
            Connexion
          </Link>
        ) : (
          <div className="flex w-48 justify-between">
            <div className="flex ml-8 mt-4">
              <Link to="/store">
                <svg
                  width="40"
                  height="50"
                  viewBox="0 0 107 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M88.1335 33.229C83.8999 33.9043 80.2545 34.515 80.03 34.594C79.8133 34.6659 79.4882 34.8383 79.3102 34.9676C78.691 35.4202 78.7297 35.3484 76.849 39.8244C76.4233 40.8302 75.0224 44.171 73.7299 47.2389L71.3848 52.8284H70.7888C70.4638 52.8284 65.3556 52.9434 59.4424 53.0799C53.537 53.2164 43.0575 53.4607 36.1614 53.6187C1.08514 54.4306 2.34671 54.3947 1.94425 54.524C1.44117 54.6749 1.17028 54.8401 0.775555 55.2137C0.380831 55.5945 0.0557639 56.2196 0.00158604 56.7225C-0.021633 56.9668 0.210558 59 0.6672 62.4558C1.05418 65.4014 1.82041 71.2999 2.37767 75.5676C3.94883 87.6305 3.80951 86.6749 4.04945 87.1706C4.25842 87.6089 4.84663 88.2052 5.2878 88.4136C5.82957 88.6722 4.54479 88.5644 23.6618 89.9726C27.4311 90.2528 33.5764 90.7055 37.3224 90.9785C41.0684 91.2587 46.6487 91.6682 49.7291 91.8981L55.3172 92.3076L60.4254 96.0292C63.2271 98.0768 65.7193 99.9448 65.9515 100.182C66.4546 100.685 66.9732 101.604 67.0892 102.222C67.3137 103.379 66.8029 104.313 65.7193 104.708L65.2627 104.873L57.9487 104.931C53.924 104.96 40.1706 105.017 27.3769 105.046L4.1191 105.103L3.6702 105.269C3.04329 105.498 2.38541 106.08 2.09904 106.655C1.91329 107.036 1.88233 107.194 1.88233 107.683C1.89007 108.035 1.93651 108.379 2.02165 108.573C2.19192 108.997 2.63308 109.529 3.04329 109.802C3.71664 110.247 3.81725 110.262 6.45649 110.305L8.87901 110.341L8.46107 110.643C7.57875 111.275 6.81252 112.353 6.49519 113.416C6.40231 113.739 6.36361 114.12 6.37135 114.795C6.37135 115.607 6.40231 115.808 6.58032 116.304C7.34655 118.423 9.29696 119.839 11.6653 119.983C13.8169 120.105 15.9763 118.984 16.9902 117.216C17.919 115.593 17.8648 113.61 16.8586 112.029C16.549 111.548 15.8912 110.873 15.3417 110.47L15.0321 110.24H21.6185C25.2407 110.233 36.0531 110.212 45.6503 110.19L63.0956 110.147L62.7473 110.355C61.0832 111.375 60.0926 113.2 60.2164 115.047C60.3712 117.418 62.2442 119.408 64.7751 119.889C66.0289 120.126 67.1279 119.99 68.3895 119.415C69.0938 119.106 69.2873 118.97 69.8678 118.431C70.4096 117.928 70.5953 117.691 70.8972 117.13C71.3925 116.211 71.5241 115.693 71.5241 114.723C71.5241 113.782 71.3925 113.243 70.9591 112.424C70.5876 111.727 70.0613 111.11 69.4421 110.643C68.9236 110.262 67.9174 109.759 67.4995 109.687C67.1125 109.622 67.1125 109.551 67.5149 109.407C68.0412 109.22 68.8926 108.767 69.4808 108.365C70.9591 107.345 72.3987 105.355 72.6618 103.968C72.7779 103.322 72.7779 102.028 72.6618 101.396C72.5148 100.656 72.1433 99.6143 71.7872 98.9533C70.7888 97.1213 69.891 96.295 65.2085 92.8896C63.2581 91.4742 61.6637 90.2816 61.6637 90.2456C61.6637 90.2097 62.221 88.8446 62.9098 87.2209C63.5986 85.59 64.4268 83.6143 64.7596 82.824C65.0924 82.0337 65.9979 79.8855 66.7719 78.0463C67.5459 76.207 68.4592 74.0445 68.7997 73.2326C69.5659 71.4005 71.2532 67.4059 73.815 61.3062C74.1091 60.6165 74.976 58.5474 75.75 56.7081C77.2515 53.1374 77.4527 52.6704 79.6198 47.5119C81.0284 44.1639 81.9262 42.03 82.6538 40.2914C82.8705 39.7741 83.0562 39.3502 83.064 39.3358C83.0795 39.3215 86.2295 38.8186 90.0684 38.2079C97.8003 36.9865 97.5527 37.044 98.226 36.3758C98.791 35.8154 99 35.3197 99 34.5797C99 33.8899 98.8065 33.387 98.3653 32.92C97.839 32.3596 96.9722 31.986 96.2292 32.0004C96.0125 32.0004 92.3671 32.5536 88.1335 33.229ZM69.0938 57.3691C67.0118 62.3552 65.5181 65.9043 65.433 66.048L65.3323 66.2276H62.786H60.2319V61.6295V57.0314L63.3665 56.9524C65.0924 56.9093 67.1357 56.8733 67.9097 56.8662L69.3105 56.8518L69.0938 57.3691ZM58.2428 61.6439L58.2196 66.2276L53.4829 66.2492L48.7384 66.2636V61.7732V57.2829L49.6517 57.2757C50.1471 57.2685 52.0742 57.2254 53.924 57.1823C55.7738 57.132 57.5075 57.0817 57.7784 57.0817L58.2583 57.0673L58.2428 61.6439ZM46.7493 61.7876L46.7261 66.2276H41.9894H37.245L37.2218 61.8954L37.2063 57.5703L37.5314 57.5631C37.7171 57.5559 39.3811 57.5128 41.2309 57.4697C43.0807 57.4194 45.0853 57.3691 45.6813 57.3691L46.7648 57.3547L46.7493 61.7876ZM35.2714 61.9528V66.2636L30.5347 66.2492L25.7902 66.2276L25.767 62.0391C25.7593 59.74 25.7593 57.8504 25.767 57.8504C25.8212 57.8289 32.5238 57.6637 33.824 57.6565L35.2714 57.6421V61.9528ZM23.7779 62.0606V66.2276L19.0412 66.242L14.2968 66.2636V62.1684V58.0732L15.3649 58.066C15.9454 58.0588 17.9577 58.0157 19.8307 57.9654C21.7037 57.9151 23.36 57.8792 23.507 57.8864L23.7779 57.8936V62.0606ZM12.2845 62.2043V66.2636H8.84805C6.60354 66.2636 5.38841 66.2348 5.35745 66.1917C5.28006 66.0768 4.30485 58.418 4.35903 58.3677C4.39773 58.3318 9.08799 58.1881 11.4563 58.1594L12.2845 58.145V62.2043ZM12.2845 72.1908V76.322H9.45949C7.90381 76.322 6.6345 76.3076 6.6345 76.2932C6.6345 76.2429 5.63608 68.5554 5.59738 68.2896L5.55869 68.0597H8.92545H12.2845V72.1908ZM23.8166 72.1908V76.322H19.0567H14.2968V72.1908V68.0597H19.0567H23.8166V72.1908ZM35.2714 72.1908V76.322H30.5115H25.7515V72.1908V68.0597H30.5115H35.2714V72.1908ZM46.7493 72.1693L46.7261 76.286H41.9894H37.245L37.2218 72.1693L37.2063 68.0597H41.9817H46.7648L46.7493 72.1693ZM58.2583 72.1908V76.322H53.4983H48.7384V72.1908V68.0597H53.4983H58.2583V72.1908ZM64.4191 68.5052C64.1791 69.0871 61.4702 75.5173 61.1916 76.1567C61.1374 76.3004 61.0678 76.322 60.6576 76.322H60.1932V72.1908V68.0597H62.399H64.6048L64.4191 68.5052ZM12.2845 81.0853V84.0525L9.98579 83.8801C8.71648 83.7867 7.65614 83.6933 7.63292 83.6646C7.60196 83.6358 7.43943 82.4648 7.26142 81.0638C7.08341 79.6628 6.92087 78.427 6.89765 78.3121L6.85121 78.1181H9.56785H12.2845V81.0853ZM23.8166 81.4948V84.8716H23.5922C23.4761 84.8716 21.4173 84.7279 19.0258 84.5483C16.6342 84.3687 14.5909 84.225 14.4903 84.225H14.2968V81.1715V78.1181H19.0567H23.8166V81.4948ZM35.2714 81.9259C35.2714 84.0166 35.2481 85.7337 35.2172 85.7337C35.0392 85.7409 25.9296 85.0728 25.8522 85.044C25.7748 85.0225 25.7515 84.2681 25.7515 81.5667V78.1181H30.5115H35.2714V81.9259ZM46.7493 82.3857L46.7648 86.6102L46.3004 86.5671C46.045 86.5456 44.0095 86.3947 41.7727 86.2367C39.5359 86.0786 37.6088 85.9277 37.4772 85.9133L37.245 85.8774L37.2605 82.0193C37.2759 79.8927 37.2837 78.1468 37.2837 78.1325C37.2837 78.1253 39.4121 78.1253 42.0049 78.1325L46.7261 78.154L46.7493 82.3857ZM58.2583 80.6327V83.1401L57.4146 85.1374C56.958 86.2367 56.5478 87.2066 56.5168 87.3C56.4781 87.4221 56.4317 87.458 56.3388 87.4221C55.9983 87.2856 55.4487 87.2281 52.6083 87.027C50.9288 86.9048 49.3653 86.7899 49.1486 86.7683L48.7384 86.7252V82.4216V78.1181H53.4983H58.2583V80.6327ZM60.348 78.1684C60.348 78.2043 60.3093 78.2762 60.2706 78.3336C60.2087 78.4198 60.1932 78.4127 60.1932 78.2762C60.1932 78.1899 60.2319 78.1181 60.2706 78.1181C60.317 78.1181 60.348 78.1397 60.348 78.1684ZM13.399 111.921C14.2426 112.295 14.9392 113.042 15.1869 113.854C15.3958 114.529 15.3262 115.456 15.0089 116.06C14.7147 116.627 14.0182 117.274 13.43 117.525C11.4022 118.38 9.08799 117.245 8.70874 115.198C8.46881 113.912 9.23504 112.547 10.5276 111.957C11.3789 111.569 12.5631 111.555 13.399 111.921ZM67.3524 111.965C67.9716 112.245 68.6449 112.884 68.9081 113.43C70.1774 116.096 67.2518 118.725 64.3958 117.489C63.1343 116.951 62.3526 115.55 62.577 114.271C62.9485 112.209 65.3478 111.045 67.3524 111.965Z"
                    fill="white"
                  />
                  <path
                    d="M11.2396 113.272C10.7752 113.481 10.5663 113.682 10.3573 114.113C9.73039 115.392 11.0229 116.771 12.478 116.383C13.2906 116.16 13.7782 115.564 13.7782 114.795C13.786 113.854 13.1126 113.193 12.091 113.129C11.7117 113.107 11.5569 113.129 11.2396 113.272Z"
                    fill="white"
                  />
                  <path
                    d="M65.2937 113.207C64.8603 113.351 64.5507 113.588 64.3185 113.955C64.1328 114.235 64.1018 114.371 64.1018 114.795C64.1095 115.356 64.2102 115.607 64.6126 115.966C64.9841 116.297 65.3479 116.441 65.8819 116.433C66.4547 116.433 66.8726 116.254 67.2596 115.83C68.4206 114.573 66.981 112.647 65.2937 113.207Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>

            <div className="mr-12 mt-4">
              <button type="button" onClick={toggleBurger}>
                <Hamburger color="red" size="48" />
              </button>
            </div>
          </div>
        )}
      </div>
      {loginStatus ? (
        <div className="flex justify-center">
          {loginStatus.admin === 'true' ? (
            <AdminMenu statusBurger={statusBurger} toggleBurger={toggleBurger} />
          ) : (
            <VendorMenu statusBurger={statusBurger} toggleBurger={toggleBurger} />
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Nav;