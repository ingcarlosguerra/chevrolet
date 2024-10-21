'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const CarModels = [
  "Modelo A",
  "Modelo B",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica que todos los campos estén completos
    const allFieldsFilled = Object.values(formData).every(field => field !== '');

    if (allFieldsFilled) {
      console.log(formData);
      // Redirige a la vista de despedida si todos los campos están completos
      document.getElementById('redirectLink').click();
    } else {
      alert('Por favor completa todos los campos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registro de Cliente</h2>

        <label className="block mb-2">Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="mb-4 p-2 border rounded w-full" />

        <label className="block mb-2">Apellido:</label>
        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="mb-4 p-2 border rounded w-full" />

        <label className="block mb-2">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="mb-4 p-2 border rounded w-full" />

        <label className="block mb-2">Teléfono:</label>
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="mb-4 p-2 border rounded w-full" />

        <label className="block mb-2">Dirección:</label>
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="mb-4 p-2 border rounded w-full" />

        <label className="block mb-2">Modelo de Carro:</label>
        <select name="modeloCarro" value={formData.modeloCarro} onChange={handleChange} className="mb-4 p-2 border rounded w-full">
          {CarModels.map((modelo, index) => (
            <option key={index} value={modelo}>{modelo}</option>
          ))}
        </select>

        <label className="block mb-2">Asesor Comercial:</label>
        <input type="text" name="asesorComercial" value={formData.asesorComercial} onChange={handleChange} className="mb-4 p-2 border rounded w-full" />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
        <Link href="/views/farewell" id="redirectLink"></Link>
      </form>
    </div>
  );
};

export default RegistrationForm;
