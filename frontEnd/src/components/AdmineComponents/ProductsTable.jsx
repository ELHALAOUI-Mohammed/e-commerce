import { useEffect, useState } from 'react';
import axiosClient from '@/api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi"
import { MdSearch } from "react-icons/md"

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (confirm('Are you sure?')) {
            await axiosClient.delete(`/products/${id}`);
            fetchProducts();
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedProduct(null);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
    <div className="flex justify-center w-full px-4">
    <div className="container flex flex-col justify-center w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
    {/* Header Section */}
    <div className="flex flex-col gap-4 mb-6">
      {/* Search and Add Product */}
      <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Gestion des produits</h2>
        <p className="text-sm text-muted-foreground mt-1">Gérez votre inventaire de produits</p>
        </div>
      </div>
      <Button asChild className="shrink-0">
        <Link to="/admin/products/add" className="flex items-center gap-2">
        <FiPlus className="h-4 w-4" />
        <span className="hidden sm:inline">Ajouter un produit</span>
        </Link>
      </Button>
      </div>
    </div>

    {/* Table Section */}
    {loading ? (
      <div className="space-y-2">
      <Skeleton className="h-10 w-full rounded-md" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-md" />
      ))}
      </div>
    ) : (
      <div className="rounded-md border shadow-sm overflow-x-auto">
      <Table className="min-w-[800px] sm:min-w-full">
        <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead>Prix</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="hidden sm:table-cell">Catégorie</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className="hover:bg-muted/50">
          <TableCell className="font-medium">{product.id}</TableCell>
          <TableCell className="font-medium">
            {product.name}
            <div className="md:hidden text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell text-muted-foreground max-w-[200px] truncate">
            {product.description}
          </TableCell>
          <TableCell className="font-semibold">
            {parseFloat(product.price).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </TableCell>
          <TableCell>
            <Badge variant={product.stock > 10 ? "success" : "warning"}>
            {product.stock}
            </Badge>
          </TableCell>
          <TableCell className="hidden sm:table-cell text-muted-foreground">
            {product.category?.name || (
            <span className="text-destructive">Aucune catégorie</span>
            )}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
              onClick={() => navigate(`/admin/products/edit/${product.id}`)}
            >
              <FiEdit2 className="h-4 w-4" />
              <span className="hidden sm:ml-2 sm:inline">Modifier</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 text-destructive hover:text-destructive"
              onClick={() => deleteProduct(product.id)}
            >
              <FiTrash2 className="h-4 w-4" />
              <span className="hidden sm:ml-2 sm:inline">Supprimer</span>
            </Button>
            </div>
          </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </div>
    )}

    {/* Pagination (optional) */}
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
