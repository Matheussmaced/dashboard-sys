<?php

namespace App\Services;

use App\Models\Customer;

class CustomerService
{
    public function getAll(){
        return Customer::select('id', 'name', 'email')->get();
    }
    public function store(array $data){
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }
        return Customer::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'] ?? null,
            'active' => $data['active'] ?? true,
        ]);
    }
    public function update(Customer $customer, array $data){
        if(isset($data['password'])){
            $data['password'] = bcrypt($data['password']);
        }
        return $customer->update($data);
    }
    public function delete(Customer $customer){
        return $customer->delete();
    }
}
