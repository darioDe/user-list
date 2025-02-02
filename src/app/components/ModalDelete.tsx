import { useState, useEffect } from 'react';
import { ModalDeleteProps } from '@/types';

export default function ModalDelete({handleDelete, name, id, setSelectedUser}: ModalDeleteProps){
  const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(true);
    }, []);

  return (
    <div className=" text-gray-300 fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
      <div className={`${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        } transform transition-opacity duration-1000 ease-in-out bg-gray-800 rounded-md border-gray-600 border-4 w-[50vw] h-[auto] p-4`}>
        <p>Are you sure you want to delete the user <span className='text-gray-100 font-extrabold'>{name}</span>?</p>
        
        <div className='flex justify-end mt-6 space-x-2'>
          <button 
            onClick={() => setSelectedUser(null)}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-900 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-800 "
          >
            Cancel
          </button>
          <button 
            onClick={() => handleDelete(id)}
            className="px-4 py-2 bg-sky-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}