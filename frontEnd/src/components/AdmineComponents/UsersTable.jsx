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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{user.id}</td>
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.address}</td>
                            <td className="py-2 px-4 border-b">{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
