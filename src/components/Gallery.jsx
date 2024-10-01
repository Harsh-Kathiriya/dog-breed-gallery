import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Gallery = ({ selectedBreeds }) => {
  const [imagesByBreed, setImagesByBreed] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image for the modal

  // fetch images based on selected breeds
  const fetchImages = async (breedsToFetch) => {
    const newBreeds = breedsToFetch.filter(breed => !imagesByBreed[breed] || imagesByBreed[breed].length === 0);

    if (newBreeds.length === 0) {
      return; // all selected breeds already have images loaded
    }

    try {
      const breedImagesPromises = newBreeds.map((breed) =>
        axios.get(`https://dog.ceo/api/breed/${breed}/images/random/4`)
      );
      const responses = await Promise.all(breedImagesPromises);

      const newImagesByBreed = {};
      responses.forEach((response, index) => {
        newImagesByBreed[newBreeds[index]] = response.data.message; // store images by breed
      });

      setImagesByBreed((prevImages) => ({
        ...prevImages,
        ...newImagesByBreed,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // call fetchImages on mount and when selectedBreeds and iamgesByBreed changes
  useEffect(() => {
    fetchImages(selectedBreeds);
  }, [selectedBreeds, imagesByBreed]);

  // remove images for unselected breeds
  useEffect(() => {
    const updatedImages = Object.keys(imagesByBreed).reduce((arr, breed) => {
      if (selectedBreeds.includes(breed)) {
        arr[breed] = imagesByBreed[breed]; // keep images for selected breeds
      }
      return arr;
    }, {});

    setImagesByBreed(updatedImages);
  }, [selectedBreeds]);

  // refresh images for a specific breed
  const handleRefresh = (breed) => {
    setImagesByBreed((prevImages) => ({
      ...prevImages,
      [breed]: [], // clear images 
    }));
  };

  // handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image); 
  };

  // close modal
  const closeModal = () => {
    setSelectedImage(null); 
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-semibold mb-4">Gallery</h2>
      {Object.keys(imagesByBreed).length === 0 ? (
        <p className="text-gray-500">No images to display. Please select a breed.</p>
      ) : (
        Object.keys(imagesByBreed).map((breed) => (
          <div key={breed} className="mb-8">
            <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
              {breed}
              <button
                onClick={() => handleRefresh(breed)}
                className="ml-4 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-800 transition duration-200"
              >
                Refresh
              </button>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagesByBreed[breed].map((image, index) => (
                <div key={index} className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image}
                    alt={`Dog ${index} of breed ${breed}`}
                    className="object-cover w-full h-full cursor-pointer" 
                    onClick={() => handleImageClick(image)} 
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      <Modal image={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default Gallery;
