import React, { useState, useEffect } from 'react';
import {
    Users,
    UserPlus,
    FileText,
    MessageSquare,
    ShieldCheck,
    ShieldAlert,
    Activity,
    ArrowRight,
    History,
    Globe,
    LayoutDashboard,
    Loader2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const AdminOverview = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        students: 0,
        faculty: 0,
        requests: 0,
        feedback: 0,
        mentorship: 0
    });
    const [logs, setLogs] = useState([]);
    const [students, setStudents] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [pendingItems, setPendingItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [statsRes, logRes, userRes, facRes, reqRes, feedRes, mentorRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/stats', config),
                axios.get('http://localhost:5000/api/admin/audit-logs', config),
                axios.get('http://localhost:5000/api/admin/students?limit=5', config),
                axios.get('http://localhost:5000/api/admin/faculty', config),
                axios.get('http://localhost:5000/api/admin/requests', config),
                axios.get('http://localhost:5000/api/admin/feedback', config),
                axios.get('http://localhost:5000/api/mentorship/admin/requests', config)
            ]);

            setStats(statsRes.data);
            setLogs(logRes.data);
            setStudents(userRes.data);
            setFaculty(facRes.data.slice(0, 5));

            const allPending = [
                ...reqRes.data.filter(r => r.status === 'PENDING').map(r => ({ ...r, type: 'REQUEST' })),
                ...feedRes.data.filter(f => f.status === 'PENDING').map(f => ({ ...f, type: 'COMPLAINT' })),
                ...mentorRes.data.filter(m => m.status === 'PENDING').map(m => ({
                    ...m,
                    type: 'MENTORSHIP',
                    title: `Mentorship: ${m.mentor?.name}`,
                    category: 'Guidance'
                }))
            ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

            setPendingItems(allPending);
        } catch (error) { console.error('Overview error:', error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-indigo-600" /></div>;

    const statCards = [
        { title: 'Total Students', value: stats.students, icon: Users, color: 'bg-blue-500', path: '/admin-dashboard/students' },
        { title: 'Faculty Members', value: stats.faculty, icon: UserPlus, color: 'bg-violet-500', path: '/admin-dashboard/faculty' },
        { title: 'Open Requests', value: stats.requests, icon: FileText, color: 'bg-amber-500', path: '/admin-dashboard/requests' },
        { title: 'New Feedback', value: stats.feedback, icon: MessageSquare, color: 'bg-emerald-500', path: '/admin-dashboard/feedback' },
        { title: 'Mentorship Needs', value: stats.mentorship, icon: Users, color: 'bg-indigo-500', path: '/admin-dashboard/mentorship' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-center shadow-2xl group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-1000"></div>
                <div className="relative z-10 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-1">Authenticated System Admin</p>
                        <h1 className="text-3xl font-black">{user.name}</h1>
                        <p className="text-slate-400 text-sm">{user.adminRole || 'Super Admin'} • Centralized Campus Control</p>
                    </div>
                </div>
                <div className="mt-6 md:mt-0 flex gap-3 relative z-10">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-tighter">System Health</p>
                        <p className="text-emerald-400 font-bold text-sm">OPTTIMAL</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                        <p className="text-[10px] font-black opacity-40 uppercase tracking-tighter">Last Login</p>
                        <p className="text-indigo-300 font-bold text-sm">Today, 09:42</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <div
                        key={i}
                        onClick={() => navigate(card.path)}
                        className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group"
                    >
                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6", card.color + " text-white shadow-lg shadow-indigo-100")}>
                            <card.icon className="h-6 w-6" />
                        </div>
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-tight">{card.title}</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-slate-900">{card.value}</h3>
                            <span className="text-emerald-500 text-xs font-black">+4%</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border-2 border-indigo-100 shadow-xl shadow-indigo-50/50 overflow-hidden">
                <div className="p-8 border-b border-indigo-50 flex justify-between items-center bg-indigo-50/30">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                                <Activity className="h-5 w-5" />
                            </div>
                            Pending Problem Resolution Desk
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Items requiring your immediate administrative action</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate('/admin-dashboard/requests')} className="rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                        View Resolution Center <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                <div className="p-4 bg-white">
                    <div className="space-y-3">
                        {pendingItems.length > 0 ? pendingItems.map(item => (
                            <div key={item._id} className="group flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-300 hover:bg-white transition-all shadow-sm hover:shadow-md">
                                <div className="flex items-center gap-5">
                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
                                        item.type === 'REQUEST' ? "bg-amber-100 text-amber-600" :
                                            item.type === 'COMPLAINT' ? "bg-rose-100 text-rose-600" :
                                                "bg-indigo-100 text-indigo-600")}>
                                        {item.type === 'REQUEST' ? <FileText className="h-6 w-6" /> :
                                            item.type === 'COMPLAINT' ? <MessageSquare className="h-6 w-6" /> :
                                                <Users className="h-6 w-6" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={cn("px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest uppercase border",
                                                item.type === 'REQUEST' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                    item.type === 'COMPLAINT' ? "bg-rose-50 text-rose-700 border-rose-200" :
                                                        "bg-indigo-50 text-indigo-700 border-indigo-200")}>
                                                {item.category || item.type}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold">{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5">Reported by: <span className="font-bold text-slate-700">{item.student?.name}</span></p>
                                    </div>
                                </div>
                                <Button
                                    className="rounded-2xl h-10 px-6 font-black text-[10px] tracking-widest uppercase shadow-none border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-600 hover:text-white hover:bg-indigo-600 transition-all"
                                    onClick={() => navigate(
                                        item.type === 'REQUEST' ? '/admin-dashboard/requests' :
                                            item.type === 'COMPLAINT' ? '/admin-dashboard/feedback' :
                                                '/admin-dashboard/mentorship'
                                    )}
                                >
                                    Solve Problem
                                </Button>
                            </div>
                        )) : (
                            <div className="p-12 text-center text-slate-400 italic bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                                Excellent! No students are currently facing any unresolved issues.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-600" />
                                Student Roster (Recent)
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/admin-dashboard/students')} className="text-indigo-600 font-bold">View All</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Dept</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {students.map(s => (
                                        <tr key={s._id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/admin-dashboard/students')}>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                                                <p className="text-[10px] text-slate-500">{s.studentId}</p>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-600">{s.department || 'N/A'}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider",
                                                    s.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100')}>
                                                    {s.isActive ? 'ACTIVE' : 'INACTIVE'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <UserPlus className="h-5 w-5 text-indigo-600" />
                                Faculty Directory
                            </h3>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/admin-dashboard/faculty')} className="text-indigo-600 font-bold">Manage Faculty</Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4">Faculty Member</th>
                                        <th className="px-6 py-4">Specialization</th>
                                        <th className="px-6 py-4">Roles</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {faculty.length > 0 ? faculty.map(f => (
                                        <tr key={f._id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/admin-dashboard/faculty')}>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-900 text-sm">{f.name}</p>
                                                <p className="text-[10px] text-slate-500">{f.designation || 'Staff'}</p>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-600">{f.department}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {(f.facultyRoles || ['Instructor']).slice(0, 2).map(role => (
                                                        <span key={role} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[8px] font-black uppercase border border-indigo-100">
                                                            {role}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center text-slate-400 italic">No faculty members found. Click 'Manage Faculty' to add some.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <History className="h-5 w-5 text-indigo-600" />
                                Security & Audit Logs
                            </h3>
                            <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] tracking-widest uppercase">Export Logs</Button>
                        </div>
                        <div className="p-4 overflow-y-auto max-h-[500px]">
                            <div className="space-y-4">
                                {logs.length > 0 ? logs.map(log => (
                                    <div key={log._id} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <div className={cn("h-10 w-10 shrink-0 rounded-xl flex items-center justify-center",
                                            log.action.includes('DEACTIVATE') ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600')}>
                                            {log.action.includes('USER') ? <Users className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-black text-slate-900 leading-none mb-1">
                                                    {log.action.replace(/_/g, ' ')}
                                                </p>
                                                <span className="text-[10px] text-slate-400 font-bold">{new Date(log.createdAt).toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                <span className="font-bold text-slate-700">{log.performedBy?.name}</span>
                                                {log.targetUser ? ` manually updated account for ${log.targetUser.name}` : ' performed a system action'}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-tighter">{log.details || 'ID: ' + log._id.slice(-8)}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-12 text-center italic text-slate-400">No security events recorded yet.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
                            <ShieldAlert className="h-24 w-24" />
                        </div>
                        <h3 className="text-lg font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-indigo-300" />
                            Compliance Hub
                        </h3>
                        <div className="space-y-3">
                            {['GDPR Privacy Audit', 'SLA Resolution Monitoring', 'Permission Escalation', 'System Integrity Check'].map(item => (
                                <div key={item} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                                    <span className="text-[11px] font-bold tracking-tight uppercase">{item}</span>
                                    <ArrowRight className="h-4 w-4 text-indigo-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                        <h3 className="font-black text-slate-900 mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
                            <Activity className="h-5 w-5 text-indigo-600" />
                            System Activity
                        </h3>
                        <div className="h-32 flex items-end gap-1 px-4">
                            {[40, 70, 45, 90, 65, 80, 50, 95, 75, 60].map((h, i) => (
                                <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[8px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{h}req/h</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] text-center text-slate-400 mt-4 font-black uppercase tracking-widest">Active System Load • Avg 68%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
