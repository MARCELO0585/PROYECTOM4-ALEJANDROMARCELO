import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuth } from '../context/AuthContext';

interface TaskFormProps {
  onTaskAdded: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;

    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        description,
        completed: false,
        userId: user.uid,
        createdAt: new Date()
      });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Nueva Tarea</h2>
      <div>
        <input 
          type="text" 
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div>
        <textarea 
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Guardar Tarea
      </button>
    </form>
  );
};
