import { useCallback } from 'react';

import { FiSearch } from 'react-icons/fi';

import { debounce } from '@/utils';

import CitySelect from './atoms/CitySelect';
import SortSelect from './atoms/SortSelect';

type SearchBarProps = {
  searchText: string;
  setSearchText: (param: string) => void;
  city: string;
  setCity: (param: string) => void;
  sortType: string;
  setSortType: (param: string) => void;
  queryCardList: (param?: string) => void;
};

const SearchBar = ({
  searchText,
  setSearchText,
  city,
  setCity,
  sortType,
  setSortType,
  queryCardList,
}: SearchBarProps) => {
  // const [searchText, setSearchText] = useState<string>('');
  // const [city, setCity] = useState<string>('');
  // const [sortType, setSortType] = useState<string>('');

  const handleKeyword = useCallback(
    debounce((newValue) => queryCardList(newValue), 800),
    [queryCardList]
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setSearchText(newValue);
    if (newValue?.length === 0) return;
    handleKeyword(newValue);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queryCardList();
  };

  return (
    <form
      className="w-[95%] md:w-[800px] md:flex items-center md:justify-center mx-auto my-8 overflow-hidden md:rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between mb-4 md:mb-0">
        <SortSelect handleSortChange={handleSortChange} sortType={sortType} />
        <CitySelect handleCityChange={handleCityChange} city={city} />
      </div>
      <div className="relative w-full overflow-hidden rounded-md">
        <input
          type="search"
          value={searchText}
          onChange={handleChange}
          id="search-dropdown"
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="請輸入關鍵字"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-3.5 text-sm font-medium text-white border rounded-r-lg bg-cyan-700 border-cyan-700 hover:bg-cyan-900 focus:ring-4 focus:outline-none "
        >
          <FiSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
