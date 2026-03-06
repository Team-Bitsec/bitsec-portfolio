import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function Dashboard() {
    const [blogsCount, setBlogsCount] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // adding a timeout in case Firestore hangs
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Firestore database connection timed out. Make sure your Firestore Database is created and Rules are published.")), 10000)
                );

                const dataPromise = Promise.all([
                    getDocs(collection(db, 'blogs')),
                    getDocs(collection(db, 'projects'))
                ]);

                const [blogsSnapshot, projectsSnapshot] = await Promise.race([
                    dataPromise,
                    timeoutPromise
                ]) as any;

                setBlogsCount(blogsSnapshot.size);
                setProjectsCount(projectsSnapshot.size);
            } catch (err: any) {
                console.error("Error fetching stats:", err);
                setError(err.message || "Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (error) {
        return (
            <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Dashboard</h3>
                <p className="text-red-600">{error}</p>
                <div className="mt-4 p-4 bg-white rounded-lg text-sm text-gray-700">
                    <p className="font-bold mb-2">How to fix:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Go to <a href="https://console.firebase.google.com/" target="_blank" className="text-blue-600 underline">Firebase Console</a></li>
                        <li>Select your project &gt; Click <strong>Firestore Database</strong> in the sidebar.</li>
                        <li>Click <strong>Create Database</strong> (if you haven't already).</li>
                        <li>Go to the <strong>Rules</strong> tab and replace the code with the rules I gave you earlier, then click Publish.</li>
                    </ol>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="text-gray-600 font-medium flex items-center space-x-2"><div className="w-5 h-5 border-2 border-[#0057FF] border-t-transparent flex rounded-full animate-spin"></div><span>Loading dashboard data...</span></div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Projects Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-50 text-[#0057FF] rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{projectsCount}</p>
                    <a href="/admin/projects" className="mt-4 text-[#0057FF] text-sm font-medium hover:underline">Manage Projects →</a>
                </div>

                {/* Blogs Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Blogs</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{blogsCount}</p>
                    <a href="/admin/blogs" className="mt-4 text-purple-600 text-sm font-medium hover:underline">Manage Blogs →</a>
                </div>
            </div>
        </div>
    );
}
