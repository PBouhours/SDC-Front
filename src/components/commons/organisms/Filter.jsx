/* eslint-disable react/prop-types */
import Select from '../atoms/Select';

function Filter({ changeSexe, changeSize, changeType, filterType }) {
  const gender = ['', 'Homme', 'Femme', 'Enfant', 'Unisexe'];
  const size = [
    '',
    '2XS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
    '4XL',
    'bébé',
    '24-36 mois',
    '3/4 ans',
    '5/6 ans',
    '7/8 ans',
    '9/11 ans',
    '12/14 ans'
  ];
  const type = ['Tous', 'vêtement', 'goodies'];

  return (
    <div className="flex flex-col flex-wrap w-999">
      <h1 className="text-white text-3xl mt-20">Filtrer par:</h1>
      <Select title="Type" tab={type} onChange={changeType} />
      {filterType === 'vêtement' ? (
        <div className="flex justify-around">
          <Select title="Taille" tab={size} onChange={changeSize} />
          <Select title="Sexe" tab={gender} onChange={changeSexe} />{' '}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Filter;
