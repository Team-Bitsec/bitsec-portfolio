import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    link?: string;
    screenshots?: string[];
}

export default function ProjectsManager() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        image: '',
        link: '',
        screenshots: ''
    });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            const fetchedProjects: Project[] = [];
            querySnapshot.forEach((doc) => {
                fetchedProjects.push({ id: doc.id, ...doc.data() } as Project);
            });
            setProjects(fetchedProjects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            await deleteDoc(doc(db, 'projects', id));
            fetchProjects();
        }
    };

    const handleEdit = (project: Project) => {
        setFormData({
            ...project,
            link: project.link || '',
            screenshots: project.screenshots ? project.screenshots.join('\n') : ''
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({ id: '', title: '', category: '', description: '', image: '', link: '', screenshots: '' });
        setIsEditing(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { id, screenshots, ...restData } = formData;
            const finalData = {
                ...restData,
                screenshots: screenshots ? screenshots.split('\n').map(s => s.trim()).filter(s => s) : []
            };

            if (isEditing && formData.id) {
                // Update
                const projectRef = doc(db, 'projects', formData.id);
                await updateDoc(projectRef, finalData);
            } else {
                // Add
                await addDoc(collection(db, 'projects'), finalData);
            }
            resetForm();
            await fetchProjects();
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Error saving project!");
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading && projects.length === 0 && !isEditing) return <div>Loading projects...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-[#0057FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0057FF]/90"
                    >
                        + Add Project
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">{formData.id ? 'Edit Project' : 'Add New Project'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Project Title</label>
                                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-[#0057FF] focus:ring-[#0057FF] sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category (e.g. Web Development)</label>
                                <input required type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-[#0057FF] focus:ring-[#0057FF] sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input required type="text" name="image" value={formData.image} onChange={handleChange} placeholder="/projects/example.jpg" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-[#0057FF] focus:ring-[#0057FF] sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Live Link</label>
                                <input required type="url" name="link" value={formData.link || ''} onChange={handleChange} placeholder="https://example.com" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-[#0057FF] focus:ring-[#0057FF] sm:text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Additional Screenshots (Optional, one URL per line)</label>
                                <textarea name="screenshots" value={formData.screenshots} onChange={handleChange} rows={3} placeholder="https://example.com/screenshot1.jpg&#10;https://example.com/screenshot2.jpg" className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-[#0057FF] focus:ring-[#0057FF] sm:text-sm"></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Short Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 border p-2 shadow-sm focus:border-[#0057FF] focus:ring-[#0057FF] sm:text-sm"></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#0057FF] text-white rounded-lg text-sm font-medium hover:bg-[#0057FF]/90 disabled:opacity-50">
                                {loading ? 'Saving...' : 'Save Project'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img className="h-10 w-10 rounded-md object-cover" src={project.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{project.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(project)} className="text-[#0057FF] hover:text-blue-900 mr-4">Edit</button>
                                        <button onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500">No projects found. Add your first project!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
