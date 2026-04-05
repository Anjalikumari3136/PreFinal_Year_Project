import React, { useState, useEffect } from 'react';
import { 
    Users, 
    Calendar, 
    Clock, 
    Search, 
    CheckCircle2, 
    Clock3, 
    AlertCircle, 
    X, 
    Loader2, 
    GraduationCap,
    TrendingUp,
    MessageCircle,
    ClipboardList
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

const MentorshipManagement = () => {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [filter, setFilter] = useState('All');

    const fetchSessions = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/admin/mentorship', config);
            setSessions(data);
        } catch (error) { toast.error('Failed to load sessions'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchSessions(); }, []);

    const handleUpdateStatus = async (sessionId, status) => {
        setUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`https://prefinal-year-project.onrender.com/api/admin/mentorship/${sessionId}`, { status }, config);
            toast.success(`Session marked as ${status}`);
            setSelected(null);
            fetchSessions();
        } catch (error) { toast.error('Update failed'); }
        setUpdating(false);
    };

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-orange-600" /></div>;

    const filtered = filter === 'All' 
        ? sessions 
        : sessions.filter(s => s.status === filter.toUpperCase().replace(' ', '_'));

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-8 animate-in fade-in duration-500">
            <div className={cn("flex-1 flex flex-col transition-all duration-300", selected ? "w-1/2 hidden md:flex" : "w-full")}>
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">Mentorship Hub</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tracking Student Guidance & Counseling</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        {['All', 'Pending', 'Scheduled', 'Completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    filter === f ? "bg-orange-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                            <input className="w-full pl-11 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-8 focus:ring-orange-500/5 transition-all outline-none" placeholder="Search sessions or students..." />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-6 space-y-4 custom-scrollbar">
                        {filtered.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                                <Users className="h-12 w-12 mb-3" />
                                <p className="font-bold text-sm uppercase tracking-widest">No sessions found.</p>
                            </div>
                        ) : filtered.map(s => (
                            <div
                                key={s._id}
                                onClick={() => setSelected(s)}
                                className={cn("p-6 rounded-[2rem] border cursor-pointer hover:shadow-xl transition-all relative group",
                                    selected?._id === s._id ? "border-orange-500 bg-orange-50/10 ring-2 ring-orange-500/5" : "bg-white border-slate-100 hover:border-orange-200")}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest">
                                        <span className={cn("px-3 py-1 rounded-full border",
                                            s.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100')}>
                                            {s.status.replace('_', ' ')}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-100">#{s.type}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(s.date).toLocaleDateString()}</span>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-orange-600 transition-colors tracking-tight">{s.topic}</h4>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-orange-600/20">
                                            {s.student?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 leading-none">{s.student?.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Student</p>
                                        </div>
                                    </div>
                                    <div className="h-8 w-px bg-slate-100"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                                            {s.faculty?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black text-slate-900 leading-none">{s.faculty?.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Mentor</p>
                                        </div>
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
                                <GraduationCap className="h-4 w-4" /> Mentorship Details
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{selected.topic}</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">ID: #{selected._id.slice(-6)}</p>
                        </div>
                        <button onClick={() => setSelected(null)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100 text-slate-400">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Scheduled Date</p>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-orange-600" />
                                    <span className="font-black text-slate-900 text-sm tracking-tight">{new Date(selected.date).toDateString()}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Meeting Time</p>
                                <div className="flex items-center gap-3">
                                    <Clock3 className="h-5 w-5 text-orange-600" />
                                    <span className="font-black text-slate-900 text-sm tracking-tight">{selected.time || '10:30 AM'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform"><MessageCircle className="h-32 w-32" /></div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Student Note</h3>
                            <p className="text-slate-700 leading-relaxed font-bold text-base whitespace-pre-wrap relative z-10">{selected.note || "No specific notes provided."}</p>
                        </div>

                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-600 rounded-full blur-[100px] -mr-24 -mt-24 opacity-30"></div>
                            <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <ClipboardList className="h-4 w-4" /> Admin Action Panel
                            </h3>
                            <div className="flex flex-col gap-4">
                                <button 
                                    onClick={() => handleUpdateStatus(selected._id, 'SCHEDULED')}
                                    disabled={updating}
                                    className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                                >
                                    <Clock className="h-4 w-4" /> Schedule Session
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus(selected._id, 'COMPLETED')}
                                    disabled={updating}
                                    className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    {updating ? <Loader2 className="animate-spin h-4 w-4" /> : <><CheckCircle2 className="h-4 w-4" /> Mark Completed</>}
                                </button>
                                <button 
                                    onClick={() => handleUpdateStatus(selected._id, 'CANCELLED')}
                                    disabled={updating}
                                    className="w-full py-4 text-slate-500 hover:text-rose-400 transition-colors text-[9px] font-black uppercase tracking-widest"
                                >
                                    Cancel Session
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorshipManagement;
