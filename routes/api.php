<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

 
// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/newest', [ProductController::class, 'newestProducts']);
Route::get('/products/cheapest', [ProductController::class, 'cheapestProducts']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::get('/filtered-products', [ProductController::class, 'filtered']);   


// User

Route::get('/users' ,[UserController::class, 'index']);

// Auth


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    Auth::logout();
    return response()->json(['message' => 'Logged out successfully']);
});

// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);



// Categories
Route::get('/categories/top', [CategoryController::class, 'topCategories']);
    Route::get('/categories', [CategoryController::class, 'index']);
    // Laravel route example
    Route::get('/categories/{id}', [CategoryController::class, 'show']);

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    


// Cart

// Route::get('/cart/{userId}', [CartController::class, 'show']);
// Route::post('/cart', [CartController::class, 'addToCart']);
// Route::delete('/cart/remove', [CartController::class, 'removeFromCart']);
// Route::delete('/cart/clear/{userId}', [CartController::class, 'clearCart']);
Route::get('/cart/{userId}', [CartController::class, 'show']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/remove-from-cart', [CartController::class, 'removeFromCart']);
Route::delete('/cart/clear/{userId}', [CartController::class, 'clearCart']);
Route::put('/api/cart/{userId}', [CartController::class, 'updateQuantity']); // You need to add this method



// Orders
Route::get('/orders/{userId}', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orders/cancel/{id}', [OrderController::class, 'cancel']);
// Route::post('/orders/checkout', [OrderController::class, 'checkoutCart']);
Route::post('/orders/checkout', [OrderController::class, 'checkout']);



// Favorites
Route::get('/favorites/{userId}', [FavoriteController::class, 'index']);
Route::post('/favorites', [FavoriteController::class, 'store']);

Route::delete('/favorites', [FavoriteController::class, 'destroy']);



// images
Route::get('/images/{filename}', [ImageController::class, 'serve']);

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/orders/confirm', [OrderController::class, 'confirm']);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);  
