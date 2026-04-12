import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Plus,
    AlertTriangle,
    CheckCircle,
    Clock,
    X,
    ShieldAlert,
    ChevronRight,
    MessageCircle,
    Loader2,
    Send
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

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
            const { data } = await axios.get(`${API_BASE_URL}/api/feedback`, config);
            setFeedbacks(data);
        } catch (error) { toast.error('Failed to load feedback'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchFeedback(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${API_BASE_URL}/api/feedback`, formData, config);
            toast.success('Grievance logged successfully');
            setShowForm(false);
            setFormData({ title: '', description: '', category: 'Other' });
            fetchFeedback();
        } catch (error) { toast.error('Submission failed'); }
        setSubmitting(false);
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2 italic">Grievance Desk</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-orange-600 decoration-2 underline-offset-4">Log institutional complaints & feedback</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={cn(
                        "px-8 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl transition-all flex items-center gap-4",
                        showForm ? "bg-slate-900 text-white" : "bg-[#f4511e] text-white shadow-orange-600/30 hover:scale-[1.03] active:scale-95"
                    )}
                >
                    {showForm ? <><X className="h-4 w-4" /> Cancel Process</> : <><Plus className="h-4 w-4" /> Log Complaint</>}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl animate-in slide-in-from-top-10 duration-500 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center"><ShieldAlert className="h-5 w-5" /></div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Submit Official Grievance</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Subject / Headline</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all font-bold text-sm"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Brief nature of issue"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Category Group</label>
                                <select
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all font-bold text-sm"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Academic</option>
                                    <option>Infrastructure</option>
                                    <option>Harassment</option>
                                    <option>Administrative</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Detailed Description</label>
                            <textarea
                                required
                                rows="5"
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all font-medium text-sm resize-none"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Explain the grievance in detail for administrative review..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black shadow-xl disabled:opacity-50 flex items-center gap-3 transition-all active:scale-95"
                        >
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4" /> Submit to Bureau</>}
                        </button>
                    </form>
                </div>
            )}

            <div className="grid gap-6">
                {loading ? (
                    <div className="py-20 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-orange-500" /></div>
                ) : feedbacks.length === 0 ? (
                    <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-sm text-center">
                        <MessageSquare className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                        <p className="font-black text-slate-400 uppercase text-xs tracking-widest">No grievance records found.</p>
                    </div>
                ) : feedbacks.map((item) => (
                    <div key={item._id} className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-100 transition-all group flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
                        <div className={cn("p-5 rounded-[1.5rem] shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-6",
                            item.category === 'Harassment' ? "bg-red-50 text-red-600" :
                                item.category === 'Infrastructure' ? "bg-orange-50 text-orange-600" :
                                    "bg-slate-900 text-white shadow-slate-900/20"
                        )}>
                            <MessageCircle className="h-8 w-8" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic group-hover:text-orange-600 transition-colors mb-2">{item.title}</h3>
                                    <div className="flex gap-2">
                                        <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">{item.category}</span>
                                        <span className="px-3 py-1 bg-slate-50 text-slate-300 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-100">#{item._id.slice(-6).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                                        item.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-500/5" : "bg-orange-50 text-orange-600 border-orange-100 shadow-orange-500/5"
                                    )}>
                                        {item.status.replace('_', ' ')}
                                    </span>
                                    <span className="text-[10px] text-slate-300 font-black uppercase tracking-tighter">{new Date(item.createdAt).toDateString()}</span>
                                </div>
                            </div>
                            <p className="text-slate-600 font-medium text-base leading-relaxed max-w-4xl">{item.description}</p>
                            {item.adminResponse && (
                                <div className="bg-[#171317] p-8 rounded-[2.5rem] mt-6 border border-white/5 text-white shadow-2xl relative overflow-hidden group/resp">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover/resp:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="h-8 w-8 rounded-xl bg-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-600/30">
                                            <ShieldAlert className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                            <span className="font-black text-orange-500 uppercase text-[9px] tracking-[0.2em] block mb-3 underline decoration-white/10 underline-offset-4">Official Resolution Desk</span>
                                            <p className="text-slate-300 font-medium italic text-sm leading-relaxed underline-offset-4 underline decoration-white/5">"{item.adminResponse}"</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#f8f9fa] border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center group">
                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform"><CheckCircle className="h-8 w-8 text-emerald-500" /></div>
                <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none mb-2">Transparency Protocol</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-[400px]">Your feedback is anonymous where requested, and tracked otherwise for institutional service quality auditing.</p>
            </div>
        </div>
    );
};

export default Feedback;
