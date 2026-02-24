<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Services\CustomerService;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    protected CustomerService $customerService;

    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    /**
     * LISTAGEM - retorna todos os clientes
     */
   public function index()
    {
        $customers = Customer::all(['id', 'name', 'email', 'active']); // garante que active seja retornado
        return response()->json($customers);
    }

    /**
     * CREATE - cria um novo cliente
     */
    public function store(StoreCustomerRequest $request)
    {
        $customer = $this->customerService->store($request->validated());

        return response()->json($customer, 201); // retorna o cliente criado em JSON
    }

    /**
     * UPDATE - atualiza um cliente existente
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer = $this->customerService->update($customer, $request->validated());

        return response()->json($customer); // retorna o cliente atualizado
    }

    /**
     * DELETE - remove um cliente
     */
    public function destroy(Customer $customer)
    {
        $this->customerService->delete($customer);

        return response()->json(['message' => 'Cliente deletado com sucesso']);
    }

    /**
     * SHOW - retorna um cliente específico (opcional, mas útil)
     */
    public function show(Customer $customer)
    {
        return response()->json($customer);
    }
}
