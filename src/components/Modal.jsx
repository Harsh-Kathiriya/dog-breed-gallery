// Modal.js
import React from 'react';

const Modal = ({ image, onClose }) => {
  if (!image) return null; // Don't render anything if there's no image

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4">
        <img src={image} alt="Large view" className="max-w-full max-h-[90vh]" />
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;