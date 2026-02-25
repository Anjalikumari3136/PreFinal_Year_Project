import React from 'react';
import {
    LineChart,
    TrendingUp,
    Users,
    Award,
    Target,
    ArrowUpRight,
    Search,
    ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AcademicPerformance = () => {
    const navigate = useNavigate();

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
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Academic Performance</h1>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Batch Analytics & Student Tracking</p>
                    </div>
                </div>
                <button className="bg-[#094d37] hover:bg-[#0c6348] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all">
                    < Award className="h-5 w-5 text-[#00ff9d]" />
                    DOWNLOAD REPORT
                </button>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Class Average', value: '84.2%', icon: Target, color: 'emerald' },
                    { label: 'Top Scorer', value: '98/100', icon: Award, color: 'amber' },
                    { label: 'Passing Rate', value: '100%', icon: TrendingUp, color: 'indigo' },
                    { label: 'Active Learners', value: '42', icon: Users, color: 'blue' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 group transition-all hover:shadow-xl">
                        <div className={`h-12 w-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-6`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart Placeholder / Mock Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 h-[400px] flex flex-col justify-center items-center text-center">
                    <LineChart className="h-20 w-20 text-slate-200 mb-6" />
                    <h3 className="text-xl font-black text-slate-900">Weekly Performance Trend</h3>
                    <p className="text-slate-400 max-w-sm mt-2 font-medium">Visualizing the progress of Batch JEE-2025-A over the last 12 weeks of assessment.</p>
                </div>
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff9d]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black flex items-center gap-2">
                            <Target className="h-6 w-6 text-[#00ff9d]" />
                            Impact Analysis
                        </h3>
                        <div className="mt-8 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                    <span>Conceptual Clarity</span>
                                    <span className="text-[#00ff9d]">92%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00ff9d] w-[92%] rounded-full shadow-[0_0_10px_#00ff9d]"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                    <span>Problem Solving</span>
                                    <span className="text-[#00ff9d]">78%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00ff9d] w-[78%] rounded-full shadow-[0_0_10px_#00ff9d]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00ff9d] hover:text-slate-900 transition-all">
                        VIEW DETAILED ANALYTICS <ArrowUpRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AcademicPerformance;
