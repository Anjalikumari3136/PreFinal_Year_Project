import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    CheckCircle,
    Calendar,
    BookOpen,
    Clock,
    Plus,
    UserCircle,
    Loader2,
    MoreVertical
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { cn } from '../../utils/cn';

const FacultyOverview = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data: dashboardData } = await axios.get('https://prefinal-year-project.onrender.com/api/faculty/dashboard', config);
            setData(dashboardData);
        } catch (error) {
            console.error('Failed to load faculty dashboard', error);
            setData({
                faculty: { name: user?.name || 'Dr. Sarah Wilson' },
                stats: { menteeCount: 1, pendingApprovalsCount: 3 }
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#00b894]" />
            </div>
        );
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Hero Welcome Banner - Compact */}
            <div className="relative bg-[#1abc9c] rounded-[2rem] p-8 md:p-10 text-white overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                    <div className="space-y-5 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[8px] font-extrabold uppercase tracking-[0.15em] border border-white/30">
                                FACULTY PORTAL
                            </span>
                            <span className="text-white/90 font-bold text-xs">{currentDate}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
                            Welcome Back,<br />
                            {data.faculty?.name || 'Dr. Sarah Wilson'} 🧑‍🏫
                        </h1>
                        <p className="text-white/95 text-sm font-medium max-w-lg leading-relaxed">
                            You are managing <span className="text-white font-extrabold">1 batches</span> and impacting students with your expertise.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        {/* 1 SESSIONS DONE Card */}
                        <div
                            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-xl min-w-[180px] text-slate-900 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => navigate('/faculty-dashboard/performance')}
                        >
                            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <UserCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-base font-black leading-none">1 SESSIONS</p>
                                <p className="text-[8px] font-extrabold text-indigo-500 uppercase tracking-[0.15em] mt-1">DONE</p>
                            </div>
                        </div>

                        {/* MARK STUDENT ATTENDANCE Card */}
                        <button
                            onClick={() => navigate('/faculty-dashboard/attendance')}
                            className="bg-[#0d4d3f] hover:bg-[#0f5c4a] rounded-2xl p-5 flex items-center gap-4 shadow-xl min-w-[220px] transition-all hover:scale-105"
                        >
                            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-white/60">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-extrabold text-white/50 uppercase tracking-[0.15em] mb-1">MARK STUDENT</p>
                                <p className="text-base font-black text-white leading-none">ATTENDANCE</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Active Batches */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-500 relative min-h-[280px] justify-center">
                    <div className="absolute top-8 right-8">
                        <span className="px-5 py-2 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border border-emerald-200">Active</span>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-100">
                        <Users className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">1</p>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em]">Active Batches</p>
                    </div>
                </div>

                {/* Card 2: Assigned Subjects */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-500 relative min-h-[280px] justify-center">
                    <div className="absolute top-8 right-8">
                        <span className="px-5 py-2 bg-indigo-100 text-indigo-600 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border border-indigo-200">Expertise</span>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-100">
                        <BookOpen className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">3</p>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em]">Assigned Subjects</p>
                    </div>
                </div>

                {/* Card 3: System Access */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-500 relative min-h-[280px] justify-center">
                    <div className="absolute top-8 right-8">
                        <span className="px-5 py-2 bg-orange-100 text-orange-600 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border border-orange-200">Status</span>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-orange-100">
                        <Clock className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Active</p>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em]">System Access</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Screenshot Style */}
            <div className="pt-6 pb-4">
                <div className="h-px bg-slate-200 w-full mb-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
                    <div className="flex items-center gap-5">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-11 w-11 rounded-full border-4 border-white bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm" />
                            ))}
                        </div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em]">124+ Students Connected Today</p>
                    </div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em]">v2.4.0 • Updated 2h ago</p>
                </div>
            </div>
        </div>
    );
};

export default FacultyOverview;
