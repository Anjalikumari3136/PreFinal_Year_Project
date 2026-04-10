import React, { useState, useEffect } from 'react';
import {
    Users,
    UserPlus,
    FileText,
    MessageSquare,
    Activity,
    Loader2,
    Megaphone,
    PlusCircle,
    TrendingUp,
    Clock,
    Calendar,
    ArrowUpRight,
    GraduationCap,
    Shield,
    Terminal,
    Fingerprint,
    Search,
    ShieldCheck,
    Bell,
    ChevronRight,
    CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import PostUpdateModal from '../../components/admin/PostUpdateModal';
import API_BASE_URL from '../../config/api';

const AdminOverview = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        students: 0,
        faculty: 0,
        requests: 0,
        feedback: 0,
        mentorship: 0,
        pendingApprovals: 0
    });
    const [loading, setLoading] = useState(true);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/stats`, config);
            setStats(data);
        } catch (error) { console.error('Overview error:', error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    if (loading) return <div className="h-[60vh] flex items-center justify-center font-black text-orange-600 animate-pulse uppercase tracking-[0.2em] italic">Initializing Bureau Systems...</div>;

    const quickActions = [
        { title: 'Enroll Student', icon: UserPlus, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/admin-dashboard/students' },
        { title: 'Onboard Faculty', icon: PlusCircle, color: 'text-orange-500', bg: 'bg-orange-50', path: '/admin-dashboard/faculty' },
        { title: 'Broadcast Alert', icon: Megaphone, color: 'text-blue-500', bg: 'bg-blue-50', action: () => setIsUpdateModalOpen(true) },
        { title: 'Audit Requests', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50', path: '/admin-dashboard/requests' },
    ];

    const metrics = [
        { label: 'Total Enrolled Students', value: stats.students, icon: GraduationCap, color: 'text-orange-600' },
        { label: 'Active Faculty Personnel', value: stats.faculty, icon: Users, color: 'text-blue-600' },
        { label: 'Strategic Requests', value: stats.requests, icon: Activity, color: 'text-emerald-600' },
        { label: 'High-Risk Candidates', value: stats.feedback || '0', icon: Shield, color: 'text-rose-600' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-1000 pb-20">
            <PostUpdateModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} />

            {/* Elite Header Banner */}
            <div className="relative bg-gradient-to-br from-[#171317] to-[#2d1b18] rounded-[2.5rem] p-8 text-white overflow-hidden shadow-2xl group transition-all hover:shadow-orange-950/20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[130px] opacity-20 -mr-40 -mt-40 transition-opacity group-hover:opacity-30"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="space-y-4 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                            <span className="px-3 py-1 bg-orange-600 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-600/20">
                                Bureau Alpha-1
                            </span>
                            <span className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">{new Date().toDateString()}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none">
                            Namaste Commander,<br />
                            <span className="text-orange-500">{user?.name || 'Director'}</span> 👋
                        </h1>
                        <p className="text-slate-400 text-[10px] font-semibold max-w-lg leading-relaxed uppercase tracking-wider opacity-80 decoration-orange-600/50 underline underline-offset-8 decoration-2">
                             Oversight Protocol: You are managing the entire Campus Ecosystem. Current backlog: <span className="text-white font-bold">{stats.pendingApprovals} authorizations</span> pending.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
                         <div className="bg-white/5 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex items-center gap-4 group/box shadow-2xl">
                             <div className="h-10 w-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover/box:scale-110 transition-transform">
                                 <ShieldCheck className="h-5 w-5" />
                             </div>
                             <div>
                                 <p className="text-[8px] text-slate-500 uppercase tracking-widest font-black mb-1">Queue Status</p>
                                 <p className="text-base font-black text-white leading-none tracking-tighter">OPERATIONAL</p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>

            {/* Command Grid: Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                 {quickActions.map((action, i) => (
                     <button
                        key={i}
                        onClick={action.action || (() => navigate(action.path))}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4 transition-all hover:shadow-2xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                     >
                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg transition-all group-hover:rotate-6", action.bg, action.color)}>
                            <action.icon className="h-6 w-6" />
                        </div>
                        <span className="font-extrabold text-slate-900 tracking-tight text-[11px] uppercase">{action.title}</span>
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <ChevronRight className="h-3 w-3 text-slate-300" />
                        </div>
                     </button>
                 ))}
            </div>

            {/* Strategic Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group">
                        <div className={cn("h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110", m.color)}>
                            <m.icon className="h-5 w-5" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{m.value}</h3>
                                <div className="text-[8px] font-black text-emerald-500 tracking-widest uppercase">+8.2%</div>
                            </div>
                        </div>
                        <div className={cn("absolute bottom-0 right-0 p-6 opacity-[0.03] transition-transform group-hover:scale-125", m.color)}>
                            <m.icon className="h-24 w-24" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dual Pane Bureau View */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Governance Pane */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                             <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3 uppercase">
                                <Fingerprint className="h-6 w-6 text-orange-600" />
                                Recent Authorizations
                             </h3>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 opacity-70">Security & Permission Desk</p>
                        </div>
                        <Button variant="ghost" onClick={() => navigate('/admin-dashboard/approvals')} className="h-10 w-10 p-0 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                    
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white border border-slate-50 hover:border-slate-100 rounded-2xl transition-all group/item hover:shadow-lg">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover/item:rotate-6 transition-transform">
                                         <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="font-extrabold text-slate-900 text-xs uppercase tracking-tight">Access Granted • Lvl 4</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Candidate ID #842{i}</p>
                                    </div>
                                </div>
                                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Authorized</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Activity Hub */}
                <div className="bg-[#171317] p-8 rounded-[3rem] text-white relative overflow-hidden shadow-2xl flex flex-col group min-h-[400px]">
                    <div className="absolute top-0 right-0 w-[200px] h-full bg-orange-600 rounded-full blur-[100px] opacity-[0.1] -mr-32 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-2 flex items-center gap-3">
                                <Activity className="h-6 w-6 text-orange-600" />
                                Protocol Logs
                            </h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-80 italic underline decoration-orange-600 decoration-2 underline-offset-8">Terminal Activity Stream</p>
                        </div>
                        
                        <div className="space-y-6">
                            {[
                                { label: 'Personnel Assignment Alpha', time: '10:45 AM', color: 'bg-blue-500', desc: 'Faculty #312 assigned to Batch C' },
                                { label: 'Mass Broadcast Finalized', time: '09:30 AM', color: 'bg-orange-500', desc: 'Alert disseminated to 8.4k units' },
                                { label: 'System Integrity Check', time: 'Today', color: 'bg-emerald-500', desc: 'All governance modules nominal' },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-5 items-start bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm hover:translate-x-2 transition-transform">
                                    <div className={cn("h-2.5 w-2.5 rounded-full mt-2 shrink-0 shadow-[0_0_10px_current]", log.color)}></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white uppercase tracking-wider">{log.label}</p>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 mb-2 font-black">{log.time}</p>
                                        <p className="text-[10px] text-slate-400 font-medium italic opacity-70 leading-normal">{log.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
