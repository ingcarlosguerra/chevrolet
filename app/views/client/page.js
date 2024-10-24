"use client";
import React, { useState, useEffect } from 'react';
import { BASE_API_URL } from '@/app/utils/contact';

const getUsers = async (asesorComercial, fecha) => {
  try {
    let url = `${BASE_API_URL}/api/topics`;

    if (asesorComercial && fecha) {
      url += `?asesorComercial=${asesorComercial}&fecha=${fecha}`;
    }

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch Users From Database');
    }
    return res.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const Client = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [asesorComercial, setAsesorComercial] = useState('');
  const [fecha, setFecha] = useState('');
  const [consultaTipo, setConsultaTipo] = useState('todos');

  const handleSearch = async () => {
    setLoading(true);
    let data;

    if (consultaTipo === 'todos') {
      data = await getUsers();
    } else {
      data = await getUsers(asesorComercial, fecha);
    }

    if (data && data.topics) {
      setUsers(data.topics);
      setError(null);
    } else {
      setError('No se pudieron obtener los usuarios.');
      setUsers([]);
    }
    setLoading(false);
  };

  const downloadCSV = () => {
    const headers = ["Nombre", "Apellido", "Email", "Teléfono", "Dirección", "Carro"];
    const rows = users.map(user => [user.nombre, user.apellido, user.email, user.telefono, user.direccion, user.modeloCarro]);

    let csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${asesorComercial}:${fecha}`);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold text-gray-700">Cargando datos...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Selección de tipo de consulta */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">
          Tipo de consulta:
          <select
            value={consultaTipo}
            onChange={(e) => setConsultaTipo(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            <option value="todos">Consultar todos los datos</option>
            <option value="asesor">Consultar por asesor y Día</option>
          </select>
        </label>
      </div>

      {/* Mostrar los campos de búsqueda solo si se selecciona "asesor y fecha" */}
      {consultaTipo === 'asesor' && (
        <div className="grid gap-6 mb-6 sm:grid-cols-2">
          <div>
            <label className="block text-gray-700 font-medium">
              Consultar por número de asesor:
              <input
                type="text"
                value={asesorComercial}
                onChange={(e) => setAsesorComercial(e.target.value)}
                placeholder="Número de asesor"
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Fecha:
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
              />
            </label>
          </div>
        </div>
      )}

      <button
        onClick={handleSearch}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Consultar
      </button>

      {/* Botón para descargar CSV */}
      {users.length > 0 && (
        <button
          onClick={downloadCSV}
          className="mb-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Descargar CSV
        </button>
      )}

      {/* Tabla de resultados */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-700">No se encontraron usuarios.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 border">Nombre</th>
                <th className="py-3 px-4 border">Apellido</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Teléfono</th>
                <th className="py-3 px-4 border">Dirección</th>
                <th className="py-3 px-4 border">Carro</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <td className="py-3 px-4 border">{user.nombre}</td>
                  <td className="py-3 px-4 border">{user.apellido}</td>
                  <td className="py-3 px-4 border">{user.email}</td>
                  <td className="py-3 px-4 border">{user.telefono}</td>
                  <td className="py-3 px-4 border">{user.direccion}</td>
                  <td className="py-3 px-4 border">{user.modeloCarro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Client;
