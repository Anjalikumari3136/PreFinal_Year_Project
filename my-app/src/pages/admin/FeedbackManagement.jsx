import React, { useState, useEffect } from 'react';
import { 
    MessageSquare, 
    AlertCircle, 
    CheckCircle2, 
    Clock, 
    Search, 
    Filter, 
    MessageCircle, 
    X, 
    Loader2,
    TrendingUp,
    ShieldAlert
} from 'lucide-react';
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
    const [filter, setFilter] = useState('All');

    const fetchFeedbacks = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/admin/feedback', config);
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
            await axios.put(`https://prefinal-year-project.onrender.com/api/admin/feedback/${selected._id}`, {
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

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-orange-600" /></div>;

    const filtered = filter === 'All' 
        ? feedbacks 
        : feedbacks.filter(f => f.status === filter.toUpperCase());

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-8 animate-in fade-in duration-500">
            
            <div className={cn("flex-1 flex flex-col transition-all duration-300", selected ? "w-1/2 hidden md:flex" : "w-full")}>
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Grievance Desk</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Feedback & Complaints Hub</p>
                    </div>
                    <div className="flex gap-2 bg-white/50 p-1.5 rounded-2xl border border-slate-200">
                        {['All', 'Pending', 'In_Review', 'Resolved'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    filter === f ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {f.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 flex-1 overflow-hidden flex flex-col shadow-sm">
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                            <input className="w-full pl-11 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all outline-none" placeholder="Search universe of complaints..." />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-6 space-y-4 custom-scrollbar">
                        {filtered.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                                <MessageSquare className="h-12 w-12 mb-3" />
                                <p className="font-bold text-sm">No feedback found here.</p>
                            </div>
                        ) : filtered.map(f => (
                            <div
                                key={f._id}
                                onClick={() => { setSelected(f); setAdminResponse(f.adminResponse || ''); }}
                                className={cn("p-6 rounded-[2rem] border cursor-pointer hover:shadow-xl transition-all group relative overflow-hidden",
                                    selected?._id === f._id ? "border-orange-500 bg-orange-50/10 ring-2 ring-orange-500/5" : "bg-white border-slate-100 hover:border-orange-200")}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-2">
                                        <span className={cn("px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase border",
                                            f.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100')}>
                                            {f.status.replace('_', ' ')}
                                        </span>
                                        <span className="px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-slate-50 text-slate-400 border border-slate-100">#{f._id.slice(-4)}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">{new Date(f.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors text-lg tracking-tight">{f.title}</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 border border-slate-200">
                                            {f.student?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 leading-none">{f.student?.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{f.student?.studentId}</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                                        {f.category}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selected && (
                <div className="w-full md:w-1/2 bg-white rounded-[3rem] border border-slate-200 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/30">
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-orange-600 tracking-widest uppercase">
                                <ShieldAlert className="h-4 w-4" />
                                Complaint Resolution Desk
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selected.title}</h2>
                        </div>
                        <button onClick={() => setSelected(null)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100 text-slate-400">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                        <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform">
                                <MessageSquare className="h-32 w-32" />
                            </div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Original Grievance</h3>
                            <p className="text-slate-700 leading-relaxed font-medium text-base whitespace-pre-wrap relative z-10">{selected.description}</p>
                        </div>

                        <div>
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                Official Response & Actions
                            </h3>
                            <textarea
                                className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all resize-none text-sm font-medium placeholder:italic placeholder:text-slate-300 min-h-[200px]"
                                placeholder="Detail the official resolution path, actions taken, or internal remarks for this student..."
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                            ></textarea>

                            <div className="flex gap-4 mt-8">
                                <button 
                                    onClick={() => handleUpdate('IN_REVIEW')} 
                                    disabled={updating}
                                    className="flex-1 px-6 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <Clock className="h-4 w-4" /> In Review
                                </button>
                                <button 
                                    onClick={() => handleUpdate('RESOLVED')} 
                                    disabled={updating}
                                    className="flex-[2] px-6 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest bg-[#f4511e] text-white shadow-xl shadow-orange-600/20 hover:bg-[#d84315] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    {updating ? <Loader2 className="animate-spin h-5 w-5" /> : <><CheckCircle2 className="h-5 w-5" /> Resolve & Publish</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackManagement;
