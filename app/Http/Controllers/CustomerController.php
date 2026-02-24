<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Services\CustomerService;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Inertia\Inertia;

class CustomerController extends Controller
{
    protected CustomerService $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    // READ (listagem)
    public function index()
    {
        $customers = $this->customerService->getAll();

        return Inertia::render('Customers/Index', [
            'customers' => $customers
        ]);
    }

    // CREATE
    public function store(StoreCustomerRequest $request)
    {
        $this->customerService->store($request->validated());

        return redirect()->back()->with('success', 'Customer created successfully');
    }

    // UPDATE
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $this->customerService->update($customer, $request->validated());

        return redirect()->back()->with('success', 'Customer updated successfully');
    }

    // DELETE
    public function destroy(Customer $customer)
    {
        $this->customerService->delete($customer);

        return redirect()->back()->with('success', 'Customer deleted successfully');
    }
}
