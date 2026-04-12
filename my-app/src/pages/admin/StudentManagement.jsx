import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Filter, Mail, Shield, UserX, UserCheck, Calendar, GraduationCap, ArrowRight, Loader2, X, AlertTriangle, FileText, CheckCircle2, MessageSquare, Inbox } from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

const StudentProfileModal = ({ isOpen, onClose, studentId, onStatusChange }) => {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && studentId) {
            setLoading(true);
            axios.get(`${API_BASE_URL}/api/admin/students/${studentId}/full`, {
                headers: { Authorization: `Bearer ${user.token}` }
            }).then(res => {
                setData(res.data);
                setLoading(false);
            }).catch(() => toast.error('Failed to load student profile'));
        }
    }, [isOpen, studentId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-300">
                {loading ? (
                    <div className="p-20 w-full flex justify-center"><Loader2 className="animate-spin h-10 w-10 text-indigo-600" /></div>
                ) : (
                    <>
                        <div className="md:w-1/3 bg-slate-900 p-8 text-white relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <GraduationCap className="h-32 w-32" />
                            </div>
                            <div className="relative z-10 space-y-6">
                                <div className="h-24 w-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl font-black border border-white/20">
                                    {data.profile.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-1">{data.profile.name}</h3>
                                    <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase">ID: {data.profile.studentId}</p>
                                </div>
                                <div className="space-y-4 pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-xs opacity-70">
                                        <Mail className="h-4 w-4" /> {data.profile.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs opacity-70">
                                        <Shield className="h-4 w-4" /> Dept: {data.profile.department}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs opacity-70">
                                        <Calendar className="h-4 w-4" /> Year {data.profile.year} • Sem {data.profile.semester}
                                    </div>
                                </div>
                                <div className="pt-8">
                                    <p className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-widest">Administrative Actions</p>
                                    <div className="space-y-3">
                                        <Button
                                            variant={data.profile.isActive ? "danger" : "primary"}
                                            className="w-full rounded-2xl h-12 font-black text-xs tracking-widest uppercase"
                                            onClick={() => onStatusChange(data.profile._id, !data.profile.isActive)}
                                        >
                                            {data.profile.isActive ? <><UserX className="h-4 w-4 mr-2" /> Deactivate Account</> : <><UserCheck className="h-4 w-4 mr-2" /> Activate Account</>}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
                            <div className="flex justify-between items-start mb-8">
                                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic 360 Overview</h4>
                                <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="h-6 w-6 text-slate-400" /></button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className={cn("p-6 rounded-[2rem] border transition-all", data.riskIndicators.isHighRisk ? "bg-rose-50 border-rose-100 ring-4 ring-rose-500/5 shadow-xl shadow-rose-100" : "bg-white border-slate-100 shadow-sm")}>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">System Risk Analysis</p>
                                    <div className="flex items-center gap-2">
                                        <p className={cn("text-xl font-black", data.riskIndicators.isHighRisk ? "text-rose-600" : "text-emerald-500")}>
                                            {data.riskIndicators.isHighRisk ? 'HIGH RISK DETECTED' : 'LOW RISK PROFILE'}
                                        </p>
                                        {data.riskIndicators.isHighRisk && <AlertTriangle className="h-5 w-5 text-rose-500 animate-bounce" />}
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-2 italic">Based on {data.history.feedbacks.length} complaints and {data.riskIndicators.pendingCount} pending requests.</p>
                                </div>
                                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mentor Assignment</p>
                                    <p className="text-lg font-black text-indigo-600">{data.profile.assignedMentor?.name || 'NOT ASSIGNED'}</p>
                                    <button className="text-[10px] font-black text-slate-500 hover:text-indigo-600 mt-1 uppercase tracking-tighter flex items-center gap-1">Change Assignments <ArrowRight className="h-3 w-3" /></button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-amber-500" />
                                        Recent Requests History
                                    </h5>
                                    <div className="space-y-3">
                                        {data.history.requests.slice(0, 3).map(req => (
                                            <div key={req._id} className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">{req.title}</p>
                                                    <p className="text-[10px] text-slate-500 italic uppercase">{req.category} • {new Date(req.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <span className={cn("px-2 py-0.5 rounded text-[8px] font-black tracking-widest border uppercase",
                                                    req.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100')}>
                                                    {req.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-emerald-500" />
                                        Complaints & Feedback Record
                                    </h5>
                                    <div className="space-y-3">
                                        {data.history.feedbacks.map(f => (
                                            <div key={f._id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                                <div className="flex justify-between items-center mb-2">
                                                    <p className="text-xs font-bold text-slate-800">{f.title}</p>
                                                    <CheckCircle2 className={f.status === 'RESOLVED' ? 'h-4 w-4 text-emerald-500' : 'h-4 w-4 text-slate-200'} />
                                                </div>
                                                <p className="text-[10px] text-slate-500 line-clamp-1 italic">{f.description}</p>
                                            </div>
                                        ))}
                                        {data.history.feedbacks.length === 0 && <p className="text-xs text-slate-400 italic text-center py-4">No disciplinary or grievance records.</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const StudentManagement = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const [filters, setFilters] = useState({ department: '', year: '', status: '' });

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/students`, {
                params: filters,
                headers: config.headers
            });
            setStudents(data);
        } catch (error) { toast.error('Failed to fetch students'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchStudents(); }, [filters]);

    const handleStatusUpdate = async (id, isActive) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_BASE_URL}/api/admin/users/${id}/status`, { isActive }, config);
            toast.success(`Account ${isActive ? 'activated' : 'deactivated'}`);
            fetchStudents();
            setModalOpen(false);
        } catch (error) { toast.error('Update failed'); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <StudentProfileModal
                isOpen={isModalOpen}
                studentId={selectedStudentId}
                onClose={() => setModalOpen(false)}
                onStatusChange={handleStatusUpdate}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Student Directory</h1>
                    <p className="text-slate-500">Manage institutional access, audit performance, and assign guidance</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold font-mono focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    >
                        <option value="">ALL DEPARTMENTS</option>
                        <option value="Computer Science">COMP SCI</option>
                        <option value="Engineering">ENGINEERING</option>
                        <option value="Business">BUSINESS</option>
                    </select>
                    <select
                        className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold font-mono focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    >
                        <option value="">ALL YEARS</option>
                        <option value="1">YEAR 1</option>
                        <option value="2">YEAR 2</option>
                        <option value="3">YEAR 3</option>
                        <option value="4">YEAR 4</option>
                    </select>
                    <select
                        className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-black font-serif focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">ALL STATUS</option>
                        <option value="active">ACTIVE ONLY</option>
                        <option value="inactive">SUSPENDED ONLY</option>
                    </select>
                    <Button variant="primary" className="shadow-lg shadow-indigo-500/20"><UserPlus className="h-4 w-4 mr-2" /> Enroll Student</Button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-6">Student Access Identity</th>
                                <th className="px-8 py-6">Department</th>
                                <th className="px-8 py-6">Year / Sem</th>
                                <th className="px-8 py-6">Audit Status</th>
                                <th className="px-8 py-6">Assignments</th>
                                <th className="px-8 py-6 text-center">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="6" className="p-20 text-center"><Loader2 className="animate-spin h-10 w-10 text-indigo-600 mx-auto" /></td></tr>
                            ) : students.map(student => (
                                <tr key={student._id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 leading-none mb-1">{student.name}</p>
                                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">UID: {student.studentId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-xs text-slate-600 uppercase tracking-tighter">{student.department || 'UNCATEGORIZED'}</td>
                                    <td className="px-8 py-6 text-xs text-slate-600 font-black">Y{student.year} • S{student.semester}</td>
                                    <td className="px-8 py-6">
                                        <span className={cn("px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest",
                                            student.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100')}>
                                            {student.isActive ? 'ACTIVE ACCESS' : 'SUSPENDED'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-[10px] font-bold text-indigo-700 underline decoration-indigo-200 decoration-2 underline-offset-4">{student.assignedMentor?.name || 'PENDING ASSIGNMENT'}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <button
                                            onClick={() => { setSelectedStudentId(student._id); setModalOpen(true); }}
                                            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 shadow-lg shadow-slate-200 transition-all transform hover:scale-105"
                                        >
                                            Audit Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
