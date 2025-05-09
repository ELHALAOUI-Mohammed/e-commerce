    import { useEffect, useState } from 'react';
    import axiosClient from '@/api/axiosClient';
    import CategoryForm from './CategoryForm';
    import { Link, useNavigate } from 'react-router-dom';
    import { Dialog, DialogTrigger } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Badge, Table } from 'lucide-react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
    

    export default function CategoriesTable() {
        const [categories, setCategories] = useState([]);
        // const [showForm, setShowForm] = useState(false); 
        const [selectedCategory, setSelectedCategory] = useState(null);
        const navigate = useNavigate();
        //  const [open, setOpen] = useState(false);

        const fetchCategories = async () => {
            try {
                const response = await axiosClient.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const deleteCategory = async (id) => {
            if (confirm('Delete category?')) {
                await axiosClient.delete(`/categories/${id}`);
                fetchCategories();
            }
        };

        const handleEdit = (category) => {
            setSelectedCategory(category);
            setShowForm(true);
        };

        const handleAdd = () => {
            setSelectedCategory(null);
            setShowForm(true);
        };

        // const handleFormSuccess = () => {
        //     setShowForm(false);
        //     setSelectedCategory(null);
        //     fetchCategories();  // Re-fetch to get the updated list
        // };

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
  <div className="container flex flex-col justify-center w-full max-w-6xl px-2 sm:px-4 py-4 sm:py-6">
    {/* Header Section */}
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Categories</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage product categories</p>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link to="/admin/categories/add" className="flex items-center gap-2">
            <FiPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Category</span>
          </Link>
        </Button>
      </div>
    </div>

    {/* Table Section */}
    <div className="rounded-md border shadow-sm overflow-x-auto">
      <Table className="min-w-[800px] sm:min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="text-center">Products</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id} className="hover:bg-muted/50">
              <TableCell className="font-mono text-muted-foreground">
                #{category.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-medium">
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="font-medium">{category.name}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground max-w-[200px] line-clamp-2">
                {category.description}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  {category.products_count || 0}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                    onClick={() => navigate(`/admin/categories/edit/${category.id}`, { state: { category } })}
                  >
                    <FiEdit2 className="h-4 w-4" />
                    <span className="hidden sm:ml-2 sm:inline">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3 text-destructive hover:text-destructive"
                    onClick={() => deleteCategory(category.id)}
                  >
                    <FiTrash2 className="h-4 w-4" />
                    <span className="hidden sm:ml-2 sm:inline">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Optional: Pagination */}
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button variant="outline" size="sm" disabled>
        Previous
      </Button>
      <Button variant="outline" size="sm">
        Next
      </Button>
    </div>
  </div>
</div>
        )
    }
