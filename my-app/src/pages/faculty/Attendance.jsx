import React, { useState } from 'react';
import {
    Users,
    Search,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    Save,
    ChevronLeft,
    MoreVertical,
    Activity,
    Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

const Attendance = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([
        { id: 'ST001', name: 'John Doe', status: 'present' },
        { id: 'ST002', name: 'Jane Smith', status: 'present' },
        { id: 'ST003', name: 'Mike Ross', status: 'absent' },
        { id: 'ST004', name: 'Rachel Zane', status: 'none' },
        { id: 'ST005', name: 'Harvey Specter', status: 'none' },
    ]);

    const toggleStatus = (id, status) => {
        setStudents(students.map(s => s.id === id ? { ...s, status } : s));
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center gap-8 relative z-10">
                    <button
                        onClick={() => navigate('/faculty-dashboard')}
                        className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-all border border-slate-100 shadow-sm active:scale-90"
                    >
                        <ChevronLeft className="h-7 w-7" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2 uppercase italic underline decoration-orange-600 decoration-8 underline-offset-8">Mark Attendance</h1>
                        <p className="text-slate-400 font-black text-[10px] flex items-center gap-3 uppercase tracking-[0.2em] mt-3">
                            <div className="h-5 w-5 rounded-md bg-orange-600 text-white flex items-center justify-center"><Users className="h-2.5 w-2.5" /></div> BATCH: JEE-2025-A • PROTOCOL ALPHA
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="bg-slate-900 px-8 py-4 rounded-2xl border border-white/10 flex items-center gap-4 text-white shadow-2xl">
                        <Calendar className="h-5 w-5 text-orange-500" />
                        <span className="font-black text-[10px] uppercase tracking-widest">{new Date().toDateString()}</span>
                    </div>
                    <button className="bg-[#f4511e] hover:bg-orange-700 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl shadow-orange-600/30 transition-all active:scale-95">
                        <Save className="h-5 w-5" />
                        SAVE & SYNC
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Scan student by name or unique ID..."
                        className="w-full bg-white border border-slate-100 rounded-[2rem] py-6 pl-16 pr-8 focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all font-bold text-sm shadow-sm"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="bg-slate-900 text-white px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95">Mark All Present</button>
                    <button className="bg-white text-slate-400 border border-slate-100 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">Reset Bureau Log</button>
                </div>
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Scholar Protocol</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Attendance State</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50/30 transition-all group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-6">
                                        <div className="h-16 w-16 rounded-[1.5rem] bg-[#171317] flex items-center justify-center text-white font-black text-2xl group-hover:rotate-6 transition-transform shadow-xl">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-xl tracking-tight uppercase italic group-hover:text-orange-600 transition-colors leading-none mb-2">{student.name}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID: {student.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleStatus(student.id, 'present')}
                                            className={cn(
                                                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                                                student.status === 'present'
                                                ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20'
                                                : 'bg-slate-50 text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
                                            )}
                                        >
                                            In Status
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(student.id, 'absent')}
                                            className={cn(
                                                "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm",
                                                student.status === 'absent'
                                                ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/20'
                                                : 'bg-slate-50 text-slate-400 hover:bg-rose-100 hover:text-rose-600'
                                            )}
                                        >
                                            Absent
                                        </button>
                                    </div>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                        <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-orange-600 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100">
                                            <Clock className="h-5 w-5" />
                                        </button>
                                        <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-emerald-50 p-8 rounded-[3rem] border border-emerald-100 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:rotate-12 transition-transform"><CheckCircle2 className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3 italic">Verified Presence</p>
                    <p className="text-5xl font-black text-emerald-700 tracking-tighter">{students.filter(s => s.status === 'present').length}</p>
                </div>
                <div className="bg-rose-50 p-8 rounded-[3rem] border border-rose-100 shadow-sm relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:rotate-12 transition-transform"><XCircle className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-3 italic">Accounted Absence</p>
                    <p className="text-5xl font-black text-rose-700 tracking-tighter">{students.filter(s => s.status === 'absent').length}</p>
                </div>
                <div className="bg-slate-900 p-8 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group text-white">
                     <div className="absolute top-0 right-0 p-6 opacity-[0.1] group-hover:rotate-12 transition-transform"><Activity className="h-24 w-24" /></div>
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-3 italic">Bureau Pending Log</p>
                    <p className="text-5xl font-black text-white tracking-tighter">{students.filter(s => s.status === 'none').length}</p>
                </div>
            </div>

            <div className="bg-[#f8f9fa] border-2 border-dashed border-slate-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center group">
                 <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform"><Shield className="h-8 w-8 text-orange-600" /></div>
                 <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase italic leading-none mb-2">Institutional Authenticity</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] max-w-[400px] leading-relaxed italic opacity-80 decoration-slate-200 underline underline-offset-8">Every attendance record is validated by the university bureau for funding and credit accountability.</p>
            </div>
        </div>
    );
};

export default Attendance;
