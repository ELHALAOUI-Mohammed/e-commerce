<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    
    public function index() {
        return Product::with('category')->get();
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required', 'price' => 'required', 'stock' => 'required', 'category_id' => 'required'
        ]);
        return Product::create($request->all());
    }

    public function show($id) {
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return $product;
    }

    public function destroy($id) {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted']);
    }


    public function newestProducts()
    {
        // Fetch the 10 newest products ordered by created_at in descending order
        $newestProducts = Product::orderBy('created_at', 'desc')->take(10)->get();

        return response()->json($newestProducts);
    }
     public function cheapestProducts()
    {
        // Fetch the 10 cheapest products ordered by price in ascending order
        $cheapestProducts = Product::orderBy('price', 'asc')->take(10)->get();

        return response()->json($cheapestProducts);
    }

    
    public function filtered(Request $request)
{
    $query = Product::query();

    if ($request->has('category_id')) {
        $query->where('category_id', $request->category_id);
    }

    if ($request->has('search')) {
        $query->where('name', 'like', '%' . $request->search . '%');
    }

    if ($request->has('sort')) {
        if ($request->sort === 'price') {
            $query->orderBy('price');
        } elseif ($request->sort === 'date') {
            $query->orderBy('created_at', 'desc');
        }
    }

    $products = $query->paginate(10); // Adjust per-page count as needed

    return response()->json($products);
}
}