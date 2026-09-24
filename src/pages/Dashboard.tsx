import React, { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs, updateDoc, deleteDoc, doc, type DocumentData } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useAuth } from '../context/AuthContext';
import type { Task } from '../types/Task';
import { Navbar } from '../components/Navbar';
import { TaskForm } from '../components/TaskForm';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const tasksData: Task[] = querySnapshot.docs.map((document: DocumentData) => ({
        id: document.id,
        ...document.data()
      })) as Task[];
      setTasks(tasksData);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { completed: !currentStatus });
      fetchTasks();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      fetchTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const sendEmailSummary = async () => {
    if (!user || tasks.length === 0) {
      setEmailMessage('No hay tareas para enviar.');
      return;
    }

    setSendingEmail(true);
    setEmailMessage('');

    const tasksSummary = tasks
      .map(t => `- [${t.completed ? 'X' : ' '}] ${t.title}: ${t.description || 'Sin descripción'}`)
      .join('\n');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          tasksSummary,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmailMessage('¡Correo enviado con éxito!');
      } else {
        setEmailMessage(`Error: ${data.error || 'No se pudo enviar'}`);
      }
    } catch (error) {
      console.error(error);
      setEmailMessage('Error de conexión al enviar correo.');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Sección de Resumen y Botón de Email */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Panel de Control</h2>
            <p className="text-sm text-gray-500">Total de tareas: {tasks.length}</p>
          </div>
          <button
            onClick={sendEmailSummary}
            disabled={sendingEmail || tasks.length === 0}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {sendingEmail ? 'Enviando...' : 'Enviar Resumen por Email'}
          </button>
        </div>
        {emailMessage && <p className="mb-4 text-sm font-medium text-center text-blue-600">{emailMessage}</p>}

        <TaskForm onTaskAdded={fetchTasks} />
        
        <h2 className="text-xl font-bold text-gray-800 mb-4">Tus Tareas</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm">No tienes tareas registradas.</p>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className={`font-semibold text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </h3>
                  {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => task.id && toggleComplete(task.id, task.completed)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${task.completed ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                  >
                    {task.completed ? 'Marcar pendiente' : 'Completar'}
                  </button>
                  <button 
                    onClick={() => task.id && deleteTask(task.id)}
                    className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
