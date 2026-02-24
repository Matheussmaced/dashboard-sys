<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        $customers = [
            ['name' => 'João Silva', 'email' => 'joao@email.com', 'active' => true],
            ['name' => 'Maria Oliveira', 'email' => 'maria@email.com', 'active' => false],
            ['name' => 'Pedro Santos', 'email' => 'pedro@email.com', 'active' => true],
            ['name' => 'Ana Paula', 'email' => 'ana@email.com', 'active' => true],
            ['name' => 'Carlos Souza', 'email' => 'carlos@email.com', 'active' => false],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }
    }
}
