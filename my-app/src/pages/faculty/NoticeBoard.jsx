import React from 'react';
import {
    Bell,
    Megaphone,
    Calendar,
    ChevronLeft,
    Pin,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NoticeBoard = () => {
    const navigate = useNavigate();

    const notices = [
        {
            id: 1,
            title: 'JEE Mains Mock Test - Phase 1',
            date: 'Jan 10, 2026',
            category: 'Examination',
            content: 'All students are required to be present by 9:00 AM. ID cards are mandatory.',
            priority: 'high'
        },
        {
            id: 2,
            title: 'Special Physics Workshop',
            date: 'Jan 08, 2026',
            category: 'Academic',
            content: 'Dr. Verma will be conducting a deep-dive session on Quantum Mechanics.',
            priority: 'medium'
        },
        {
            id: 3,
            title: 'Holiday Notice: Republic Day',
            date: 'Jan 26, 2026',
            category: 'Institute',
            content: 'The institute will remain closed. Campus flag hoisting at 8:00 AM.',
            priority: 'low'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/faculty-dashboard')}
                        className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#00ff9d] hover:bg-[#00ff9d]/10 transition-all border border-slate-100"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notice Board</h1>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Official Communications & Alerts</p>
                    </div>
                </div>
                <button className="bg-[#094d37] hover:bg-[#0c6348] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all">
                    <Megaphone className="h-5 w-5 text-[#00ff9d]" />
                    POST NEW NOTICE
                </button>
            </div>

            {/* Sticky/Pinned Notice */}
            <div className="bg-[#00b894] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-[#00b894]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="h-24 w-24 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                        <Pin className="h-12 w-12 text-white fill-white" />
                    </div>
                    <div className="space-y-4">
                        <span className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Pinned Announcement</span>
                        <h2 className="text-4xl font-black tracking-tight">Annual Faculty Meet 2026</h2>
                        <p className="text-white/80 font-medium text-lg leading-relaxed">Join us for the vision alignment meeting on Jan 15th at the Main Auditorium. Dinner will be served following the session.</p>
                    </div>
                    <button className="ml-auto p-6 bg-white text-slate-900 rounded-[2rem] font-black flex items-center gap-3 hover:scale-105 transition-transform group">
                        SEE DETAILS <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* List of Notices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notices.map((notice) => (
                    <div key={notice.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 group hover:shadow-xl transition-all h-[320px] flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${notice.priority === 'high' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                                    notice.priority === 'medium' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                                        'bg-slate-50 text-slate-500 border-slate-100'
                                }`}>
                                {notice.category}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <Calendar className="h-4 w-4" /> {notice.date}
                            </div>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-[#00b894] transition-colors">{notice.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{notice.content}</p>
                        <button className="mt-auto flex items-center gap-2 text-[10px] font-black text-[#00b894] uppercase tracking-widest hover:translate-x-2 transition-transform">
                            READ FULL DOCUMENT →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeBoard;
