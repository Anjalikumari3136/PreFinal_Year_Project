import React from 'react';
import {
    LineChart as ChartIcon,
    TrendingUp,
    Users,
    Award,
    Target,
    ArrowUpRight,
    Search,
    ChevronLeft,
    Activity,
    Shield,
    MoreVertical,
    CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

const AcademicPerformance = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Class Average', value: '84.2%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Top Scorer', value: '98/100', icon: Award, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Passing Rate', value: '100%', icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Active Learners', value: '42', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
             {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-600/10 transition-colors"></div>
                <div className="flex items-center gap-8 relative z-10">
                    <button
                        onClick={() => navigate('/faculty-dashboard')}
                        className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm active:scale-95"
                    >
                        <ChevronLeft className="h-7 w-7" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2 uppercase italic underline decoration-orange-600 decoration-8 underline-offset-8">Academic Stats</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3 italic">Batch Analytics • Performance Protocol Alpha</p>
                    </div>
                </div>
                <button className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-4 shadow-2xl transition-all active:scale-95 relative z-10 border border-white/5 group/btn">
                    <Award className="h-5 w-5 text-orange-500 group-hover/btn:rotate-12 transition-transform" />
                    GENERATE ELITE REPORT
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                         <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/5 group-hover:scale-110 group-hover:rotate-6 transition-all", s.bg, s.color)}>
                            <s.icon className="h-6 w-6" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">{s.label}</p>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{s.value}</h3>
                                <div className="p-1 px-2 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded-lg">+12.5%</div>
                            </div>
                        </div>
                        <div className={cn("absolute bottom-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform", s.color)}>
                            <s.icon className="h-32 w-32" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[500px]">
                     <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
                     <div className="relative z-10 space-y-8 max-w-lg">
                        <div className="h-24 w-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm group-hover:rotate-12 transition-transform">
                             <ChartIcon className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic underline decoration-slate-100 decoration-8 underline-offset-8">Weekly Engagement Trend</h3>
                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest leading-relaxed">System Visualizing the professional progress of Batch JEE-2025-A over the terminal assessment phase.</p>
                        <div className="pt-8 flex items-center justify-center gap-10">
                             <div>
                                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 italic">Average Score</p>
                                 <p className="text-2xl font-black text-slate-900 tracking-tighter">82%</p>
                             </div>
                             <div className="h-12 w-[1px] bg-slate-100"></div>
                             <div>
                                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 italic">Engagement</p>
                                 <p className="text-2xl font-black text-slate-900 tracking-tighter">94%</p>
                             </div>
                        </div>
                     </div>
                </div>

                <div className="bg-[#171317] rounded-[3.5rem] p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl group transition-all hover:shadow-orange-600/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[150px] opacity-20 -mr-32 -mt-32 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black italic tracking-tighter uppercase mb-2 flex items-center gap-4">
                            <Target className="h-8 w-8 text-orange-600" />
                            IMPACT CORE
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-12 italic opacity-80 underline decoration-orange-600 decoration-2 underline-offset-8">Institutional Growth Protocol</p>
                        
                        <div className="space-y-8">
                            <div className="space-y-3 p-6 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <span>Conceptual Clarity</span>
                                    <span className="text-orange-500">92%</span>
                                </div>
                                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[92%] rounded-full shadow-[0_0_15px_rgba(244,81,30,0.5)]"></div>
                                </div>
                            </div>
                            <div className="space-y-3 p-6 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <span>Efficiency Level</span>
                                    <span className="text-orange-500">78%</span>
                                </div>
                                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[78%] rounded-full shadow-[0_0_15px_rgba(244,81,30,0.5)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="relative z-10 mt-12 w-full py-5 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-orange-600 hover:text-white transition-all shadow-xl active:scale-95 group/btn2">
                        DETAILED ANALYTICS <ArrowUpRight className="h-4 w-4 group-hover/btn2:translate-x-1 group-hover/btn2:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcademicPerformance;
