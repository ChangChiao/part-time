import React, { useMemo } from 'react';

import { FaMapMarkerAlt } from 'react-icons/fa';

import { CITY_LIST } from '@/config';

const City = ({ city }: { city: string }) => {
  const cityName = useMemo(() => {
    const target = CITY_LIST.find((item) => item.value === city);
    return target?.label;
  }, [city]);
  return (
    <>
      <FaMapMarkerAlt className="text-red-500" />
      <span className="pl-1">{cityName}</span>
    </>
  );
};

export default City;
