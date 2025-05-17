<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index() {
        return Product::with('category')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['imageUrl'] = '/storage/' . $path;
        }

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function show($id){
        $product = Product::with('category')->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Handle image replacement
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->imageUrl && Storage::disk('public')->exists(str_replace('/storage/', '', $product->imageUrl))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->imageUrl));
            }

            $path = $request->file('image')->store('products', 'public');
            $validated['imageUrl'] = '/storage/' . $path;
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy($id) {
        $product = Product::findOrFail($id);
        if ($product->imageUrl && Storage::disk('public')->exists(str_replace('/storage/', '', $product->imageUrl))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->imageUrl));
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

    public function newestProducts()
    {
        $newestProducts = Product::orderBy('created_at', 'desc')->take(10)->get();
        return response()->json($newestProducts);
    }

    public function cheapestProducts()
    {
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

        $products = $query->paginate(10);

        return response()->json($products);
    }
}
