"use client";

import React, { useState, useEffect } from 'react';

const getUsers = async (asesorComercial, fecha) => {
  try {
    let url = 'http://localhost:3000/api/topics';
    
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
  const [consultaTipo, setConsultaTipo] = useState('todos'); // Estado para el tipo de consulta

  const handleSearch = async () => {
    setLoading(true);
    let data;
    
    if (consultaTipo === 'todos') {
      data = await getUsers(); // Consulta todos los datos si seleccionó "todos"
    } else {
      data = await getUsers(asesorComercial, fecha); // Consulta por asesor y fecha
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
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      {/* Selección de tipo de consulta */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Tipo de consulta:
          <select
            value={consultaTipo}
            onChange={(e) => setConsultaTipo(e.target.value)}
            style={{ margin: '0 10px', padding: '5px' }}
          >
            <option value="todos">Consultar todos los datos</option>
            <option value="asesor">Consultar por asesor y Dia</option>
          </select>
        </label>
      </div>

      {/* Mostrar los campos de búsqueda solo si se selecciona "asesor y fecha" */}
      {consultaTipo === 'asesor' && (
        <div style={{ marginBottom: '20px' }}>
          <label>
            Consultar por número de asesor:
            <input
              type="text"
              value={asesorComercial}
              onChange={(e) => setAsesorComercial(e.target.value)}
              placeholder="Número de asesor"
              style={{ margin: '0 10px', padding: '5px' }}
            />
          </label>
          <label>
            Fecha:
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={{ margin: '0 10px', padding: '5px' }}
            />
          </label>
        </div>
      )}

      <button onClick={handleSearch} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Consultar
      </button>

      {/* Botón para descargar CSV */}
      {users.length > 0 && (
        <button onClick={downloadCSV} style={{ marginBottom: '20px', padding: '5px 10px', cursor: 'pointer', border: 'blue' }}>
          Descargar CSV
        </button>
      )}

      {/* Tabla de resultados */}
      {error ? (
        <p>{error}</p>
      ) : users.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Apellido</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Teléfono</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Dirección</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Carro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.nombre}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.apellido}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.telefono}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.direccion}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.modeloCarro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Client;
