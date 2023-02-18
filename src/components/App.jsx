import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export const App = () => {
  const [searchName, setSearchName] = useState('');

  const handleFormSubmit = searchName => {
    setSearchName(searchName);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchName={searchName} />
    </div>
  );
};
