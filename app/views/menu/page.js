import Link from 'next/link';
import React from 'react';

const Grid = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="relative">
            <img src={`/images/${index + 1}.png`} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
              <Link href={`/verCarro/${index + 1}`} legacyBehavior>
                <a className="bg-white text-black mx-1 px-2 py-1 rounded">Ver Carro</a>
              </Link>
              <Link href={`/views/form`} legacyBehavior>
                <a className="bg-white text-black mx-1 px-2 py-1 rounded">Cotizar</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
