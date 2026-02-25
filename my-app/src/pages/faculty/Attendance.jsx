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
    MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header section with back button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/faculty-dashboard')}
                        className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#00b894] hover:bg-[#00b894]/10 transition-all border border-slate-100"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mark Attendance</h1>
                        <p className="text-slate-400 font-bold text-sm flex items-center gap-2 uppercase tracking-widest mt-1">
                            <Users className="h-4 w-4" /> BATCH: JEE-2025-A
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-[#00b894]" />
                        <span className="font-bold text-slate-700">{new Date().toDateString()}</span>
                    </div>
                    <button className="bg-[#00b894] hover:bg-[#00a884] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-[#00b894]/20 transition-all">
                        <Save className="h-5 w-5" />
                        SAVE & SYNC
                    </button>
                </div>
            </div>

            {/* Attendance Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search student by name or ID..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-5 pl-16 pr-6 focus:ring-4 focus:ring-[#00b894]/10 focus:border-[#00b894] outline-none transition-all font-medium"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="bg-emerald-50 text-emerald-600 px-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Mark All Present</button>
                    <button className="bg-slate-100 text-slate-600 px-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Clear All</button>
                </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student Info</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Attendance Status</th>
                            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Quick Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-[#00b894]/10 group-hover:text-[#00b894] transition-all">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-lg">{student.name}</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ID: {student.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-8">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleStatus(student.id, 'present')}
                                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${student.status === 'present'
                                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                                : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500'
                                                }`}
                                        >
                                            Present
                                        </button>
                                        <button
                                            onClick={() => toggleStatus(student.id, 'absent')}
                                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${student.status === 'absent'
                                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                                                : 'bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500'
                                                }`}
                                        >
                                            Absent
                                        </button>
                                    </div>
                                </td>
                                <td className="px-10 py-8 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-[#00b894]/10 hover:text-[#00b894]">
                                            <Clock className="h-5 w-5" />
                                        </button>
                                        <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white">
                                            <MoreVertical className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Attendance Stats Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Total Present</p>
                    <p className="text-3xl font-black text-emerald-700">{students.filter(s => s.status === 'present').length}</p>
                </div>
                <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100">
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Total Absent</p>
                    <p className="text-3xl font-black text-rose-700">{students.filter(s => s.status === 'absent').length}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Not Marked</p>
                    <p className="text-3xl font-black text-slate-700">{students.filter(s => s.status === 'none').length}</p>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
