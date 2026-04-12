import React, { useState, useEffect } from 'react';
import {
    Bell,
    Calendar,
    Megaphone,
    ShieldCheck,
    Clock,
    Mail,
    Info,
    Loader2,
    Briefcase,
    AlertCircle,
    UserCircle,
    Send,
    Plus,
    X,
    MessageSquare
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const FacultyNotices = () => {
    const { user } = useAuth();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [noticeData, setNoticeData] = useState({
        title: '',
        message: '',
        audience: 'STUDENT'
    });

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

    const handleBroadcast = async (e) => {
        e.preventDefault();
        if (!noticeData.title || !noticeData.message) {
            toast.error('Title and message are mandatory for proclamation.');
            return;
        }

        setIsBroadcasting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            // Using the same broadcast endpoint (which I'll ensure faculty can access for STUDENTS)
            await axios.post(`${API_BASE_URL}/api/admin/broadcast`, noticeData, config);
            toast.success('Announcement broadcasted and emails dispatched!');
            setIsModalOpen(false);
            setNoticeData({ title: '', message: '', audience: 'STUDENT' });
            fetchNotices();
        } catch (error) {
            console.error('Broadcast error:', error);
            toast.error(error.response?.data?.message || 'Proclamation failure.');
        } finally {
            setIsBroadcasting(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-indigo-600 animate-pulse">
                <Loader2 className="h-12 w-12 animate-spin" />
                <p className="font-black uppercase tracking-[0.4em] text-xs">Interrogating Archive...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
            {/* Professional Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-20 -mr-40 -mt-40 transition-opacity group-hover:opacity-30"></div>

                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest italic">Institutional Directives</span>
                        <div className="h-1 w-1 rounded-full bg-indigo-500 animate-pulse"></div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none italic uppercase">Notice Board</h1>
                    <p className="text-slate-400 text-sm font-semibold max-w-md leading-relaxed uppercase tracking-widest opacity-80 decoration-indigo-600/50 underline underline-offset-[12px] decoration-4">
                        Strategic administrative broadcasts and official faculty proclamations.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 relative z-10 w-full md:w-auto mt-6 md:mt-0">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 text-white px-8 py-5 rounded-[2rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border-2 border-white/20 group/btn"
                    >
                        <Plus className="h-5 w-5 bg-white text-indigo-600 rounded-full p-1 group-hover/btn:rotate-90 transition-transform" />
                        Proclaim Announcement
                    </button>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl flex items-center gap-4">
                        <UserCircle className="h-10 w-10 text-indigo-400 opacity-50" />
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Designation</p>
                            <p className="text-xs font-black text-indigo-400 leading-none uppercase tracking-tight">{user?.designation || 'Academic Staff'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Toaster position="bottom-right" />

            {/* Broadcast Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-3xl rounded-[4rem] shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-12 duration-500 border border-slate-100 italic font-sans text-slate-900">
                        <div className="h-4 bg-indigo-600"></div>
                        <div className="p-12 space-y-10">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-4xl font-black tracking-tighter leading-none mb-3 italic uppercase">Announce Update</h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-80">Universal proclamation to scholars</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-4 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-full transition-all border border-slate-100">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleBroadcast} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-6">Announcement Title</label>
                                    <input
                                        type="text"
                                        placeholder="EX: EMERGENCY GUIDELINE UPDATE"
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] px-8 py-5 font-black uppercase text-sm tracking-widest focus:border-indigo-600 outline-none transition-all placeholder:opacity-30 italic"
                                        value={noticeData.title}
                                        onChange={(e) => setNoticeData({ ...noticeData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-6">Proclamation Message</label>
                                    <textarea
                                        placeholder="ENTER THE DETAILED MESSAGE TO BE DISSEMINATED TO STUDENTS..."
                                        rows={6}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-[3rem] px-8 py-7 font-bold text-sm tracking-tight focus:border-indigo-600 outline-none transition-all placeholder:opacity-30 italic leading-relaxed"
                                        value={noticeData.message}
                                        onChange={(e) => setNoticeData({ ...noticeData, message: e.target.value })}
                                    />
                                </div>

                                <div className="p-8 bg-indigo-50/50 rounded-[3rem] border border-indigo-100 flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-indigo-500 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-1">Email Integration Active</p>
                                        <p className="text-[11px] font-bold text-indigo-400 leading-relaxed italic">This proclamation will also be dispatched via the Brevo SMTP cluster to all authorized scholars instantly.</p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isBroadcasting}
                                    className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] shadow-2xl shadow-indigo-900/20 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                                >
                                    {isBroadcasting ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Dispatch Proclamation
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {notices.length === 0 ? (
                <div className="bg-white rounded-[3.5rem] p-24 text-center border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent"></div>
                    <div className="relative z-10">
                        <div className="h-20 w-20 rounded-[2.5rem] bg-slate-50 text-slate-200 flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-inner group-hover:rotate-6 transition-transform">
                            <Briefcase className="h-8 w-8 opacity-20" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-2">Notice Cache Empty</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">No administrative directives found at this time.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {notices.map((notice) => (
                        <div key={notice._id} className="group bg-white rounded-[3.5rem] border border-slate-100 p-10 hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 relative overflow-hidden flex flex-col lg:flex-row gap-12">
                            <div className="absolute top-0 right-0 w-[400px] h-full bg-indigo-600 rounded-full blur-[100px] opacity-[0.01] -mr-48 transition-opacity group-hover:opacity-[0.03]"></div>

                            <div className="lg:w-40 flex flex-col items-center gap-4 shrink-0 relative z-10">
                                <div className="p-5 bg-indigo-50 rounded-3xl text-indigo-600 flex flex-col items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform w-full">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">
                                        {new Date(notice.createdAt).toLocaleString('default', { month: 'long' })}
                                    </span>
                                    <span className="text-4xl font-black tracking-tighter leading-none italic">
                                        {new Date(notice.createdAt).getDate()}
                                    </span>
                                </div>
                                <div className="hidden lg:block h-full w-px bg-slate-100"></div>
                            </div>

                            <div className="flex-1 space-y-8 relative z-10">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-50">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.4em] italic leading-none border border-indigo-100 px-2 py-1 rounded-md">Official Order</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <Clock className="h-3 w-3" />
                                                {new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none uppercase italic group-hover:text-indigo-600 transition-colors">{notice.title}</h3>
                                    </div>
                                    <div className="px-6 py-3 bg-slate-900 text-white rounded-2xl flex items-center gap-3 shadow-xl group-hover:-translate-y-1 transition-transform border border-white/5">
                                        <ShieldCheck className="h-4 w-4 text-indigo-400 shadow-[0_0_10px_current]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Institutional Auth</span>
                                    </div>
                                </div>

                                <div className="p-10 bg-slate-50/50 rounded-[3rem] border border-slate-100 shadow-inner group-hover:bg-white transition-colors duration-500">
                                    <p className="text-slate-700 font-bold leading-relaxed text-base whitespace-pre-wrap">{notice.message}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-xl">
                                            {notice.admin?.name?.charAt(0) || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">Administrative Head</p>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-tight italic underline decoration-indigo-200 decoration-2 underline-offset-4">{notice.admin?.name || 'Administrator Bureau'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <span className="text-[10px] font-black uppercase tracking-widest italic opacity-50">Authorized Dissemination Feed</span>
                                        <Info className="h-4 w-4 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FacultyNotices;
