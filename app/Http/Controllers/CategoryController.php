<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of all categories.
     */
    public function index() {

        $categories = Category::withCount('products')->get();

        return response()->json($categories);
    }

    public function show($id)
{
    $category = Category::findOrFail($id);
    return response()->json($category);
}


    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500', // Optional description
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, $id) {
        
        // $request->validate([
        //     // 'name' => 'required|string|max:255',
        //     'description' => 'nullable|string|max:500',
        // ]);
        $category = Category::findOrFail($id);
        $category->name = $request->input('name');
        $category->description=$request->description;
        $category->save();
        // $category->update($request->all());
        return response()->json(
            [
        'message' => 'category updated successfully!',
        'category'=>$category
]
        );
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy($id) {
        $category = Category::findOrFail($id);
        
        // Optionally, you could check if there are products in this category
        if ($category->product_count > 0) {
            return response()->json(['message' => 'Category cannot be deleted because it has associated products'], 400);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }

    /**
     * Get the top 10 categories by product count.
     */
    public function topCategories()
    {
        // Fetch the top 10 categories ordered by the count of related products
        $categories = Category::withCount('products') // Assuming you have a relationship defined
            ->orderBy('products_count', 'desc')
            ->take(10)
            ->get();
    
        return response()->json($categories);
    }
    

    /**
     * Get 10 categories (adjust as needed).
     */
    public function tenCategories()
    {
        // Fetch the first 10 categories
        $categories = Category::take(10)->get();
        return response()->json($categories);
    }
}
