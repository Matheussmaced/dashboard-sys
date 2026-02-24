import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { Customers } from '@/components/table/columns';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/data-table';
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

  useEffect(() => {
    getData().then((customers) => {
      setData(customers);
    });
  }, []);

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
            <DataTable columns={columns} data={data} />
        ) : (
            <p>Carregando clientes...</p>
        )}
        </div>
      </div>
    </AppLayout>
  );
}
