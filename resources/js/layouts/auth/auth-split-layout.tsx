import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {


    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0b0f19] text-white">

            {/* Background Glow */}
            <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/30 blur-[120px]" />
            <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px]" />

            <div className="relative grid min-h-screen lg:grid-cols-2">

                {/* LEFT SIDE */}
                <div className="relative hidden flex-col justify-between border-r border-white/10 bg-white/5 p-12 backdrop-blur-xl lg:flex">

                    <Link
                        href={home()}
                        className="flex items-center text-xl font-semibold tracking-tight"
                    >
                        <span>
                            User<span className="text-indigo-400">Manager</span>
                        </span>
                    </Link>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold leading-tight">
                            Gerencie seus usuários com
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                                {" "}controle total
                            </span>
                        </h2>

                        <p className="mt-6 text-gray-400">
                            Plataforma moderna construída com Laravel 12 + React,
                            focada em performance, segurança e experiência premium.
                        </p>
                    </div>

                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()}  Matheus Todos os direitos reservados.
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-center px-6 py-12">

                    <div className="w-full max-w-md">

                        {/* Logo mobile */}
                        <Link
                            href={home()}
                            className="mb-10 flex justify-center lg:hidden"
                        >
                            <AppLogoIcon className="h-12 fill-current text-indigo-400" />
                        </Link>

                        {/* Glass Card */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">

                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    {title}
                                </h1>

                                <p className="mt-2 text-sm text-gray-400">
                                    {description}
                                </p>
                            </div>

                            {children}

                        </div>

                        <p className="mt-6 text-center text-xs text-gray-500">
                            Interface segura • Dark mode nativo • Experiência moderna
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}
