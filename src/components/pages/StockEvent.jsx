import { useState } from 'react';
import SearchBar from '../commons/atoms/SearchBar';
import Filter from '../commons/organisms/Filter';
import ItemsList from '../commons/organisms/ItemsList';
import MainLayout from '../layout/MainLayout';

function StockEvent() {
  // eslint-disable-next-line no-unused-vars
  const [filterType, setFilterType] = useState('Tous');
  // eslint-disable-next-line no-unused-vars
  const [filterSize, setFilterSize] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [filterSexe, setFilterSexe] = useState('');

  const changeType = (e) => {
    setFilterType(e.target.value);
  };
  const changeSize = (e) => {
    setFilterSize(e.target.value);
  };
  const changeSexe = (e) => {
    setFilterSexe(e.target.value);
  };
  return (
    <div>
      <MainLayout>
        <div className="bg-black h-full">
          <h1 className="text-white text-4xl">ARTICLES EVENEMENT</h1>
          <div className="flex justify-around flex-wrap mt-8">
            <SearchBar event={true} />
          </div>
          <div className="flex justify-around flex-wrap-reverse">
            <ItemsList event={true} Type={filterType} Sexe={filterSexe} Size={filterSize} />
            <Filter
              changeSexe={changeSexe}
              changeSize={changeSize}
              changeType={changeType}
              filterType={filterType}
            />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default StockEvent;
