import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

const Feedback = () => {
    const { user } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({ title: '', description: '', category: 'Other' });
    const [submitting, setSubmitting] = useState(false);

    const fetchFeedback = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/feedback', config);
            setFeedbacks(data);
        } catch (error) {
            toast.error('Failed to load feedback history');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('https://prefinal-year-project.onrender.com/api/feedback', formData, config);
            toast.success('Feedback submitted successfully');
            setShowForm(false);
            setFormData({ title: '', description: '', category: 'Other' });
            fetchFeedback();
        } catch (error) {
            toast.error('Failed to submit feedback');
        }
        setSubmitting(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Complaints & Feedback</h1>
                    <p className="text-slate-500">Submit grievances or suggestions to the administration.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ New Complaint'}
                </Button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-top duration-300">
                    <h2 className="font-bold text-lg mb-4">Submit New Feedback</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                            <input
                                required
                                type="text"
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Brief title of the issue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                            <select
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>Academic</option>
                                <option>Infrastructure</option>
                                <option>Harassment</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                required
                                rows="4"
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detailed description of the grievance..."
                            />
                        </div>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Complaint'}
                        </Button>
                    </form>
                </div>
            )}

            <div className="grid gap-4">
                {feedbacks.map((item) => (
                    <div key={item._id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-start">
                        <div className={cn("p-3 rounded-lg",
                            item.category === 'Harassment' ? "bg-red-50 text-red-600" :
                                item.category === 'Infrastructure' ? "bg-orange-50 text-orange-600" :
                                    "bg-indigo-50 text-indigo-600"
                        )}>
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900">{item.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider",
                                        item.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                                    )}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                            {item.adminResponse && (
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                                    <span className="font-bold text-slate-700">Admin Response: </span>
                                    <span className="text-slate-600">{item.adminResponse}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
