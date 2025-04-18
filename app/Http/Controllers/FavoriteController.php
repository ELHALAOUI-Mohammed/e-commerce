<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index($userId) {
        return Favorite::with('product')->where('user_id', $userId)->get();
    }

    public function store(Request $request) {
        return Favorite::firstOrCreate([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id
        ]);
    }

    public function destroy(Request $request) {
        Favorite::where([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id
        ])->delete();

        return response()->json(['message' => 'Removed from favorites']);
    }
}