'use client';

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/api"; // Asegúrate de que el archivo `api` contenga las funciones necesarias.
import { User, NewUser } from "@/types";
import Loading from "../../loading";
import EditModal from "@/app/components/EditModal";

export default function UserDetails() {
  const { id } = useParams(); // Obtén el ID desde la URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Función para obtener los detalles del usuario
    const fetchUserDetails = async () => {
      try {
        const userData = await api.getUser(Number(id)); // Llama a la API para obtener el usuario
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Función para editar el usuario
  const handleEditUser = async (editedUser: Partial<NewUser>) => {
    if (!user) return;
    try {
      setLoading(true);
      const updatedUser = await api.editUser(user.id, editedUser);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Error editing user:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="fade-in">
      <button 
        onClick={() => router.back()} 
        className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-700 mb-5"
      >
        Go Back
      </button>
      <button
        className="px-4 py-2 bg-sky-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-800 mx-2"
        onClick={() => setOpenModal((prevState) => !prevState)} 
      >
        Edit
      </button>

      <h1 className="text-2xl font-bold text-gray-300">User: {user.id}</h1>
      <div className="text-xl text-gray-300 rounded-md border-4 border-gray-600 p-4">
        <p className="bg-gray-700 p-1">Name</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.name}</p>
        <p className="bg-gray-700 p-1">Email</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.email}</p>
        <p className="bg-gray-700 p-1">Genre</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.gender}</p>
        <p className="bg-gray-700 p-1">Status</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.status}</p>
      </div>

      {openModal && 
        <EditModal
          user={user}
          onClose={() => setOpenModal(false)}
          onEditUser={handleEditUser}
        />
      }
    </div> 
  );
}
