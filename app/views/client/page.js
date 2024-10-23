'use client';

import React from 'react';
import Link from 'next/link';

const Client = () => {
  const handleClick = () => {
    document.getElementById('redirectLink').click();
  };

  return (
    <div onClick={handleClick} className="flex items-center justify-center min-h-screen bg-gray-100 cursor-pointer">
      <h1 className="text-4xl font-bold text-blue-500">¡Bienvenido, Cliente!</h1>

    </div>
  );
};

export default Client;
