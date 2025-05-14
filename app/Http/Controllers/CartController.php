<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;
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
  public function updateQuantity(Request $request, $userId)
{
    $productId = $request->product_id;
    $newQuantity = $request->quantity;

    $cart = Cart::firstOrCreate(['user_id' => $userId]);

    if ($cart->products()->where('product_id', $productId)->exists()) {
        $cart->products()->updateExistingPivot($productId, ['quantity' => $newQuantity]);
        return response()->json(['message' => 'Quantité mise à jour']);
    } else {
        return response()->json(['message' => 'Produit non trouvé dans le panier'], 404);
    }
}

}