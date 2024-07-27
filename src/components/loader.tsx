import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import "../../src/index.css";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <FaSpinner className="animate-spin text-primary text-4xl" />
    </div>
  );
};

export default Loader;
