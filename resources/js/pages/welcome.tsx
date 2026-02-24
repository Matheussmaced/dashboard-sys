import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="UserManager">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-[#0b0f19] text-white">

                {/* Glow background */}
                <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/30 blur-[120px]" />
                <div className="absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px]" />

                {/* HEADER */}
                <header className="relative z-10 px-6 py-6">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between">
                        <h1 className="text-xl font-semibold tracking-tight">
                            User<span className="text-indigo-400">Manager</span>
                        </h1>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-medium shadow-lg transition hover:bg-indigo-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm text-gray-300 transition hover:text-white"
                                    >
                                        Login
                                    </Link>

                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-sm font-medium shadow-lg transition hover:opacity-90"
                                        >
                                            Criar Conta
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* HERO */}
                <main className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">

                    <div className="max-w-4xl">

                        <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-gray-300 backdrop-blur">
                            Sistema moderno de gestão de usuários
                        </div>

                        <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                            Controle total sobre seus
                            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                                {" "}usuários
                            </span>
                        </h2>

                        <p className="mt-8 text-lg text-gray-400 md:text-xl">
                            Gerencie acessos, permissões e cadastros com uma interface
                            elegante, rápida e segura construída com Laravel 12 + React.
                        </p>

                        {!auth.user && (
                            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <Link
                                    href={register()}
                                    className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-semibold shadow-2xl transition hover:scale-105"
                                >
                                    Começar gratuitamente
                                </Link>

                                <Link
                                    href={login()}
                                    className="rounded-2xl border border-white/20 px-8 py-4 text-sm font-semibold text-gray-300 backdrop-blur transition hover:bg-white/10"
                                >
                                    Já tenho conta
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Glass Card */}
                    <div className="mt-24 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">

                        <div className="grid gap-8 md:grid-cols-3 text-left">

                            <div>
                                <h3 className="mb-3 text-lg font-semibold">🔐 Segurança</h3>
                                <p className="text-sm text-gray-400">
                                    Autenticação robusta com Laravel e controle refinado de permissões.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-semibold">⚡ Performance</h3>
                                <p className="text-sm text-gray-400">
                                    Experiência fluida com React + Inertia e navegação instantânea.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-3 text-lg font-semibold">🎨 Interface Premium</h3>
                                <p className="text-sm text-gray-400">
                                    Design moderno com Tailwind, dark mode nativo e foco em UX.
                                </p>
                            </div>

                        </div>
                    </div>

                </main>
            </div>
        </>
    );
}
