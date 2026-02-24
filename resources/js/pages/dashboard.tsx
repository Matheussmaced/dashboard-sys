import { Head } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import * as React from "react"
import { FormModal } from '@/components/createUserModal';
import type { Customers } from '@/components/table/columns';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

type Customer = {
    id: number;
    name: string;
    email: string;
    active: number;
};

export default function Dashboard() {
    const [data, setData] = useState<Customers[]>([]);

    const [open, setOpen] = React.useState(false)

    const [form, setForm] = React.useState({
        name: "",
        email: "",
        active: true,
    })

    // Função para buscar clientes
    async function getData(): Promise<Customer[]> {
        const response = await fetch('/customers', {
            method: 'GET',
            headers: { Accept: 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(text);
            throw new Error('Erro ao buscar customers');
        }

        return response.json();
    }

    async function handleCreateCustomer() {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content")

        const response = await fetch("/customers", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-CSRF-TOKEN": token ?? "",
            },
            body: JSON.stringify(form),
        })

        if (!response.ok) {
            const err = await response.json()
            console.error("Erro:", err)
            alert("Erro ao criar cliente")
            return
        }

        const newCustomer = await response.json()

        setData((prev) => [...prev, newCustomer])
        setOpen(false)
        setForm({ name: "", email: "", active: true })
    }

    async function handleDeleteCustomer(id: number) {
        const token = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content")

        const response = await fetch(`/customers/${id}`, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Accept": "application/json",
                "X-CSRF-TOKEN": token ?? "",
            },
        })

        if (!response.ok) {
            alert("Erro ao deletar cliente")
            return
        }

        // Remove do estado local
        setData((prev) => prev.filter((customer) => customer.id !== id))
    }

    useEffect(() => {
        getData().then((customers) => {
            setData(customers);
        });
    }, []);

    useEffect(() => {
        console.log('Clientes carregados:', data);
    }, [data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Placeholder cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                {/* DataTable */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden p-4 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {data.length > 0 ? (
                        <DataTable
                            columns={columns(handleDeleteCustomer)}
                            data={data}
                        />
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-4">
                            <p>Não há clientes cadastrados.</p>
                            <Button variant="secondary" onClick={() => setOpen(true)}>
                                Adicionar cliente
                            </Button>
                        </div>

                    )}
                </div>

                {/* Modal */}
                <FormModal
                    open={open}
                    onOpenChange={setOpen}
                    title="Adicionar Cliente"
                    description="Preencha os dados abaixo"
                    onSubmit={handleCreateCustomer}
                >
                    <div className="space-y-2">
                        <Label>Nome</Label>
                        <Input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Digite o nome"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Digite o email"
                        />
                    </div>
                </FormModal>
            </div>
        </AppLayout>
    );
}
