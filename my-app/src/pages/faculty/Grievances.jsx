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
    ChevronRight,
    User,
    ArrowLeft,
    Inbox,
    FileText,
    History,
    Zap,
    MapPin,
    Calendar,
    ChevronLeft
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const GrievanceResolution = () => {
    const { user } = useAuth();
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [response, setResponse] = useState('');
    const [updating, setUpdating] = useState(false);
    const [filter, setFilter] = useState('ALL'); 
    const [searchTerm, setSearchTerm] = useState('');

    const fetchGrievances = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/faculty/grievances`, config);
            setGrievances(data);
        } catch (error) {
            toast.error('Sync failed. Reconnecting...');
            setGrievances([]);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchGrievances(); }, []);

    const handleResolve = async (e) => {
        e.preventDefault();
        if (!response.trim()) return;
        setUpdating(true);
        const loadingToast = toast.loading('Executing Final Resolution Protocol...');
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_BASE_URL}/api/faculty/grievances/${selected._id}`, { response }, config);
            toast.success('Case Officially Closed', { id: loadingToast });
            setSelected(null);
            setResponse('');
            fetchGrievances();
        } catch (error) { 
            toast.error('Resolution failed. Protocol error.', { id: loadingToast }); 
        }
        setUpdating(false);
    };

    const filteredGrievances = grievances.filter(g => {
        const matchesFilter = filter === 'ALL' || g.status === filter;
        const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             g.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             g._id.includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
            <div className="relative">
                <div className="h-10 w-10 border-2 border-orange-100 rounded-full"></div>
                <div className="absolute top-0 h-10 w-10 border-2 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Secure Uplink...</p>
        </div>
    );

    // BATCH VIEW: REGISTRY LIST (RESCALED)
    if (!selected) {
        return (
            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[8px] font-black uppercase tracking-widest italic leading-none">Console</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic opacity-60">Authorized Faculty Registry</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Assigned Desk</h1>
                    </div>
                    <div className="flex bg-white rounded-xl border border-slate-100 p-1 shadow-sm">
                        {['ALL', 'PENDING', 'RESOLVED'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all",
                                    filter === f ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-lg overflow-hidden min-h-[50vh] flex flex-col">
                    <div className="p-4 border-b border-slate-50 bg-slate-50/10 flex gap-3">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                            <input 
                                className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all outline-none" 
                                placeholder="Locate by token or student..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredGrievances.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20 opacity-40">
                                <Inbox className="h-12 w-12 mb-3 stroke-1" />
                                <p className="font-black text-[9px] uppercase tracking-[0.2em]">Registry Clear</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {filteredGrievances.map(g => (
                                    <div
                                        key={g._id}
                                        onClick={() => {
                                            setSelected(g);
                                            setResponse(g.resolutionNotes || '');
                                        }}
                                        className="p-5 hover:bg-slate-50 transition-all cursor-pointer group flex items-center justify-between gap-6 border-l-4 border-transparent hover:border-orange-600"
                                    >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex-shrink-0 flex items-center justify-center text-sm font-black text-slate-400 shadow-sm group-hover:scale-105 group-hover:bg-slate-900 group-hover:text-white transition-all italic">
                                                {g.student?.name?.charAt(0) || 'S'}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-orange-600 transition-colors truncate uppercase italic">{g.title}</h4>
                                                    <span className={cn(
                                                        "px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border",
                                                        g.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                                    )}>
                                                        {g.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{g.student?.name}</p>
                                                    <span className="h-0.5 w-0.5 rounded-full bg-slate-200"></span>
                                                    <p className="text-[8px] font-bold text-slate-300 uppercase">Token: #{g._id.slice(-8)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-[9px] font-bold text-slate-900 leading-none mb-0.5">{new Date(g.createdAt).toLocaleDateString()}</p>
                                                <p className="text-[7px] font-black text-slate-300 uppercase">Entry Date</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-slate-200 group-hover:translate-x-1 group-hover:text-orange-500 transition-all font-bold" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // FRESH PAGE VIEW: FULL DETAIL (RESCALED & COMPACT)
    return (
        <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500 pb-10">
            {/* Compactor Nav Header */}
            <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-md">
                <button 
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-3 px-6 py-2.5 rounded-xl bg-slate-900 text-white group hover:bg-orange-600 transition-all font-black text-[9px] uppercase tracking-widest"
                >
                    <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Registry
                </button>
                <div className="flex items-center gap-4 italic h-8">
                    <div className="text-right">
                        <p className="text-[8px] font-black text-orange-600 uppercase tracking-widest leading-none mb-1">Token</p>
                        <h4 className="text-sm font-black text-slate-900 tracking-tighter leading-none uppercase">#{selected._id.slice(-12)}</h4>
                    </div>
                    <div className="h-full w-[1px] bg-slate-100"></div>
                     <div className="text-right">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Mode</p>
                        <span className={cn(
                            "inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase border leading-none italic",
                            selected.status === 'RESOLVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                        )}>
                            {selected.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Case Workspace (Rescaled) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Information Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-[40px] -mr-16 -mt-16"></div>
                        <div className="relative">
                            <div className="h-20 w-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-3xl font-black italic shadow-xl mx-auto mb-4 transform hover:rotate-3 transition-transform">
                                {selected.student?.name?.charAt(0)}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1 uppercase italic leading-none">{selected.student?.name}</h3>
                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Course Scholar</p>
                            
                            <div className="space-y-4 pt-6 border-t border-slate-50 text-left">
                                <div>
                                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1 italic flex items-center gap-2">
                                        <Zap className="h-3 w-3" /> Unique ID
                                    </p>
                                    <p className="text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100/50">{selected.student?.studentId}</p>
                                </div>
                                <div>
                                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest mb-1 italic flex items-center gap-2">
                                        <Search className="h-3 w-3" /> Identity Sync
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100/50 truncate italic">{selected.student?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compact Security Badge */}
                    <div className="bg-orange-600 p-6 rounded-[2rem] text-white shadow-xl shadow-orange-600/20 relative overflow-hidden group">
                        <ShieldCheck className="absolute top-0 right-0 h-24 w-24 -mr-8 -mt-8 opacity-20 transform group-hover:scale-110 transition-transform duration-700" />
                        <div className="relative z-10 italic">
                            <h5 className="text-[8px] font-black uppercase tracking-widest opacity-70 mb-2">Protocol</h5>
                            <p className="text-lg font-black tracking-tight leading-none mb-1">Authenticated Desk Active</p>
                            <p className="text-[7px] font-bold text-orange-200 uppercase opacity-60">Ref: {user._id.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>
                </div>

                {/* Case Details (Compact) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Compact Progress Monitor */}
                    <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'DISPATCHED', icon: Send, active: true },
                                { label: 'PROCESSING', icon: FileText, active: true },
                                { label: 'FINALIZED', icon: CheckCircle2, active: selected.status === 'RESOLVED' }
                            ].map((s, i) => (
                                <div key={i} className={cn(
                                    "p-3 rounded-xl border flex gap-3 items-center transition-all",
                                    s.active ? "bg-white border-orange-100 shadow-sm" : "bg-slate-50/50 border-transparent opacity-20 saturate-0"
                                )}>
                                    <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-md",
                                        s.active ? "bg-orange-600" : "bg-slate-300"
                                    )}>
                                        <s.icon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5 italic">0{i+1}</p>
                                        <p className="text-[9px] font-black text-slate-900 uppercase tracking-tighter leading-none truncate">{s.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Official Statement (Compact) */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] -rotate-12 group-hover:scale-105 transition-transform"><MessageCircle className="h-40 w-40" /></div>
                        <div className="flex items-center gap-3 mb-6 font-serif">
                            <div className="h-6 w-6 rounded-lg bg-orange-50 flex items-center justify-center">
                                <MessageSquare className="h-3 w-3 text-orange-600" />
                            </div>
                            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic underline decoration-slate-200 underline-offset-4">Statement Registry</h3>
                        </div>
                        <div className="bg-slate-50/70 p-8 rounded-3xl border border-slate-100 relative z-10">
                            <p className="text-slate-800 leading-relaxed font-bold text-lg italic tracking-tight underline decoration-orange-600/5 decoration-4">"{selected.description}"</p>
                        </div>
                    </div>

                    {/* Ultimate Action Terminal (Sleek) */}
                    <div className="bg-[#111111] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group/desk border border-white/5">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600 rounded-full blur-[120px] -mr-40 -mt-40 opacity-10 transition-opacity group-hover/desk:opacity-20"></div>
                        
                        <div className="relative z-10 flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-black tracking-tight uppercase italic leading-none mb-1 text-white">Bureau Disposition</h3>
                                <p className="text-[7px] font-bold text-slate-600 uppercase tracking-[0.4em] italic leading-none">Institutional Protocol Active</p>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-orange-600 shadow-lg shadow-orange-600/50"></div>
                        </div>

                        <form onSubmit={handleResolve} className="relative z-10 space-y-6">
                            <div className="space-y-3">
                                <label className="block text-[7px] font-black text-slate-600 uppercase tracking-widest ml-4">Official Remarks Console</label>
                                <textarea
                                    readOnly={selected.status === 'RESOLVED'}
                                    required
                                    rows="4"
                                    className="w-full px-8 py-6 bg-white/5 border border-white/10 text-white rounded-[1.5rem] focus:ring-[8px] focus:ring-orange-600/10 focus:border-orange-500/50 transition-all outline-none font-bold text-sm leading-relaxed placeholder:text-slate-700 placeholder:italic resize-none backdrop-blur-xl shadow-inner scrollbar-hide"
                                    placeholder="Enter case resolution protocol..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                />
                            </div>

                            {selected.status !== 'RESOLVED' ? (
                                <button
                                    type="submit"
                                    disabled={updating || !response.trim()}
                                    className="group/btn w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                                >
                                    {updating ? <Loader2 className="animate-spin h-4 w-4" /> : <><Zap className="h-4 w-4 group-hover/btn:scale-110 transition-transform" /> Execute Official Case Closure</>}
                                </button>
                            ) : (
                                <div className="w-full py-5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl backdrop-blur-md">
                                    <ShieldCheck className="h-5 w-5 stroke-[3]" /> Case Closed & Sync Complete
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrievanceResolution;
