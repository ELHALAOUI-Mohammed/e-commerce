<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasFactory ,HasApiTokens, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'address', 'phone', 'role'];
    
        // app/Models/User.php
    public function isAdmin() {
        return $this->role === 'admin';
    }

    public function isCustomer() {
        return $this->role === 'customer';
    }


    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function cart()
{
    return $this->belongsToMany(Product::class, 'carts') // 'cart' is the name of the pivot table
                ->withPivot('quantity') // Include the 'quantity' column from the pivot table
                ->withTimestamps();
}

    
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
