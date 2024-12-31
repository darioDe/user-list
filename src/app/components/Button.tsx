'use client';

import { useState  } from "react";
import Modal from "./Modal";
import { ButtonProps } from "@/types";

export default function Button ({ onAddUser }: ButtonProps) {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button 
        className="px-4 py-2 bg-sky-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-800 "
        onClick={() => setOpenModal((prevState) => !prevState)}  
      >
          Nuevo usuario
      </button>
      {openModal && 
        <Modal 
          onClose={() => setOpenModal(false)}
          onAddUser={ onAddUser }
        />
      }
    </>
  )
};