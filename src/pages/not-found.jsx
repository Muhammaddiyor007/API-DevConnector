import React from 'react';
import NotFoundImage from '../assets/NotFound.jpg';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={NotFoundImage} alt="Page Not Found" className="max-w-md w-full rounded-lg " />
    </div>
  );
};

export default NotFound;
