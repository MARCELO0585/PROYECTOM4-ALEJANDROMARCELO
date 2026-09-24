import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Gestor de Tareas <span className="text-blue-600">MateCode</span></h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button 
          onClick={logout}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};
