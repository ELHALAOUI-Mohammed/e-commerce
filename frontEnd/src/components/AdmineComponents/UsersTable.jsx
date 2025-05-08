import axiosClient from '@/api/axiosClient';
import { useEffect, useState } from 'react';

export default function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosClient.get('/users').then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">User Management</h2>
    {/* Add user button could go here if needed */}
  </div>

  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            {/* Add action column if needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                  {user.email}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                <div className="line-clamp-1" title={user.address}>
                  {user.address}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.phone ? (
                  <a href={`tel:${user.phone}`} className="hover:text-blue-600 hover:underline">
                    {user.phone}
                  </a>
                ) : (
                  <span className="text-gray-400">Not provided</span>
                )}
              </td>
              {/* Add action buttons if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
    );
}
