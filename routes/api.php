<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;

 
// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/newest', [ProductController::class, 'newestProducts']);
Route::get('/products/cheapest', [ProductController::class, 'cheapestProducts']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::get('/filtered-products', [ProductController::class, 'filtered']);








// Categories
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/top', [CategoryController::class, 'topCategories']);

Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// Cart
Route::get('/cart/{userId}', [CartController::class, 'show']);
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::post('/cart/remove', [CartController::class, 'removeFromCart']);
Route::delete('/cart/clear/{userId}', [CartController::class, 'clearCart']);

// Orders
Route::get('/orders/{userId}', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::post('/orders/cancel/{id}', [OrderController::class, 'cancel']);

// Favorites
Route::get('/favorites/{userId}', [FavoriteController::class, 'index']);
Route::post('/favorites', [FavoriteController::class, 'store']);
Route::delete('/favorites', [FavoriteController::class, 'destroy']);



// images
Route::get('/images/{filename}', [ImageController::class, 'serve']);
