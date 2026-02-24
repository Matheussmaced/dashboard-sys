import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { columns, type Payment } from '@/components/payments/columns';

import { DataTable } from '@/components/payments/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

async function getData(): Promise<Payment[]> {
    return [
        {
            id: "728ed52f",
            active: true,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "2",
            active: false,
            status: "pending",
            email: "v@example.com",
        },
        {
            id: "3",
            active: true,
            status: "success",
            email: "g@example.com",
        },
        {
            id: "4",
            active: true,
            status: "pending",
            email: "f@example.com",
        },
        {
            id: "5",
            active: false,
            status: "pending",
            email: "z@example.com",
        },
        {
            id: "7",
            active: true,
            status: "success",
            email: "z@example.com",
        },
        {
            id: "20",
            active: true,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "50",
            active: false,
            status: "pending",
            email: "v@example.com",
        },
        {
            id: "30",
            active: true,
            status: "success",
            email: "g@example.com",
        },
        {
            id: "22",
            active: true,
            status: "pending",
            email: "f@example.com",
        },
        {
            id: "33",
            active: false,
            status: "pending",
            email: "z@example.com",
        },
        {
            id: "66",
            active: true,
            status: "success",
            email: "z@example.com",
        },
    ]
}

export default function Dashboard() {
    const [data, setData] = useState<Payment[]>([]);

    useEffect(() => {
        getData().then(setData);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
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
                <div className="relative min-h-[100vh] flex-1 overflow-hidden p-4 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
