import axiosClient from '@/api/axiosClient';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosClient.get('/users').then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
  <div className="flex justify-center w-full px-4">
    <div className="container flex flex-col justify-center w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
    {/* Header Section */}
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Gestion des utilisateurs</h2>
        <p className="text-sm text-muted-foreground mt-1">Gérer les utilisateurs du système</p>
        </div>
      </div>
      {/* Add user button could go here if needed */}
      </div>
    </div>

    {/* Table Section */}
    <div className="rounded-md border shadow-sm overflow-x-auto">
      <Table className="min-w-[800px] sm:min-w-full">
      <TableHeader>
        <TableRow>
        <TableHead className="w-[80px]">ID</TableHead>
        <TableHead>Nom</TableHead>
        <TableHead>Email</TableHead>
        <TableHead className="hidden md:table-cell">Adresse</TableHead>
        <TableHead>Téléphone</TableHead>
        {/* Add action column if needed */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
        <TableRow key={user.id} className="hover:bg-muted/50">
          <TableCell className="font-mono text-muted-foreground">
          {user.id}
          </TableCell>
          <TableCell>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
            </div>
            <div className="font-medium">{user.name}</div>
          </div>
          </TableCell>
          <TableCell>
          <a 
            href={`mailto:${user.email}`} 
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {user.email}
          </a>
          </TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground max-w-[200px] truncate">
          {user.address}
          </TableCell>
          <TableCell className="text-muted-foreground">
          {user.phone ? (
            <a 
            href={`tel:${user.phone}`} 
            className="text-blue-600 hover:text-blue-800 hover:underline"
            >
            {user.phone}
            </a>
          ) : (
            <span className="text-muted-foreground">Non renseigné</span>
          )}
          </TableCell>
          {/* Add action buttons if needed */}
        </TableRow>
        ))}
      </TableBody>
      </Table>
    </div>

    {/* Optional: Pagination */}
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" size="sm" disabled>
      Précédent
      </Button>
      <Button variant="outline" size="sm">
      Suivant
      </Button>
    </div>
    </div>
  </div>
    );
}
