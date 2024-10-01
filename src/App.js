import { useState } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import Gallery from './components/Gallery';


const App = () => {
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  return (
    <div>
      <Navbar />
      <FilterBar onFilterChange={setSelectedBreeds} />
      <Gallery selectedBreeds={selectedBreeds} />
    </div>
  );
};

export default App;

