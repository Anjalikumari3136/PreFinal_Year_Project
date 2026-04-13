import React, { useState } from 'react';
import { 
    Send, 
    Users, 
    GraduationCap, 
    ShieldCheck, 
    MessageCircle, 
    AlertCircle, 
    Loader2, 
    CheckCircle2, 
    Bell, 
    Mail, 
    Radio,
    TrendingUp,
    Info
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const NoticeCenter = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [audience, setAudience] = useState('BOTH'); // STUDENT, FACULTY, BOTH
    const [loading, setLoading] = useState(false);

    const handleBroadcast = async (e) => {
        e.preventDefault();
        if (!title.trim() || !message.trim()) return;

        setLoading(true);
        const broadcastToast = toast.loading('Establishing broadcast link...');
        
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`${API_BASE_URL}/api/admin/broadcast`, { 
                title, 
                message, 
                audience 
            }, config);
            
            toast.success(data.message, { id: broadcastToast });
            setTitle('');
            setMessage('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Broadcast protocol failed.', { id: broadcastToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest italic">Broadcast Bureau</span>
                        <div className="h-1 w-1 rounded-full bg-slate-200"></div>
                        <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest italic tracking-[0.2em]">Notice Center v1.0</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Command Hub</h1>
                    <p className="text-slate-500 mt-4 text-sm font-medium max-w-lg">Execute authoritative campus-wide proclamations. Your messages will be immediately delivered via encrypted institutional email channels.</p>
                </div>
                <div className="h-20 w-20 rounded-[2rem] bg-orange-600 text-white flex items-center justify-center shadow-2xl relative z-10 shadow-orange-600/30">
                    <Radio className="h-10 w-10 animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Configuration Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 italic flex items-center gap-2">
                            <Users className="h-3 w-3" /> Targeted Audience
                        </h3>
                        
                        <div className="space-y-4 relative z-10">
                            {[
                                { id: 'BOTH', label: 'Universal', sub: 'Faculty + Students', icon: Users, color: 'bg-indigo-600' },
                                { id: 'FACULTY', label: 'Faculty Only', sub: 'Institutional Heads', icon: ShieldCheck, color: 'bg-emerald-600' },
                                { id: 'STUDENT', label: 'Students Only', sub: 'Scholars Circle', icon: GraduationCap, color: 'bg-orange-600' }
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setAudience(opt.id)}
                                    className={cn(
                                        "w-full p-4 rounded-3xl border text-left transition-all flex items-center gap-4 relative overflow-hidden group/opt",
                                        audience === opt.id 
                                            ? "bg-slate-900 border-slate-900 text-white shadow-xl scale-105" 
                                            : "bg-white border-slate-100 hover:border-slate-300 shadow-sm"
                                    )}
                                >
                                    <div className={cn(
                                        "h-10 w-10 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover/opt:scale-110",
                                        audience === opt.id ? "bg-white/10" : opt.color + " text-white"
                                    )}>
                                        <opt.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tight leading-none mb-1">{opt.label}</p>
                                        <p className={cn("text-[9px] font-bold uppercase tracking-widest", audience === opt.id ? "text-slate-400" : "text-slate-400")}>{opt.sub}</p>
                                    </div>
                                    {audience === opt.id && <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-400" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats Metric */}
                    <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group">
                        <TrendingUp className="absolute top-0 right-0 h-40 w-40 -mr-16 -mt-16 opacity-10 group-hover:scale-125 transition-transform duration-700" />
                        <h5 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70 italic">Security Protocol</h5>
                        <p className="text-lg font-black tracking-tight leading-tight mb-2">Automated Campus-Wide Sync Engaged</p>
                        <p className="text-[10px] text-indigo-200">Broadcast ID: {Date.now().toString().slice(-8)}</p>
                    </div>
                </div>

                {/* Broadcast Composer */}
                <form onSubmit={handleBroadcast} className="lg:col-span-8 space-y-8">
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-inner">
                                <MessageCircle className="h-5 w-5 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Draft Proclamation</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.6em] ml-6 italic">Subject Line</label>
                                <input 
                                    type="text"
                                    required
                                    className="w-full px-8 py-6 bg-slate-50/50 border border-slate-100 text-slate-900 rounded-[2rem] focus:ring-[15px] focus:ring-slate-100 focus:border-indigo-500/50 transition-all outline-none font-black text-lg tracking-tight placeholder:text-slate-300 placeholder:italic placeholder:font-normal"
                                    placeholder="Enter authoritative subject..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[8px] font-black text-slate-400 uppercase tracking-[0.6em] ml-6 italic">Core Message Content</label>
                                <textarea
                                    required
                                    rows="8"
                                    className="w-full px-10 py-8 bg-slate-50 border border-slate-100 text-slate-800 rounded-[3rem] focus:ring-[15px] focus:ring-slate-100 focus:border-indigo-500/50 transition-all outline-none font-bold text-base leading-relaxed placeholder:text-slate-300 placeholder:font-normal placeholder:italic resize-none shadow-inner scrollbar-hide"
                                    placeholder="Type your official announcement here. Keep it professional and authoritative."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-[2.5rem] flex items-center justify-between gap-6 shadow-2xl relative overflow-hidden group/term">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20 transition-opacity group-hover/term:opacity-40"></div>
                            <div className="flex items-center gap-4 relative z-10 px-4">
                                <Mail className="h-8 w-8 text-indigo-400 stroke-[1]" />
                                <div>
                                    <p className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-1 italic">Channel Selection</p>
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">SMTP Protocol Engaged via Brevo</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !title.trim() || !message.trim()}
                                className="group/btn relative z-10 h-16 px-10 bg-indigo-600 hover:bg-white text-white hover:text-indigo-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50 flex items-center gap-4"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (
                                    <>
                                        Authorize Broadcast
                                        <Send className="h-4 w-4 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="flex items-center gap-3 justify-center text-[8px] font-black text-slate-300 uppercase tracking-[0.6em] italic pt-4">
                            <Info className="h-3 w-3" /> Trace Log Authored by Super Admin Terminal
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoticeCenter;
