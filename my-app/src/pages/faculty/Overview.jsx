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
    MoreVertical,
    ArrowUpRight,
    TrendingUp,
    Shield,
    Activity,
    GraduationCap,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const FacultyOverview = () => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { fetchDashboard(); }, []);

    const fetchDashboard = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data: d } = await axios.get(`${API_BASE_URL}/api/faculty/dashboard`, config);
            setData(d);
        } catch (error) {
            setData({
                faculty: { name: user?.name || 'Academic Mentor' },
                stats: { menteeCount: 15, pendingApprovalsCount: 4, grievanceResolved: 12 }
            });
        } finally { setLoading(false); }
    };

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-orange-600" /></div>;

    const stats = [
        { label: 'Assigned Mentees', value: data.stats.menteeCount || 0, icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Grievance Handled', value: data.stats.grievanceResolved || 0, icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">

            <div className="relative bg-gradient-to-r from-[#171317] to-[#2d1b18] rounded-[2.5rem] p-8 text-white overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600 rounded-full -mr-32 -mt-32 blur-[100px] opacity-20 transition-opacity"></div>

                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-orange-600 rounded-full text-[7px] font-black uppercase tracking-wider">
                                Expert Bureau
                            </span>
                            <span className="text-slate-400 font-bold text-[8px] uppercase tracking-widest">{new Date().toDateString()}</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
                            Namaste Professor,<br />
                            <span className="text-orange-500">{data.faculty?.name || 'Academic Lead'}</span> 👋
                        </h1>
                        <p className="text-slate-400 text-[10px] font-medium max-w-lg leading-relaxed uppercase tracking-wide opacity-80">
                            Institutional Oversight: You are managing student welfare and mentorship protocols. Today, <span className="text-white font-bold">{data.stats.menteeCount} candidates</span> are under your direct mentorship.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 shrink-0">
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110", s.bg, s.color)}>
                            <s.icon className="h-5 w-5" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{s.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{s.value}</h3>
                                <ArrowUpRight className={cn("h-4 w-4", s.color)} />
                            </div>
                        </div>
                        <div className={cn("absolute bottom-0 right-0 p-6 opacity-[0.03] transition-transform group-hover:scale-125", s.color)}>
                            <s.icon className="h-24 w-24" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:rotate-12 transition-transform"><MessageSquare className="h-32 w-32" /></div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none flex items-center gap-3 uppercase">
                        <div className="h-8 w-8 rounded-lg bg-orange-600 text-white flex items-center justify-center"><Shield className="h-4 w-4" /></div>
                        Pending Actions
                    </h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 mb-8 decoration-orange-600 decoration-2 underline-offset-4">Governance Task Queue</p>

                    <div className="space-y-3 relative z-10">
                        <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between group/task hover:bg-white hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4">
                                <Activity className="h-5 w-5 text-orange-600 animate-pulse" />
                                <div>
                                    <p className="font-bold text-slate-900 text-sm uppercase tracking-tight">Grievance Review</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{data.stats.pendingApprovalsCount} Tickets waiting</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-900 hover:text-white" onClick={() => navigate('/faculty-dashboard/grievances')}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between group/task hover:bg-white hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4">
                                <GraduationCap className="h-5 w-5 text-orange-600" />
                                <div>
                                    <p className="font-bold text-slate-900 text-sm uppercase tracking-tight">Mentee Session</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">2 Scheduled Today</p>
                                </div>
                            </div>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-900 hover:text-white" onClick={() => navigate('/faculty-dashboard/mentorship')}>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#171317] p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl flex flex-col justify-between group h-full">
                    <div className="absolute top-0 right-0 w-[200px] h-full bg-orange-600 rounded-full blur-[100px] opacity-[0.1] -mr-32 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4 flex items-center gap-3 leading-none">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                            Institutional Impact
                        </h3>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-wider max-w-sm opacity-80">Faculty performance metrics indicate high engagement in mentoring protocols.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative z-10 mt-8">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                            <p className="text-[8px] font-bold text-orange-500 uppercase tracking-widest mb-1">Student Rating</p>
                            <p className="text-2xl font-bold tracking-tighter text-white">4.9/5.0</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                            <p className="text-[8px] font-bold text-orange-500 uppercase tracking-widest mb-1">Active Tenure</p>
                            <p className="text-2xl font-bold tracking-tighter text-white">3 Years</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest shrink-0">{data.stats.menteeCount}+ Dedicated Mentees Assigned</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic underline decoration-slate-100 underline-offset-4">
                    UniSupport Nexus • Faculty v4.2
                </div>
            </div>
        </div>
    );
};

export default FacultyOverview;
