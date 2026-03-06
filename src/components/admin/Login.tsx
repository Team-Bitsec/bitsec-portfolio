import React, { useState } from 'react';
import { loginAdmin } from '../../lib/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await loginAdmin(email, password);
            // Redirect happens in AdminLayout automatically
        } catch (err: any) {
            setError("Invalid Email or Password");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Bitsec Admin</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to manage your portfolio and blogs
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-[#0057FF] focus:border-[#0057FF] sm:text-sm transition-colors"
                                placeholder="admin@bitsec.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-[#0057FF] focus:border-[#0057FF] sm:text-sm transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#0057FF] hover:bg-[#0057FF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0057FF] transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
