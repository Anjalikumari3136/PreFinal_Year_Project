import React, { useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, CheckCircle2, Clock, Search, Filter, MessageCircle, X, Loader2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

const FeedbackManagement = () => {
    const { user } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [adminResponse, setAdminResponse] = useState('');
    const [updating, setUpdating] = useState(false);

    const fetchFeedbacks = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/admin/feedback', config);
            setFeedbacks(data);
        } catch (error) { toast.error('Failed to load feedback'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchFeedbacks(); }, []);

    const handleUpdate = async (status) => {
        if (!adminResponse && status === 'RESOLVED') return toast.error('Please provide a response');
        setUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/admin/feedback/${selected._id}`, {
                status,
                adminResponse
            }, config);
            toast.success(`Feedback ${status}`);
            setSelected(null);
            setAdminResponse('');
            fetchFeedbacks();
        } catch (error) { toast.error('Update failed'); }
        setUpdating(false);
    };

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-indigo-600" /></div>;

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-8 animate-in fade-in duration-500">
            
            <div className={cn("flex-1 flex flex-col transition-all duration-300", selected ? "w-1/2 hidden md:flex" : "w-full")}>
                <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900">Feedback & Grievances</h1>
                        <p className="text-sm text-slate-500">Manage student complaints and institutional feedback</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 flex-1 overflow-hidden flex flex-col shadow-sm">
                    <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm" placeholder="Search by student or title..." />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-4 space-y-3">
                        {feedbacks.map(f => (
                            <div
                                key={f._id}
                                onClick={() => { setSelected(f); setAdminResponse(f.adminResponse || ''); }}
                                className={cn("p-5 rounded-2xl border cursor-pointer hover:shadow-md transition-all group",
                                    selected?._id === f._id ? "border-indigo-500 bg-indigo-50/10 ring-1 ring-indigo-500" : "bg-white border-slate-100 hover:border-indigo-200")}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border",
                                        f.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100')}>
                                        {f.status}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold">{new Date(f.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{f.title}</h4>
                                <p className="text-xs text-slate-500 mb-2">Student: <span className="text-slate-700 font-bold">{f.student?.name}</span> ({f.student?.studentId})</p>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded text-[10px] font-bold text-slate-500 w-fit">
                                    <MessageCircle className="h-3 w-3" /> {f.category}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selected && (
                <div className="w-full md:w-1/2 bg-white rounded-[2rem] border border-slate-200 shadow-xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-indigo-600 tracking-widest uppercase">
                                <AlertCircle className="h-4 w-4" />
                                Complaint Details
                            </div>
                            <h2 className="text-2xl font-black text-slate-800">{selected.title}</h2>
                        </div>
                        <button onClick={() => setSelected(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                                <MessageSquare className="h-16 w-16" />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Initial Message</h3>
                            <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">{selected.description}</p>
                        </div>

                        <div className="border-t border-slate-100 pt-8">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                                Official Resolution / Admin Remarks
                            </h3>
                            <textarea
                                className="w-full p-6 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none text-sm placeholder:italic"
                                rows="6"
                                placeholder="Detail the resolution path or internal remarks for this grievance..."
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                            ></textarea>

                            <div className="flex gap-3 mt-8 justify-end">
                                <Button variant="outline" className="rounded-2xl" onClick={() => handleUpdate('IN_REVIEW')} disabled={updating}>
                                    <Clock className="h-4 w-4 mr-2" /> Mark as In-Review
                                </Button>
                                <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-200" onClick={() => handleUpdate('RESOLVED')} disabled={updating}>
                                    <CheckCircle2 className="h-4 w-4 mr-2" /> Publish Resolution
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackManagement;
