'use client';

import { useState, useEffect } from 'react';
import { User, NewUser } from '@/types';

interface EditModalProps {
  user: User;
  onClose: () => void;
  onEditUser: (editedUser: Partial<NewUser>) => void;
}

export default function EditModal({ user, onClose, onEditUser }: EditModalProps) {
  // Estado para manejar la animación de aparición del modal
  const [isVisible, setIsVisible] = useState(false);
  // Estado para almacenar los cambios en los datos del usuario, iniciando con los valores actuales
  const [editedUser, setEditedUser] = useState<Partial<NewUser>>({
    name: user.name,
    email: user.email,
    gender: user.gender,
    status: user.status
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Maneja los cambios en los inputs y actualiza el estado
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario para actualizar el usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEditUser(editedUser);
    onClose();
  };

  return (
    <div className="text-gray-300 fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div
        className={`${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        } transform transition-opacity duration-1000 ease-in-out bg-gray-800 rounded-md border-gray-600 border-4 w-[50vw] h-[auto]`}
      >
        <h1 className="text-xl font-semibold m-4">Editar Usuario</h1>
        <form className="flex flex-col m-3" onSubmit={handleSubmit}>
          <div className="my-2">
            <label htmlFor="name">Nombre</label>
            <input
              onChange={handleInputChange}
              className="bg-gray-500 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="name"
              id="name"
              value={editedUser.name || ''}
            />
          </div>

          <div className="my-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleInputChange}
              className="bg-gray-500 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="email"
              id="email"
              value={editedUser.email || ''}
            />
          </div>

          <div className="my-2">
            <label htmlFor="gender">Género</label>
            <select
              onChange={handleInputChange}
              name="gender"
              id="gender"
              value={editedUser.gender || ''}
              className="bg-gray-500 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>

          <div className="my-2">
            <label htmlFor="status">Estatus</label>
            <select
              onChange={handleInputChange}
              name="status"
              id="status"
              value={editedUser.status || ''}
              className="bg-gray-500 w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-900 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-800"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-sky-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
