'use client';

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/api"; // Asegúrate de que el archivo `api` contenga una función para obtener un usuario por ID.
import { User } from "@/types";
import Loading from "../../loading"

export default function UserDetails() {
  const { id } = useParams(); // Obtén el ID desde la URL
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        className="px-4 py-2 bg-sky-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:ring focus:ring-sky-800 mb-5"
      >
        Go Back
      </button>
      <h1 className="text-2xl font-bold text-gray-300">User: {user.id}</h1>
      <a href=""></a>
      <div className="text-xl text-gray-300 rounded-md border-4 border-gray-600 p-4">
        <p className="bg-gray-700 p-1">Name</p>
        <p className="bg-gray-800 text-gray-100 p-1"> {user.name}</p>
        <p className="bg-gray-700 p-1">Email</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.email}</p>
        <p className="bg-gray-700 p-1">Genre</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.gender}</p>
        <p className="bg-gray-700 p-1">Status</p>
        <p className="bg-gray-800 text-gray-100 p-1">{user.status}</p>
      </div>
    </div> 
  );
}