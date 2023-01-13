import React from 'react';

import { CITY_LIST } from '@/config';

type CitySelectParam = {
  city: string;
  handleCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
//
const CitySelect = ({ city, handleCityChange }: CitySelectParam) => {
  return (
    <select
      className="select"
      value={city}
      name=""
      id=""
      onChange={handleCityChange}
    >
      <option value="">全台</option>
      {CITY_LIST.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
