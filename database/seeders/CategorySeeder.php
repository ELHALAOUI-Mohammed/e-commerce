<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HasFactory;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Category::factory()->count(50)->create();
    }
}
 