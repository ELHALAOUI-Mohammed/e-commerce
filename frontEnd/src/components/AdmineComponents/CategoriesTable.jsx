import { useEffect, useState } from 'react';
import axiosClient from '@/api/axiosClient';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const deleteCategory = async (id) => {
    if (confirm('Delete category?')) {
      await axiosClient.delete(`/categories/${id}`);
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchCategories();
    }
  }, [location.state]);

  return (
    <div className="flex justify-center w-full px-4">
      <div className="container flex flex-col w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Catégories</h2>
              <p className="text-sm text-muted-foreground">Gérer les catégories de produits</p>
            </div>
            <Button asChild>
              <Link to="/admin/categories/add" className="flex items-center gap-2">
                <FiPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Ajouter une catégorie</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Table */}
        {categories?.length > 0 ? (
          <>
            <div className="rounded-md border shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead className="hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-center">Produits</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-mono">#{category.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 font-medium">
                              {category.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="font-medium">{category.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground line-clamp-2">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge>{category.products_count || 0}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                          >
                            <FiEdit2 className="mr-2 h-4 w-4" />
                            Modifier
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => deleteCategory(category.id)}
                          >
                            <FiTrash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Optional Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="text-muted-foreground">Aucune catégorie trouvée</div>
            <Button asChild>
              <Link to="/admin/categories/add">
                <FiPlus className="mr-2 h-4 w-4" />
                Ajouter votre première catégorie
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
