import { useState } from 'react';
import Select from 'react-select';

const FilterPanel = ({ onFilterChange }) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

  const neighborhoods = [
    { value: 'Downtown', label: 'Downtown' },
    { value: 'West End', label: 'West End' },
    // Add more based on your GeoJSON
  ];

  const handleChange = (option) => {
    setSelectedNeighborhood(option);
    if (onFilterChange) onFilterChange(option ? option.value : null);
  };

  return (
    <div className="filter-panel">
      <label>Filter by Neighborhood: </label>
      <Select
        options={neighborhoods}
        value={selectedNeighborhood}
        onChange={handleChange}
        isClearable
        placeholder="Select a neighborhood..."
      />
    </div>
  );
};

export default FilterPanel;