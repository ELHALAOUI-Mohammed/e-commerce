<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show($userId) {
        $cart = Cart::with('products')->where('user_id', $userId)->firstOrFail();
        return $cart;
    }

    public function addToCart(Request $request) {
        $cart = Cart::firstOrCreate(['user_id' => $request->user_id]);
        $cart->products()->syncWithoutDetaching([
            $request->product_id => ['quantity' => $request->quantity]
        ]);
        return response()->json(['message' => 'Product added to cart']);
    }

    public function removeFromCart(Request $request) {
        $cart = Cart::where('user_id', $request->user_id)->firstOrFail();
        $cart->products()->detach($request->product_id);
        return response()->json(['message' => 'Product removed from cart']);
    }

    public function clearCart($userId) {
        $cart = Cart::where('user_id', $userId)->firstOrFail();
        $cart->products()->detach();
        return response()->json(['message' => 'Cart cleared']);
    }
}