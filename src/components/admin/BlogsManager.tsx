import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    date: string;
}

export default function BlogsManager() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        excerpt: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0]
    });

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'blogs'));
            const fetchedBlogs: Blog[] = [];
            querySnapshot.forEach((doc) => {
                fetchedBlogs.push({ id: doc.id, ...doc.data() } as Blog);
            });
            // Sort by date descending
            fetchedBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setBlogs(fetchedBlogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            await deleteDoc(doc(db, 'blogs', id));
            fetchBlogs();
        }
    };

    const handleEdit = (blog: Blog) => {
        setFormData(blog);
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ id: '', title: '', excerpt: '', content: '', image: '', date: new Date().toISOString().split('T')[0] });
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && formData.id) {
                // Update
                const blogRef = doc(db, 'blogs', formData.id);
                const { id, ...updateData } = formData;
                await updateDoc(blogRef, updateData);
            } else {
                // Add
                const { id, ...addData } = formData;
                await addDoc(collection(db, 'blogs'), addData);
            }
            resetForm();
            await fetchBlogs();
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("Error saving blog!");
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading && blogs.length === 0 && !isEditing) return <div>Loading blogs...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Blogs</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
                    >
                        + Add Blog Post
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">{formData.id ? 'Edit Blog' : 'Add New Blog'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Blog Title</label>
                                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                                <input required type="text" name="image" value={formData.image} onChange={handleChange} placeholder="/blogs/example.jpg" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Short Excerpt (Shows on cards)</label>
                                <textarea required name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:text-sm"></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Main Content (Markdown/Text)</label>
                                <textarea required name="content" value={formData.content} onChange={handleChange} rows={8} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-purple-600 focus:ring-purple-600 sm:text-sm"></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Blog'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Post</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={blog.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{blog.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(blog)} className="text-purple-600 hover:text-purple-900 mr-4">Edit</button>
                                        <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500">No blogs found. Write your first post!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
