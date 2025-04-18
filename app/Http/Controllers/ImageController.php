<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class ImageController extends Controller
{
    public function serve($filename)
    {
        $path = public_path('images/' . $filename);
        if (file_exists($path)) {
            return response()->file($path);
        } else {
            return response()->json(['error' => 'Image not found'], 404);
        }
    }
}

