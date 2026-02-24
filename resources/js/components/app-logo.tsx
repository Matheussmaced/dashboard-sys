import { Users } from 'lucide-react';

export default function AppLogo() {
    return (
        <>

            <Users />

            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Dashboard Sys
                </span>
            </div>
        </>
    );
}
