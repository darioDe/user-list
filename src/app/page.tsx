'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api";
import { NewUser, User } from '../types';
import Loading from "./loading";
import Button from "./components/Button";

export default function Home() {
  // State to the list of users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetches the list of users from the API
  const fetchUsers = async () => {
    const data = await api.list();
    setUsers(data);
    setLoading(false);
  };

  // Handles adding a new user
  const handleAddUser = async (newUser: NewUser) => {
    try {
      setLoading(true);
      console.log(newUser);
      const createdUser = await api.create(newUser);
  
      if (createdUser) {
        console.log("Usuario creado:", createdUser);
        await fetchUsers(); // Refresh user list
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handles deleting a user
  const handleDelete = async (userId: number): Promise<void> => {
    try {
      setLoading(true);
      const isDeleted = await api.delete(userId);

      if (isDeleted) {
        console.log('eliminado');
        await fetchUsers(); // Refresh user list
      } else {
        console.log('no se elimino');
      }
    } catch (error) {
      console.error('error al eliminar', error);
    } finally {
      setLoading(false)
    }
  }

  // Navigates to the user's detail page
  const handleViewDetails = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  };

  if (!users || users.length === 0) {
    return (
      <section>
        <p>Error fetching data. Please try later</p>
      </section>
    );
  };

  return (
    <div>
      <div className="mb-5">
        <Button onAddUser={handleAddUser}/>
      </div>
      
      <div className="fade-in rounded-md border-4 border-gray-600 p-4">
          <table className="w-full text-center">
              <thead>
                  <tr>
                      <th className="text-gray-300">Id</th>
                      <th className="text-gray-300">Nombre</th>
                      <th className="text-gray-300 hidden sm:table-cell">Email</th>
                      <th className="text-gray-300 hidden lg:table-cell">Género</th>
                      <th className="text-gray-300 hidden lg:table-cell">Estatus</th>
                      <th className="text-gray-300">Acciones</th>
                  </tr>
              </thead>

              <tbody>
                  {/* Maping the users data  */}
                  {users.map((users) => (
                      <tr 
                        key={users.id} 
                        className="even:bg-gray-700 odd:bg-gray-800 hover:bg-black"
                      >
                          <td className="text-gray-100 py-2">{users.id}</td>
                          <td className="text-gray-100">{users.name}</td>
                          <td className="text-gray-100 hidden sm:table-cell">{users.email}</td>
                          <td className="text-gray-100 hidden lg:table-cell">{users.gender}</td>
                          <td className="text-gray-100 hidden lg:table-cell">{users.status}</td>
                          <td className="text-gray-100 flex flex-col">
                            <a 
                              className='underline text-gray-400 hover:text-gray-600 font-bold' 
                              onClick={() => handleViewDetails(users.id)}
                              >Ver</a>
                            <a 
                              className='underline text-gray-400 hover:text-gray-600 font-bold'
                              onClick={() => handleDelete(users.id)}
                            >
                              Eliminar
                            </a>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
}
