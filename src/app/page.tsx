import api from "@/api";
import Users from '../types';

export default async function Home() {

  // Getting users
  const users: Users[]  = await api.list();

  if (!users) {
    return (
      <section>
        <p>Error fetching data. Please try later</p>
      </section>
    );
  };

  return (
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
                          <a className='underline text-gray-400 hover:text-gray-600 font-bold' href="">Ver</a>
                          <a className='underline text-gray-400 hover:text-gray-600 font-bold' href="">Eliminar</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}
