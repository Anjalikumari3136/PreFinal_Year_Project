import React, { useState, useEffect } from 'react';
import {
    Bell,
    Megaphone,
    Calendar,
    ChevronLeft,
    Pin,
    ArrowRight,
    TrendingUp,
    Activity,
    Shield,
    Loader2,
    Inbox
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';

import FacultyNoticeModal from '../../components/faculty/FacultyNoticeModal';

const NoticeBoard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchNotices = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/notifications`, config);
            setNotices(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
            setNotices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchNotices();
    }, [user]);

    if (loading) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
                <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Synchronizing Bureau Alerts...</p>
            </div>
        );
    }

    const featuredNotice = notices.length > 0 ? notices[0] : null;
    const listNotices = notices.length > 1 ? notices.slice(1) : [];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <FacultyNoticeModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onRefresh={fetchNotices}
            />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center gap-8 relative z-10">
                    <button
                        onClick={() => navigate('/faculty-dashboard')}
                        className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm active:scale-95"
                    >
                        <ChevronLeft className="h-7 w-7" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2 uppercase italic underline decoration-orange-600 decoration-8 underline-offset-8">Bureau Notice</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Internal Communications & Governance Alerts</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl transition-all active:scale-95 relative z-10 border border-white/5 shadow-orange-900/10 hover:-translate-y-0.5"
                >
                    <Megaphone className="h-5 w-5 text-orange-500" />
                    BROADCAST NEW NOTICE
                </button>
            </div>

            {featuredNotice ? (
                <div className="bg-[#171317] rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl group transition-all hover:shadow-orange-600/20">
                    <div className="absolute top-0 right-0 w-[500px] h-full bg-orange-600 rounded-full blur-[150px] opacity-[0.1] -mr-32 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                        <div className="h-28 w-28 rounded-[2.5rem] bg-orange-600 flex items-center justify-center shadow-2xl shadow-orange-600/30 shrink-0 group-hover:rotate-12 transition-transform">
                            <Pin className="h-12 w-12 text-white" />
                        </div>
                        <div className="space-y-6 flex-1">
                            <div className="flex items-center gap-3">
                                <span className="px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-white/10 shadow-xl">Critical Priority Log</span>
                                <span className="text-orange-500 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                                    <Activity className="h-3 w-3" /> System Live • {new Date(featuredNotice.createdAt).toDateString()}
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-500 transition-all">
                                {featuredNotice.title}
                            </h2>
                            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest leading-relaxed max-w-4xl opacity-80 decoration-orange-600 underline underline-offset-8">
                                {featuredNotice.message}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[#171317] rounded-[3.5rem] p-20 text-center relative overflow-hidden shadow-2xl border border-white/5">
                     <Inbox className="h-16 w-16 text-slate-800 mx-auto mb-6" />
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">No Critical Logs Found</h3>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-4">The Bureau Terminal is currently quiet.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listNotices.map((notice) => (
                    <div key={notice._id} className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 group hover:shadow-2xl hover:border-orange-100 transition-all min-h-[380px] flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform scale-150 rotate-12"><Bell className="h-32 w-32" /></div>
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <span className={cn(
                                "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border bg-slate-50 text-slate-500 border-slate-100"
                            )}>
                                {notice.targetAudience}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-tighter group-hover:text-slate-500 transition-colors">
                                <Calendar className="h-4 w-4" /> {new Date(notice.createdAt).toDateString()}
                            </div>
                        </div>
                        <div className="relative z-10 flex-1 space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-orange-600 transition-all italic uppercase underline decoration-slate-50 decoration-4 underline-offset-4">{notice.title}</h3>
                            <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest leading-loose opacity-80">{notice.message}</p>
                        </div>
                        <button className="mt-10 flex items-center justify-between w-full p-4 bg-slate-50 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm relative z-10 group/btn">
                             <span>Authorize Read Protocol</span>
                             <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-[#f8f9fa] border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center group">
                 <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform"><Shield className="h-8 w-8 text-orange-600" /></div>
                 <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase italic leading-none mb-2">Bureau Confidentiality Protocol</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] max-w-[400px] leading-relaxed italic opacity-80">System Alert: Official notices are for academic faculty and staff eyes only. Unauthorized duplication is a protocol violation.</p>
            </div>
        </div>
    );
};

export default NoticeBoard;
