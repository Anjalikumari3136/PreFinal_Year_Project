import React, { useState, useEffect } from 'react';
import {
    Users,
    Calendar,
    Clock,
    CheckCircle2,
    Clock3,
    AlertCircle,
    X,
    Loader2,
    Search,
    TrendingUp,
    MessageCircle,
    GraduationCap,
    ChevronRight,
    Activity,
    Shield,
    Award,
    Star,
    ArrowLeft,
    UserCircle2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const FacultyMentorship = () => {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchSessions = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/faculty/mentorship`, config);
            setSessions(data);
        } catch (error) { 
            console.error(error);
            setSessions([]); 
        } finally { 
            setLoading(false); 
        }
    };

    useEffect(() => { fetchSessions(); }, []);

    const handleUpdateStatus = async (sessionId, status) => {
        setUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_BASE_URL}/api/faculty/mentorship/${sessionId}`, { status }, config);
            toast.success(`Request marked as ${status.toLowerCase()}`);
            
            // Update local state instead of full refetch for smoother UI
            setSessions(prev => prev.map(s => s._id === sessionId ? { ...s, status } : s));
            if (selected?._id === sessionId) setSelected(prev => ({ ...prev, status }));
            
            fetchSessions();
        } catch (error) { 
            toast.error('Failed to update status'); 
        } finally { 
            setUpdating(false); 
        }
    };

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin h-12 w-12 text-orange-600" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Mentorship Hub...</p>
        </div>
    );

    const filtered = sessions.filter(s => {
        const matchesFilter = filter === 'All' || s.status === filter.toUpperCase();
        const matchesSearch = 
            s.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.student?.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.topic?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Mentorship <span className="text-orange-600 italic">Hub</span></h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Manage student guidance and academic advisory requests</p>
                </div>
                
                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm border-b-2">
                    {['All', 'Pending', 'Scheduled', 'Completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all",
                                filter === f ? "bg-orange-600 text-white shadow-lg shadow-orange-200" : "text-slate-400 hover:text-slate-900"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Search & List Section */}
                <div className={cn("space-y-6 transition-all duration-500", selected ? "lg:col-span-5" : "lg:col-span-12")}>
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                        <input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[2rem] text-sm font-bold shadow-sm focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all outline-none" 
                            placeholder="Search by student name, ID or topic..." 
                        />
                    </div>

                    <div className={cn("grid gap-4", selected ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
                        {filtered.length === 0 ? (
                            <div className="col-span-full py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-4">
                                <GraduationCap className="h-12 w-12" />
                                <p className="font-bold text-sm uppercase tracking-widest">No matching requests found</p>
                            </div>
                        ) : (
                            filtered.map(s => (
                                <div
                                    key={s._id}
                                    onClick={() => setSelected(s)}
                                    className={cn(
                                        "p-6 rounded-[2rem] border-2 transition-all cursor-pointer group relative overflow-hidden",
                                        selected?._id === s._id 
                                            ? "bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02]" 
                                            : "bg-white border-slate-50 hover:bg-slate-50 hover:border-orange-100 hover:shadow-xl"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={cn(
                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                                            s.status === 'PENDING' ? "bg-orange-100 text-orange-600" : 
                                            s.status === 'SCHEDULED' ? "bg-emerald-100 text-emerald-600" :
                                            "bg-slate-100 text-slate-600"
                                        )}>
                                            {s.status}
                                        </div>
                                        {s.status === 'PENDING' && <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                                                {s.student?.name?.charAt(0) || 'S'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={cn("text-base font-black truncate", selected?._id === s._id ? "text-white" : "text-slate-900")}>
                                                    {s.student?.name}
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {s.student?.studentId}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-100/10">
                                            <p className={cn("text-sm font-bold line-clamp-1", selected?._id === s._id ? "text-slate-300" : "text-slate-600")}>
                                                {s.topic || "Mentorship Request"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right-10 duration-500">
                        {/* Detail Header */}
                        <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-slate-50/30">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 rounded-[2rem] bg-orange-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-orange-100">
                                    {selected.student?.name?.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selected.student?.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selected.student?.studentId}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{selected.student?.department}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelected(null)} 
                                className="p-3 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 text-slate-400 shadow-sm"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4 text-orange-500" /> Request Details
                                </h3>
                                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                                    <p className="text-slate-700 font-bold leading-relaxed">
                                        {selected.requestMessage || "No additional notes provided by the student."}
                                    </p>
                                </div>
                            </div>

                            {selected.status === 'PENDING' && (
                                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl">
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-black italic tracking-tight">Review Required</h4>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Authorize or schedule this mentorship session</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleUpdateStatus(selected._id, 'SCHEDULED')}
                                            disabled={updating}
                                            className="px-8 py-5 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-xl"
                                        >
                                            <Calendar className="h-4 w-4" />
                                            Schedule Session
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(selected._id, 'REJECTED')}
                                            disabled={updating}
                                            className="px-8 py-5 bg-slate-800 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-3"
                                        >
                                            <X className="h-4 w-4" />
                                            Reject Request
                                        </button>
                                    </div>
                                </div>
                            )}

                            {selected.status === 'SCHEDULED' && (
                                <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-lg space-y-6">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="h-6 w-6" />
                                        <h4 className="text-xl font-black italic tracking-tight uppercase">Session Confirmed</h4>
                                    </div>
                                    <p className="text-sm font-bold opacity-90 leading-relaxed uppercase tracking-wide">
                                        The student has been notified. You can now conduct the session as per the university protocol.
                                    </p>
                                    <button
                                        onClick={() => handleUpdateStatus(selected._id, 'COMPLETED')}
                                        disabled={updating}
                                        className="w-full py-5 bg-white text-emerald-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-2xl transition-all shadow-lg shadow-black/10"
                                    >
                                        Mark as Completed
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Support Note */}
            {!selected && (
                <div className="bg-slate-50 rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-4 border-2 border-dashed border-slate-200 opacity-60">
                    <Shield className="h-8 w-8 text-slate-400" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] max-w-lg">
                        All mentorship interactions are recorded for quality assurance. Professional guidance is institutional priority.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FacultyMentorship;
