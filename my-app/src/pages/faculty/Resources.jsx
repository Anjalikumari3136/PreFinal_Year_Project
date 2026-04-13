import React from 'react';
import {
    Book,
    Video,
    FileText,
    Download,
    Search,
    ChevronLeft,
    Plus,
    Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudyResources = () => {
    const navigate = useNavigate();

    const resources = [
        { id: 1, title: 'Calculus - Limits & Continuity', type: 'PDF', size: '2.4 MB', icon: FileText, color: 'rose' },
        { id: 2, title: 'Thermodynamics Lecture Notes', type: 'PDF', size: '1.8 MB', icon: FileText, color: 'blue' },
        { id: 3, title: 'Organic Chemistry Revision', type: 'Video', size: '45 mins', icon: Video, color: 'emerald' },
        { id: 4, title: 'Mock Paper Set - Physics', type: 'Doc', size: '0.9 MB', icon: FileText, color: 'orange' },
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
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Study Resources</h1>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Batch Material & Lecture Notes</p>
                    </div>
                </div>
                <button className="bg-[#094d37] hover:bg-[#0c6348] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all">
                    <Plus className="h-5 w-5 text-[#00ff9d]" />
                    UPLOAD NEW
                </button>
            </div>

            {/* Content Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search materials..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#00ff9d]/10 focus:border-[#00ff9d] outline-none transition-all font-medium"
                    />
                </div>
                <button className="bg-white border border-slate-100 px-8 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-slate-50 transition-all">
                    <Filter className="h-5 w-5 text-slate-400" /> FILTER BY TYPE
                </button>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((item) => (
                    <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all h-[280px] flex flex-col items-center text-center">
                        <div className={`h-20 w-20 rounded-[2rem] bg-${item.color}-50 flex items-center justify-center text-${item.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                            <item.icon className="h-10 w-10" />
                        </div>
                        <h3 className="font-black text-slate-900 group-hover:text-[#00b894] transition-colors mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span className="px-2 py-0.5 bg-slate-100 rounded-md">{item.type}</span>
                            <span>•</span>
                            <span>{item.size}</span>
                        </div>
                        <button className="mt-auto w-full py-3 bg-slate-50 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-[#00b894] hover:text-white transition-all flex items-center justify-center gap-2">
                            <Download className="h-4 w-4" /> DOWNLOAD
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyResources;
