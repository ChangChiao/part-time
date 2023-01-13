type CitySelectParam = {
  sortType: string;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
const sortList = [
  { label: '時間新到舊', value: 'expire_desc' },
  { label: '時間舊到新', value: 'expire_asc' },
  { label: '報酬由高至低', value: 'reward_desc' },
  { label: '報酬由低至高', value: 'reward_asc' },
];
const SortSelect = ({ sortType, handleSortChange }: CitySelectParam) => {
  return (
    <select
      className="select"
      value={sortType}
      name=""
      id=""
      onChange={handleSortChange}
    >
      {sortList.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SortSelect;
