import React, { useEffect, useState } from 'react';
import {
    BookOpen,
    Clock,
    CheckCircle,
    User,
    MessageSquare,
    TrendingUp,
    Calendar,
    Target,
    ChevronRight,
    ArrowUpRight,
    Star,
    Award,
    Activity,
    Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import NewRequestModal from '../../components/dashboard/NewRequestModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

const Overview = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        pending: 0,
        resolved: 0,
        attendance: '94.5%',
        cgpa: '9.2',
        hasApprovedMentorship: false
    });
    const [assignedMentor, setAssignedMentor] = useState(null);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const [reqRes, profileRes, mentorRes] = await Promise.allSettled([
                    axios.get('https://prefinal-year-project.onrender.com/api/requests', config),
                    axios.get('https://prefinal-year-project.onrender.com/api/auth/profile', config),
                    axios.get('https://prefinal-year-project.onrender.com/api/mentorship/my-requests', config)
                ]);

                let pCount = 0;
                let rCount = 0;
                let mentorApproved = false;

                if (reqRes.status === 'fulfilled') {
                    pCount += reqRes.value.data.filter(r => r.status === 'PENDING' || r.status === 'IN_PROGRESS').length;
                    rCount += reqRes.value.data.filter(r => r.status === 'RESOLVED').length;
                }

                if (mentorRes.status === 'fulfilled') {
                    const mData = mentorRes.value.data;
                    pCount += mData.filter(m => m.status === 'PENDING').length;
                    mentorApproved = mData.some(m => m.status === 'APPROVED' || m.status === 'SCHEDULED');
                    rCount += mData.filter(m => ['APPROVED', 'SCHEDULED', 'COMPLETED'].includes(m.status)).length;
                }

                if (profileRes.status === 'fulfilled' && profileRes.value.data.assignedMentor) {
                    setAssignedMentor(profileRes.value.data.assignedMentor);
                }

                let activity = [];
                if (reqRes.status === 'fulfilled') activity = [...reqRes.value.data];
                if (mentorRes.status === 'fulfilled') {
                    activity = [...activity, ...mentorRes.value.data.map(m => ({ ...m, title: `Mentor Session: ${m.mentor?.name || 'Faculty'}`, isMentorship: true }))];
                }
                activity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRequests(activity.slice(0, 5));

                setStats(p => ({ ...p, pending: pCount, resolved: rCount, hasApprovedMentorship: mentorApproved }));
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        if (user) fetchDashboardData();
    }, [user]);

    const cards = [
        { label: 'Attendance', value: stats.attendance, icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50', sub: 'Live Presence' },
        { label: 'Academic CGPA', value: stats.cgpa, icon: Award, color: 'text-orange-500', bg: 'bg-orange-50', sub: 'Univ. Ranking' },
        { label: 'Support Reqs', value: stats.resolved, icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50', sub: 'Resolved Total' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            <div className="relative bg-gradient-to-r from-[#171317] to-[#2d1b18] rounded-[2.5rem] p-10 md:p-12 text-white overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600 rounded-full -mr-48 -mt-48 blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                
                <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-orange-600 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-600/20">
                                Universe Portal
                            </span>
                            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{currentDate}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                            Namaste Student,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{user?.name || 'Academic Scholar'}</span> 👋
                        </h1>
                        <p className="text-slate-400 text-sm font-medium max-w-xl leading-relaxed uppercase tracking-wide">
                            You have <span className="text-orange-500 font-black">{stats.pending} pending requests</span>. Your overall performance is <span className="text-white font-black underline underline-offset-8 decoration-orange-600">Exceptional</span>.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 shrink-0">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-slate-900 rounded-[1.5rem] px-8 py-5 flex items-center gap-4 shadow-2xl hover:scale-[1.03] transition-all group/btn h-fit"
                        >
                            <div className="h-12 w-12 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20 group-hover/btn:rotate-12 transition-transform">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <div className="text-left font-black leading-none">
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">New Action</p>
                                <p className="text-lg uppercase tracking-tighter">Submit Request</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((c, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110", c.bg, c.color)}>
                            <c.icon className="h-6 w-6" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{c.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{c.value}</h3>
                                <ArrowUpRight className={cn("h-4 w-4", c.color)} />
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{c.sub}</p>
                        </div>
                        <div className={cn("absolute bottom-0 right-0 p-8 opacity-[0.03] transition-transform group-hover:scale-125 group-hover:rotate-12", c.color)}>
                            <c.icon className="h-24 w-24" />
                        </div>
                    </div>
                ))}
            </div>

            {stats.hasApprovedMentorship && (
                <div className="bg-gradient-to-r from-orange-600 to-[#f4511e] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                        <Star className="h-32 w-32" />
                    </div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center lg:text-left">
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-black/20 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.25em] border border-white/10">
                                <Activity className="h-4 w-4 text-emerald-400 animate-pulse" /> Mentorship Active
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none uppercase">Success! Session Approved.</h2>
                            <p className="text-orange-50 font-medium max-w-xl text-sm leading-relaxed">Connect with your mentor to accelerate your growth and academic journey.</p>
                        </div>
                        <Button 
                            onClick={() => navigate('/dashboard/mentorship')}
                            className="bg-[#171317] text-white hover:bg-black px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl active:scale-95 transition-all outline-none border-none"
                        >
                            Start Session <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Recent Activity</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 underline decoration-orange-600 decoration-2">Last 5 Transactions</p>
                        </div>
                        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 rounded-xl" onClick={() => navigate('/dashboard/requests')}>
                            See Global Log
                        </Button>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 opacity-50">
                                <Clock className="h-10 w-10 animate-spin" />
                                <p className="font-bold text-[10px] uppercase tracking-widest">Scanning blockchain...</p>
                            </div>
                        ) : requests.length > 0 ? (
                            <div className="space-y-3">
                                {requests.map(req => (
                                    <div key={req._id} className="p-6 rounded-[1.5rem] border border-slate-50 bg-slate-50/40 hover:bg-white hover:shadow-lg hover:border-orange-200 hover:-translate-y-0.5 transition-all group flex items-center justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="h-12 w-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-orange-600 transition-colors shadow-sm">
                                                {req.isMentorship ? <Users className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900 text-sm tracking-tight mb-1 group-hover:text-orange-600 transition-colors uppercase">{req.title}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(req.createdAt).toDateString()}</p>
                                            </div>
                                        </div>
                                        <span className={cn(
                                            "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                            ['RESOLVED', 'APPROVED', 'COMPLETED'].includes(req.status) ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            req.status === 'REJECTED' ? 'bg-red-50 text-red-600 border-red-100' :
                                            ['SCHEDULED', 'IN_PROGRESS'].includes(req.status) ? 'bg-orange-50 text-orange-600 border-orange-100 shadow-sm' :
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        )}>
                                            {req.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 p-10 text-center">
                                <Target className="h-16 w-16 mb-4" />
                                <p className="font-black text-sm uppercase tracking-widest">No activities recorded yet.</p>
                                <p className="text-xs mt-2 uppercase tracking-tight">Submit your first request to see it here.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8 flex flex-col">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group flex-1">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform">
                            <Target className="h-48 w-48" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-orange-600 text-white flex items-center justify-center"><User className="h-5 w-5" /></div>
                            Guardian Mentor
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3 mb-8 underline decoration-orange-600 decoration-2">Academic Advisory Bureau</p>
                        
                        <div className="flex items-center gap-6 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 mb-8 mt-6">
                            <div className="h-16 w-16 rounded-2xl bg-[#171317] flex items-center justify-center text-white font-black text-2xl shadow-xl">
                                {assignedMentor?.name?.charAt(0) || 'M'}
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight mb-1">{assignedMentor ? `Dr. ${assignedMentor.name}` : 'Awaiting Assignment'}</h4>
                                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">{assignedMentor?.designation || 'Expert Board'} • {assignedMentor?.department || 'University Center'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 bg-white border border-slate-100 rounded-2xl text-center">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Response Rate</p>
                                <p className="text-2xl font-black text-slate-900">98%</p>
                            </div>
                            <div className="p-5 bg-white border border-slate-100 rounded-2xl text-center">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Mentor Rating</p>
                                <p className="text-2xl font-black text-[#f4511e]">4.9</p>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-8 py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-slate-900 text-white hover:bg-black transition-all shadow-xl"
                            onClick={() => navigate('/dashboard/mentorship')}
                        >
                            {assignedMentor ? 'Launch Secure Message' : 'Request Assignment'}
                        </Button>
                    </div>

                    <div className="bg-[#171317] p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl h-fit">
                        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange-600 rounded-full blur-[100px] -mr-24 -mt-24 opacity-30 shadow-orange-600/50"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-black tracking-tight mb-4 flex items-center gap-3 uppercase">
                                <Activity className="h-5 w-5 text-orange-600" />
                                UniSupport Protocol
                            </h3>
                            <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-wide">Your data is secured with institutional-grade encryption. Every request is tracked for accountability.</p>
                            <div className="flex gap-4 mt-8">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex-1 text-center">
                                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Efficiency</p>
                                    <p className="text-lg font-black mt-1">92ms</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex-1 text-center">
                                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Uptime</p>
                                    <p className="text-lg font-black mt-1">99.9%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NewRequestModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); fetchDashboardData(); }}
                onCreated={() => { fetchDashboardData(); }}
            />
        </div>
    );
};

const FileText = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M13 13H8"/><path d="M13 17H8"/></svg>
);

const Users = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default Overview;
