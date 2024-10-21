'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

const Farewell = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('redirectLink').click();
    }, 5000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">¡Gracias por participar!</h1>
      <Link href="/views/welcome" id="redirectLink"></Link>
    </div>
  );
};

export default Farewell;
