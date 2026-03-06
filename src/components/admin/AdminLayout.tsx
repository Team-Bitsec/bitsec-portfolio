import React, { useEffect, useState } from 'react';
import { subscribeToAuthChanges, logoutAdmin } from '../../lib/auth';
import type { User } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        setPathname(window.location.pathname);
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
            setLoading(false);

            const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
            const currentPath = window.location.pathname.replace(/\/$/, "");
            const adminBase = `${basePath}/admin`;
            const isLoginPage = currentPath === adminBase;

            if (!currentUser && !isLoginPage) {
                window.location.href = adminBase;
            } else if (currentUser && isLoginPage) {
                window.location.href = `${adminBase}/dashboard`;
            }
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-8 h-8 border-4 border-[#0057FF] border-t-transparent flex rounded-full animate-spin"></div>
            </div>
        );
    }

    const basePath = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
    const adminBase = `${basePath}/admin`;
    const currentPath = pathname.replace(/\/$/, "");

    if (currentPath === adminBase) {
        return <div className="font-sans antialiased bg-gray-50 text-gray-900 min-h-screen">{children}</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 h-auto md:min-h-screen flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">Bitsec Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href={`${adminBase}/dashboard`} className={`block px-4 py-2 rounded-md transition-colors ${currentPath === `${adminBase}/dashboard` ? 'bg-[#0057FF]/10 text-[#0057FF] font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>Dashboard</a>
                    <a href={`${adminBase}/projects`} className={`block px-4 py-2 rounded-md transition-colors ${currentPath === `${adminBase}/projects` ? 'bg-[#0057FF]/10 text-[#0057FF] font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>Projects</a>
                    <a href={`${adminBase}/blogs`} className={`block px-4 py-2 rounded-md transition-colors ${currentPath === `${adminBase}/blogs` ? 'bg-[#0057FF]/10 text-[#0057FF] font-medium' : 'text-gray-600 hover:bg-gray-100'}`}>Blogs</a>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={() => logoutAdmin()}
                        className="w-full px-4 py-2 text-left text-red-600 font-medium hover:bg-red-50 rounded-md transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
