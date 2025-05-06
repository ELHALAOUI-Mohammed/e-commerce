import axiosClient from '@/api/axiosClient';
import { useEffect, useState } from 'react';

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axiosClient.get('/orders/1') // Replace `1` with actual user ID or admin endpoint
            .then(response => setOrders(response.data));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{order.id}</td>
                            <td className="py-2 px-4 border-b">{order.status}</td>
                            <td className="py-2 px-4 border-b">{order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
