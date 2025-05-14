<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index($userId) {
    $orders = Order::with('orderItems.product')
                ->where('user_id', $userId)
                ->orderByDesc('orderDate')
                ->get();

    return response()->json($orders);
}

    public function store(Request $request) {
        $order = Order::create([
            'user_id' => $request->user_id,
            'orderDate' => now(),
            'status' => 'pending',
            'totalAmount' => $request->totalAmount
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unitPrice' => $item['unitPrice']
            ]);
        }

        return $order;
    }

    public function cancel($id) {
        $order = Order::findOrFail($id);
        $order->status = 'canceled';
        $order->save();
        return response()->json(['message' => 'Order canceled']);
    }
    public function checkoutCart(Request $request)
{
    $userId = $request->user_id;

    // Get user's cart
    $cart = Cart::where('user_id', $userId)->first();
    if (!$cart) {
        return response()->json(['message' => 'Cart not found'], 404);
    }

    $cartItems = $cart->products;

    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'Cart is empty'], 400);
    }

    DB::beginTransaction();

    try {
        // Calculate total
        $total = 0;
        foreach ($cartItems as $item) {
            $total += $item->price * $item->pivot->quantity;
        }

        // Create order
        $order = Order::create([
            'user_id' => $userId,
            'orderDate' => now(),
            'status' => 'pending',
            'totalAmount' => $total,
        ]);

        // Create order items
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->id,
                'quantity' => $item->pivot->quantity,
                'unitPrice' => $item->price,
            ]);
        }

        // Clear cart
        $cart->products()->detach();

        DB::commit();

        return response()->json(['message' => 'Order placed successfully', 'order' => $order]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'Failed to place order', 'error' => $e->getMessage()], 500);
    }
}
}
