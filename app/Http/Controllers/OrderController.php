<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index($userId) {
        return Order::with('orderItems.product')->where('user_id', $userId)->get();
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
}
