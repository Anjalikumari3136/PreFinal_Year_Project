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
    Star
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

const FacultyMentorship = () => {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [filter, setFilter] = useState('All');

    const fetchSessions = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/faculty/mentorship', config);
            setSessions(data);
        } catch (error) { setSessions([]); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchSessions(); }, []);

    const handleUpdateStatus = async (sessionId, status) => {
        setUpdating(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`https://prefinal-year-project.onrender.com/api/faculty/mentorship/${sessionId}`, { status }, config);
            toast.success(`Session ${status.toLowerCase()}`);
            setSelected(null);
            fetchSessions();
        } catch (error) { toast.error('Status update failed'); }
        finally { setUpdating(false); }
    };

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-orange-600" /></div>;

    const filtered = filter === 'All' 
        ? sessions 
        : sessions.filter(s => s.status === filter.toUpperCase().replace(' ', '_'));

    return (
        <div className="flex h-[calc(100vh-10rem)] gap-8 animate-in fade-in duration-700 overflow-hidden">
            <div className={cn("flex-1 flex flex-col transition-all duration-500", selected ? "w-1/3 hidden lg:flex" : "w-full")}>
                <div className="mb-8 space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Mentee Console</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-orange-600 decoration-2 underline-offset-4">Academic Advisory & Mentorship Bureau</p>
                </div>

                <div className="flex bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm w-fit mb-8 overflow-hidden">
                    {['All', 'Pending', 'Scheduled', 'Completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all italic",
                                filter === f ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-900"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm flex-1 overflow-hidden flex flex-col relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="p-8 border-b border-slate-50 flex gap-4 bg-slate-50/20 relative z-10">
                        <div className="relative flex-1 group/search">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within/search:text-orange-500 transition-colors" />
                            <input className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all outline-none" placeholder="Search by name, ID or scholarly status..." />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-8 space-y-6 custom-scrollbar relative z-10">
                        {filtered.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 p-10 text-center">
                                <GraduationCap className="h-16 w-16 mb-4" />
                                <p className="font-black text-sm uppercase tracking-widest leading-relaxed">No mentee records found in this category.</p>
                                <p className="text-[10px] mt-2 uppercase tracking-tight italic text-orange-600 underline">Awaiting system allocation</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filtered.map(s => (
                                    <div
                                        key={s._id}
                                        onClick={() => setSelected(s)}
                                        className={cn("p-8 rounded-[3rem] border transition-all cursor-pointer group flex flex-col justify-between h-[320px] relative overflow-hidden active:scale-[0.97]",
                                            selected?._id === s._id ? "border-orange-600 bg-slate-50 ring-2 ring-orange-500/5" : "bg-white border-slate-100 hover:shadow-2xl hover:border-orange-200 hover:-translate-y-1")}
                                    >
                                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform"><TrendingUp className="h-48 w-48" /></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-6">
                                                <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                                                    s.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100')}>
                                                    {s.status.replace('_', ' ')}
                                                </span>
                                                <Star className="h-5 w-5 text-orange-500 shadow-sm" />
                                            </div>
                                            <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic line-clamp-2 leading-none group-hover:text-orange-600 transition-colors">{s.topic}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Submitted: {new Date(s.createdAt).toDateString()}</p>
                                        </div>
                                        <div className="flex items-center gap-5 pt-6 border-t border-slate-50 relative z-10">
                                            <div className="h-16 w-16 rounded-[1.5rem] bg-[#171317] text-white flex items-center justify-center font-black text-2xl shadow-xl transition-all group-hover:rotate-6">
                                                {s.student?.name?.charAt(0) || 'S'}
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-lg font-black text-slate-900 leading-none mb-1 truncate uppercase italic tracking-tight">{s.student?.name || 'Academic Scholar'}</p>
                                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest truncate">{s.student?.studentId || 'SCHOLAR PROTOCOL'}</p>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                <ChevronRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selected && (
                <div className="w-full lg:w-1/2 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right-32 duration-700">
                    <div className="p-10 border-b border-slate-50 flex justify-between items-start bg-slate-50/50 relative overflow-hidden group/header">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4 text-[9px] font-black text-orange-600 tracking-[0.25em] uppercase italic underline decoration-slate-200 underline-offset-4">
                                <Award className="h-4 w-4" /> Scholastic Review Bureau
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic underline decoration-orange-600/50 decoration-[12px] underline-offset-[12px]">{selected.topic}</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-8">Mentee: {selected.student?.name || 'Institutional Scholar'}</p>
                        </div>
                        <button onClick={() => setSelected(null)} className="p-4 hover:bg-white rounded-3xl transition-all shadow-sm border border-transparent hover:border-slate-100 text-slate-400 active:scale-90 relative z-10">
                            <X className="h-7 w-7" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar bg-[#f8f9fa]/50">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group/note">
                             <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover/note:rotate-12 transition-transform"><MessageCircle className="h-48 w-48" /></div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-8 underline decoration-orange-600 decoration-2 underline-offset-4">Intellectual Statement</h3>
                            <p className="text-slate-800 leading-relaxed font-bold text-lg italic relative z-10">"{selected.requestMessage || selected.note || 'No specific statement provided.'}"</p>
                        </div>

                        <div className="bg-[#171317] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group/action">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[150px] opacity-30 shadow-orange-600/50 -mr-32 -mt-32"></div>
                            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-10 flex items-center gap-4 italic underline decoration-white/10 underline-offset-8">
                                <Shield className="h-5 w-5" /> Board Authority Terminal
                            </h3>
                            <div className="flex flex-col gap-6 relative z-10">
                                {selected.status === 'PENDING' && (
                                    <button 
                                        onClick={() => handleUpdateStatus(selected._id, 'SCHEDULED')}
                                        disabled={updating}
                                        className="w-full py-6 bg-white text-slate-900 border border-white/5 rounded-[1.5rem] tracking-[0.25em] font-black text-[10px] uppercase hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-4 active:scale-95 group/btn"
                                    >
                                        <div className="h-6 w-6 rounded-lg bg-orange-600 group-hover/btn:bg-white flex items-center justify-center transition-colors">
                                           <Clock className={cn("h-3.5 w-3.5 text-white underline group-hover/btn:text-orange-600")} />
                                        </div>
                                        Authorize Scheduling
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => handleUpdateStatus(selected._id, 'COMPLETED')}
                                    disabled={updating}
                                    className="w-full py-8 bg-[#f4511e] hover:bg-orange-700 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-orange-600/40 transition-all flex items-center justify-center gap-6 active:scale-[0.98] outline-none group/complete"
                                >
                                    {updating ? <Loader2 className="animate-spin h-6 w-6" /> : (
                                        <>
                                            <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center group-hover/complete:scale-110 transition-transform">
                                                <CheckCircle2 className="h-6 w-6" />
                                            </div>
                                            Mark Mission Accomplished
                                        </>
                                    )}
                                </button>
                                
                                <button 
                                    onClick={() => handleUpdateStatus(selected._id, 'REJECTED')}
                                    disabled={updating}
                                    className="w-full py-4 text-slate-500 hover:text-rose-400 transition-all text-[9px] font-black uppercase tracking-[0.5em] italic underline decoration-transparent hover:decoration-rose-600/30 underline-offset-8"
                                >
                                    Protocol Halt (Reject)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[#f8f9fa] border-2 border-dashed border-slate-200 rounded-[4rem] p-12 flex flex-col items-center justify-center text-center group mt-auto w-full max-w-4xl mx-auto">
                 <div className="h-20 w-20 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 transition-transform shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent"></div>
                      <Shield className="h-10 w-10 text-orange-600 relative z-10" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic leading-none mb-4">Integrity Board Protocol</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] max-w-[500px] leading-relaxed opacity-80 decoration-slate-200 underline underline-offset-[8px]">Bureau Note: Your professional guidance is authenticated and securely recorded for institutional quality auditing and student protection.</p>
            </div>
        </div>
    );
};

export default FacultyMentorship;
