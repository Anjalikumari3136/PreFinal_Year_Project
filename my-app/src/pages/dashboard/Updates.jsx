import React, { useState, useEffect } from 'react';
import { 
    Bell, 
    Calendar, 
    ChevronRight, 
    Megaphone, 
    Info, 
    ShieldCheck, 
    Clock, 
    Mail, 
    Trash2,
    Loader2,
    MessageSquare,
    AlertCircle,
    CheckCircle2,
    Briefcase
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const Updates = () => {
    const { user } = useAuth();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotices = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/notices`, config);
            setNotices(data);
        } catch (error) {
            console.error('Fetch notices error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-orange-600 animate-pulse">
                <Loader2 className="h-12 w-12 animate-spin" />
                <p className="font-black uppercase tracking-[0.4em] text-xs">Syncing Terminal Updates...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
            {/* Header Proclamation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-[#171317] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600 rounded-full blur-[120px] opacity-20 -mr-40 -mt-40 transition-opacity group-hover:opacity-30"></div>
                
                <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-orange-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest italic">Live Feed</span>
                        <div className="h-1 w-1 rounded-full bg-orange-500 animate-ping"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none italic uppercase">Campus Updates</h1>
                    <p className="text-slate-400 text-sm font-semibold max-w-sm leading-relaxed uppercase tracking-widest opacity-80 decoration-orange-600/50 underline underline-offset-[12px] decoration-4">
                        Authoritative institutional proclamations and strategic alerts.
                    </p>
                </div>
                
                <div className="flex gap-4 relative z-10">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex flex-col items-center gap-1 shadow-2xl min-w-[100px]">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Archive</p>
                        <p className="text-xl font-black text-orange-500 leading-none">{notices.length}</p>
                    </div>
                </div>
            </div>

            {/* Updates Feed */}
            {notices.length === 0 ? (
                <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent"></div>
                     <div className="relative z-10">
                        <div className="h-24 w-24 rounded-[2.5rem] bg-slate-50 text-slate-200 flex items-center justify-center mx-auto mb-8 border border-slate-100 shadow-inner group-hover:rotate-6 transition-transform">
                            <Bell className="h-10 w-10 opacity-20" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-2">Radio Silence</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">No official updates have been disseminated yet.</p>
                     </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {notices.map((notice) => (
                        <div key={notice._id} className="group bg-white rounded-[3.5rem] border border-slate-100 p-10 hover:shadow-2xl hover:border-orange-200 transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-10">
                            <div className="absolute top-0 right-0 w-[400px] h-full bg-orange-600 rounded-full blur-[100px] opacity-[0.01] -mr-48 transition-opacity group-hover:opacity-[0.03]"></div>
                            
                            {/* Date & Meta Sidebar */}
                            <div className="md:w-32 flex flex-col items-center gap-4 shrink-0 relative z-10">
                                <div className="p-4 bg-orange-50 rounded-3xl text-orange-600 flex flex-col items-center justify-center shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
                                    <span className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">
                                        {new Date(notice.createdAt).toLocaleString('default', { month: 'short' })}
                                    </span>
                                    <span className="text-3xl font-black tracking-tighter leading-none italic">
                                        {new Date(notice.createdAt).getDate()}
                                    </span>
                                </div>
                                <div className="h-full w-px bg-slate-100"></div>
                                <Clock className="h-4 w-4 text-slate-200 group-hover:text-orange-300 transition-colors" />
                            </div>

                            {/* Content Bureau */}
                            <div className="flex-1 space-y-6 relative z-10">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[8px] font-black text-orange-500 uppercase tracking-[0.4em] italic leading-none underline decoration-orange-200 underline-offset-4 decoration-2">Official Release</span>
                                            <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase italic group-hover:text-orange-600 transition-colors">{notice.title}</h3>
                                    </div>
                                    <div className="px-4 py-2 bg-slate-950 text-white rounded-xl flex items-center gap-3 shadow-xl group-hover:translate-x-2 transition-transform">
                                        <ShieldCheck className="h-4 w-4 text-orange-500" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Verified Auth</span>
                                    </div>
                                </div>

                                <div className="p-8 bg-slate-50/80 rounded-[2.5rem] border border-slate-100 shadow-inner group-hover:bg-white transition-colors duration-500">
                                    <p className="text-slate-700 font-bold leading-relaxed text-sm whitespace-pre-wrap">{notice.message}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs border border-indigo-100">
                                            {notice.admin?.name?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 leading-none">Originator</p>
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tight italic">{notice.admin?.name || 'Administrator Bureau'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300 group-hover:text-orange-300 transition-colors">
                                        <span className="text-[8px] font-black uppercase tracking-widest italic">UniSupport Proclamation System 2.4</span>
                                        <Info className="h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Security Footer */}
                    <div className="pt-10 flex items-center justify-center gap-6">
                        <div className="h-px flex-1 bg-slate-100"></div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <Megaphone className="h-4 w-4 rotate-12 opacity-50" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] italic opacity-50">End of Proclamation Feed</span>
                        </div>
                        <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Updates;
