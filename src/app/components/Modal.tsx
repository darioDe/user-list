import { useState, useEffect } from 'react'
import { ButtonProps, ModalProps, NewUser } from '../../types'

export default function Modal ({ onClose, onAddUser }: ModalProps) {
  // State to manage the modal's visibility animation
  const [isVisible, setIsVisible] = useState(false);
    // State to store the new user data
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
  });
  
  // Trigger the modal's fade-in effect on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handles input changes and updates the newUser state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value } = e.target;
    setNewUser((prev) => ({...prev, [name]: value}));
  };

  // Handles form submission and passes the new user data to the parent
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newUser) {
      onAddUser(newUser); // Add the new user
      onClose(); // Close the modal
    } else {
      console.error('Failed to create user');
    }
  };

  return (
    <div className=" text-gray-300 fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div
        className={`${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        } transform transition-opacity duration-1000 ease-in-out bg-gray-800 rounded-md border-gray-600 border-4 w-[50vw] h-[auto]`}
      >
        <h1 className='text-xl font-semibold m-4'>Crear Usuario</h1>
          <form 
            className='flex flex-col m-3'
            onSubmit={handleSubmit}
          >
            <div className='my-2'>
              <label htmlFor="name">Nombre</label>
              <input 
                onChange={handleInputChange}
                className="bg-gray-500 w-full px-4 py-2  rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                type="text" 
                name="name" 
                id="name" 
                value={newUser.name} 
              />
            </div>

            <label htmlFor="email">Email</label>
            <input 
              onChange={handleInputChange}
              className="bg-gray-500 w-full px-4 py-2  rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              type="text" 
              name="email" 
              id="email" 
              value={newUser.email} 
            />

            <label htmlFor="gender">Género</label>
            <select
              onChange={handleInputChange}
              name="gender" 
              id="gender"
              value={newUser.gender}
              className="bg-gray-500 w-full px-4 py-2  rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>

            <div className='flex justify-end mt-6 space-x-2'>
              <button 
                className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-900 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-800 "
                onClick={onClose}
              >
                Cancelar
              </button>

              <button
                type='submit'
                className="px-4 py-2 bg-sky-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-800"
              >
                Guardar
              </button>

            </div>

          </form>
      </div>
    </div>
  )
}