'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { BASE_API_URL } from '@/app/utils/contact';
const CarModels = [
  "SAIL",
  "OPTRA",
  "Modelo C",
  "Modelo D"
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    modeloCarro: '',
    asesorComercial: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { nombre, apellido, email, telefono, direccion, modeloCarro, asesorComercial } = formData;
  
    if (!nombre || !apellido || !email || !telefono || !modeloCarro || !asesorComercial) {
      alert("Completar todos los espacios");
      return;
    }
    
    try {
      const res = await fetch(`${BASE_API_URL}/api/topics`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData) 
      });
  
      if (res.ok) {
        document.getElementById('redirectLink').click();
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registro de Cliente</h2>

        <label className="block mb-2">Nombre:</label>
        <input
          onChange={handleChange}
          type="text"
          name="nombre"
          value={formData.nombre}
          className="mb-4 p-2 border rounded w-full"
        />

        <label className="block mb-2">Apellido:</label>
        <input
          onChange={handleChange}
          type="text"
          name="apellido"
          value={formData.apellido}
          className="mb-4 p-2 border rounded w-full"
        />

        <label className="block mb-2">Email:</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
          className="mb-4 p-2 border rounded w-full"
        />

        <label className="block mb-2">Teléfono:</label>
        <input
          onChange={handleChange}
          type="tel"
          name="telefono"
          value={formData.telefono}
          className="mb-4 p-2 border rounded w-full"
        />

        <label className="block mb-2">Dirección:</label>
        <input
          onChange={handleChange}
          type="text"
          name="direccion"
          value={formData.direccion}
          className="mb-4 p-2 border rounded w-full"
        />

        <label className="block mb-2">Modelo de Carro:</label>
        <select
          onChange={handleChange}
          name="modeloCarro"
          value={formData.modeloCarro}
          className="mb-4 p-2 border rounded w-full"
        >
          {CarModels.map((modelo, index) => (
            <option key={index} value={modelo}>
              {modelo}
            </option>
          ))}
        </select>

        <label className="block mb-2">Asesor Comercial:</label>
        <input
          onChange={handleChange}
          type="text"
          name="asesorComercial"
          value={formData.asesorComercial}
          className="mb-4 p-2 border rounded w-full"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
        <Link href="/views/farewell" id="redirectLink"></Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
