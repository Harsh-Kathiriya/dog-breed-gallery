import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBar = ({ onFilterChange }) => {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  // Fetching breed list from Dog API using axios.
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        setBreeds(Object.keys(response.data.message));
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  // Handles breed selection input
  const handleBreedChange = (breed) => {
    const updatedSelection = selectedBreeds.includes(breed)
      ? selectedBreeds.filter((b) => b !== breed)
      : [...selectedBreeds, breed];
    setSelectedBreeds(updatedSelection);
    onFilterChange(updatedSelection);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter breeds based on search term
  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a breed..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap space-x-4">
        {filteredBreeds.map((breed) => (
          <div key={breed} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value={breed}
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleBreedChange(breed)}
                className="form-checkbox h-5 w-5 text-blue-500 focus:ring-0"
              />
              <span className="ml-2 text-gray-700">{breed}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
