<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category ;


class CategoryController extends Controller
{
    public function index() {
        return Category::all();
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required']);
        return Category::create($request->all());
    }

    public function update(Request $request, $id) {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return $category;
    }

    public function destroy($id) {
        Category::findOrFail($id)->delete();
        return response()->json(['message' => 'Category deleted']);
    }

    public function tenCategories()
    {
   
        $cheapestProducts = Product::all()->take(10)->get();

        return response()->json($cheapestProducts);
    }
    public function topCategories()
    {
        // Fetch the 10 categories (adjust as needed)
        $categories = Category::take(10)->get(); // Fetch the first 10 categories

        return response()->json($categories);
    }
}