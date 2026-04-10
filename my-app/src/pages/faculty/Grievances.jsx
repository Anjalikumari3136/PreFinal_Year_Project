import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    ShieldCheck,
    Clock,
    X,
    CheckCircle2,
    Loader2,
    AlertCircle,
    Search,
    Filter,
    TrendingUp,
    MessageCircle,
    Send,
    ChevronRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

const GrievanceResolution = () => {
    const { user } = useAuth();
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [response, setResponse] = useState('');
    const [updating, setUpdating] = useState(false);

    const fetchGrievances = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/faculty/grievances', config);
            setGrievances(data);
        } catch (error) {
            // Fallback for demo
            setGrievances([]);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchGrievances(); }, []);

    const handleResolve = async (e) => {
        e.preventDefault();
        if (!response.trim()) return;
        setUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`https://prefinal-year-project.onrender.com/api/faculty/grievances/${selected._id}`, { response }, config);
            toast.success('Resolution recorded');
            setSelected(null);
            setResponse('');
            fetchGrievances();
        } catch (error) { toast.error('Failed to update grievance'); }
        setUpdating(false);
    };

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-orange-600" /></div>;

    return (
        <div className="flex h-[calc(100vh-10rem)] gap-8 animate-in fade-in duration-500 overflow-hidden">
            <div className={cn("flex-1 flex flex-col transition-all duration-500", selected ? "w-1/2 hidden md:flex" : "w-full")}>
                <div className="mb-8 space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Assigned Grievances</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-orange-600 decoration-2 underline-offset-4">Bureau Resolution Terminal</p>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="p-8 border-b border-slate-50 flex gap-4 bg-slate-50/30">
                        <div className="relative flex-1 group/search">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within/search:text-orange-500 transition-colors" />
                            <input className="w-full pl-14 pr-8 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all outline-none" placeholder="Search tokens or student IDs..." />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-8 space-y-5 custom-scrollbar">
                        {grievances.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 p-10 text-center">
                                <ShieldCheck className="h-16 w-16 mb-4" />
                                <p className="font-black text-sm uppercase tracking-widest">No assigned grievances found.</p>
                                <p className="text-xs mt-2 uppercase tracking-tight">Your terminal will alert you when new tickets arrive.</p>
                            </div>
                        ) : grievances.map(g => (
                            <div
                                key={g._id}
                                onClick={() => setSelected(g)}
                                className={cn("p-8 rounded-[2.5rem] border transition-all cursor-pointer group hover:bg-[#171317] hover:border-[#171317] active:scale-[0.98]",
                                    selected?._id === g._id ? "border-orange-600 ring-2 ring-orange-500/5 bg-slate-50" : "bg-white border-slate-50")}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-2">
                                        <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            g.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-500/5" : "bg-orange-50 text-orange-600 border-orange-100 shadow-sm shadow-orange-500/5")}>
                                            {g.status.replace('_', ' ')}
                                        </span>
                                        <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-slate-100 group-hover:bg-white/10 group-hover:text-slate-300">#{g.category}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-slate-500 transition-colors">{new Date(g.createdAt).toDateString()}</span>
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-white transition-all tracking-tight uppercase italic">{g.title}</h4>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 group-hover:bg-white/10 group-hover:border-white/10 group-hover:text-white flex items-center justify-center font-black text-lg text-slate-400 shadow-sm">
                                        {g.student?.name?.charAt(0) || 'S'}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-slate-900 leading-none mb-1 group-hover:text-white transition-colors">{g.student?.name || 'Anonymous Student'}</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{g.student?.studentId || 'SCHOLAR PROTOCOL'}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:translate-x-2 group-hover:text-orange-600 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selected && (
                <div className="w-full md:w-1/2 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right-20 duration-500">
                    <div className="p-10 border-b border-slate-50 flex justify-between items-start bg-slate-50/50">
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-[9px] font-black text-orange-600 tracking-[0.25em] uppercase italic underline decoration-slate-200 underline-offset-4">
                                <ShieldCheck className="h-4 w-4" /> Official Case Review
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic underline decoration-orange-600/50 decoration-8 underline-offset-[12px]">{selected.title}</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6">ID: #{selected._id.slice(-12).toUpperCase()}</p>
                        </div>
                        <button onClick={() => setSelected(null)} className="p-4 hover:bg-white rounded-3xl transition-all shadow-sm border border-transparent hover:border-slate-200 text-slate-400 active:scale-90">
                            <X className="h-7 w-7" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar bg-[#fcfcfc]">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:rotate-12 transition-transform"><MessageSquare className="h-48 w-48" /></div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 underline decoration-orange-600 decoration-2 underline-offset-4">Student Statement</h3>
                            <p className="text-slate-800 leading-relaxed font-bold text-lg italic relative z-10">"{selected.description}"</p>
                        </div>

                        <div className="bg-[#171317] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group/desk">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[120px] -mr-32 -mt-32 opacity-30 shadow-orange-600/50 group-hover/desk:opacity-50 transition-opacity"></div>
                            <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.25em] mb-10 flex items-center gap-4 italic underline decoration-white/10 underline-offset-8">
                                <TrendingUp className="h-5 w-5" /> Resolution Desk Protocol
                            </h3>
                            <form onSubmit={handleResolve} className="space-y-8 relative z-10">
                                <div>
                                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-1">Case Disposition Remarks</label>
                                    <textarea
                                        required
                                        rows="6"
                                        className="w-full px-10 py-8 bg-white text-slate-900 rounded-[2.5rem] focus:ring-[12px] focus:ring-orange-600/10 focus:border-orange-500 transition-all outline-none font-bold text-base leading-relaxed placeholder:font-normal placeholder:italic resize-none shadow-inner"
                                        placeholder="Record official resolution or internal follow-up protocol here..."
                                        value={response}
                                        onChange={(e) => setResponse(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={updating || !response.trim()}
                                    className="w-full py-6 bg-orange-600 hover:bg-orange-700 text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-orange-600/40 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                                >
                                    {updating ? <Loader2 className="animate-spin h-5 w-5" /> : <><Send className="h-5 w-5" /> Finalize Case Resolution</>}
                                </button>
                            </form>
                            <div className="mt-8 flex justify-center">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">Authorized Faculty Access Only • Trace ID: {user._id.slice(-6)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrievanceResolution;
