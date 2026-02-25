import React, { useEffect, useState } from 'react';
import {
    BookOpen,
    Clock,
    CheckCircle,
    User,
    MessageSquare,
    TrendingUp,
    Calendar,
    UserCircle,
    Star,
    Award,
    Target,
    ChevronRight
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
        attendance: '92%',
        cgpa: '8.9',
        hasApprovedMentorship: false
    });
    const [assignedMentor, setAssignedMentor] = useState(null);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };

                const [reqRes, profileRes, mentorRes] = await Promise.allSettled([
                    axios.get('http://localhost:5000/api/requests', config),
                    axios.get('http://localhost:5000/api/auth/profile', config),
                    axios.get('http://localhost:5000/api/mentorship/my-requests', config)
                ]);

                let pendingCount = 0;
                let resolvedCount = 0;
                let mentorshipApproved = false;

                if (reqRes.status === 'fulfilled') {
                    setRequests(reqRes.value.data.slice(0, 3));
                    pendingCount += reqRes.value.data.filter(r => r.status === 'PENDING' || r.status === 'IN_PROGRESS').length;
                    resolvedCount += reqRes.value.data.filter(r => r.status === 'RESOLVED').length;
                }

                if (mentorRes.status === 'fulfilled') {
                    const mData = mentorRes.value.data;
                    pendingCount += mData.filter(m => m.status === 'PENDING').length;
                    const approved = mData.some(m => m.status === 'APPROVED' || m.status === 'SCHEDULED');
                    mentorshipApproved = approved;
                    resolvedCount += mData.filter(m => m.status === 'APPROVED' || m.status === 'SCHEDULED' || m.status === 'COMPLETED').length;
                }

                if (profileRes.status === 'fulfilled' && profileRes.value.data.assignedMentor) {
                    setAssignedMentor(profileRes.value.data.assignedMentor);
                }

                let combinedActivity = [];
                if (reqRes.status === 'fulfilled') {
                    combinedActivity = [...reqRes.value.data];
                }
                if (mentorRes.status === 'fulfilled') {
                    const mappedMentors = mentorRes.value.data.map(m => ({
                        ...m,
                        title: `Mentorship: ${m.mentor?.name || 'Faculty'}`,
                        category: 'Mentorship',
                        isMentorship: true
                    }));
                    combinedActivity = [...combinedActivity, ...mappedMentors];
                }

                combinedActivity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRequests(combinedActivity.slice(0, 5));

                setStats(prev => ({
                    ...prev,
                    pending: pendingCount,
                    resolved: resolvedCount,
                    hasApprovedMentorship: mentorshipApproved
                }));

            } catch (error) {
                console.error("Critical error in dashboard data fetching", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchDashboardData();
    }, [user]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <div className="relative bg-[#1abc9c] rounded-[2rem] p-8 md:p-10 text-white overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[8px] font-extrabold uppercase tracking-[0.15em] border border-white/30">
                                STUDENT PORTAL
                            </span>
                            <span className="text-white/90 font-bold text-xs">{currentDate}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
                            Welcome Back,<br />
                            {user?.name || 'Student'} 🎓
                        </h1>
                        <p className="text-white/95 text-sm font-medium max-w-lg leading-relaxed">
                            You have <span className="text-white font-extrabold">{stats.pending} pending requests</span> and your academic journey is on track.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                       
                        <div
                            className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-xl min-w-[180px] text-slate-900 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => navigate('/dashboard/requests')}
                        >
                            <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-base font-black leading-none">{stats.pending} PENDING</p>
                                <p className="text-[8px] font-extrabold text-indigo-500 uppercase tracking-[0.15em] mt-1">REQUESTS</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#0d4d3f] hover:bg-[#0f5c4a] rounded-2xl p-5 flex items-center gap-4 shadow-xl min-w-[220px] transition-all hover:scale-105"
                        >
                            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-white/60">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-[8px] font-extrabold text-white/50 uppercase tracking-[0.15em] mb-1">CREATE NEW</p>
                                <p className="text-base font-black text-white leading-none">REQUEST</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {stats.hasApprovedMentorship && (
                <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                        <Star className="h-32 w-32" />
                    </div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                <CheckCircle className="h-3.5 w-3.5 text-emerald-300" /> Mentorship Active
                            </div>
                            <h2 className="text-3xl font-black tracking-tight">Congratulations! Your request is Approved.</h2>
                            <p className="text-indigo-100/90 text-base max-w-xl">Your mentorship application has been approved. Connect with your mentor now!</p>
                        </div>
                        <Button
                            className="bg-white text-indigo-700 hover:bg-slate-100 font-black px-8 py-6 rounded-2xl shadow-xl"
                            onClick={() => navigate('/dashboard/mentorship')}
                        >
                            Get Started <ChevronRight className="h-5 w-5 ml-2" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-500 relative min-h-[280px] justify-center">
                    <div className="absolute top-8 right-8">
                        <span className="px-5 py-2 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border border-emerald-200">Completed</span>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-emerald-100">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stats.resolved}</p>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em]">Resolved Requests</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-500 relative min-h-[280px] justify-center">
                    <div className="absolute top-8 right-8">
                        <span className="px-5 py-2 bg-indigo-100 text-indigo-600 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border border-indigo-200">Academic</span>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-100">
                        <BookOpen className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stats.attendance}</p>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em]">Attendance Rate</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center group hover:shadow-xl transition-all duration-500 relative min-h-[280px] justify-center">
                    <div className="absolute top-8 right-8">
                        <span className="px-5 py-2 bg-violet-100 text-violet-600 rounded-full text-[9px] font-extrabold uppercase tracking-[0.15em] border border-violet-200">Performance</span>
                    </div>
                    <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-violet-50 to-violet-100 flex items-center justify-center text-violet-600 mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-violet-100">
                        <TrendingUp className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">{stats.cgpa}</p>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.25em]">Current CGPA</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-600">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Assigned Mentor</p>
                                {stats.hasApprovedMentorship && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase">
                                        <Star className="h-3 w-3 fill-current" /> Approved
                                    </div>
                                )}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">
                                {assignedMentor ? `Dr. ${assignedMentor.name}` : 'Awaiting Assignment'}
                            </h3>
                            {assignedMentor && (
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase">{assignedMentor.designation}</span>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase">{assignedMentor.department}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Button
                        className={cn("px-8 py-6 rounded-2xl font-black", assignedMentor ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 text-slate-600")}
                        onClick={() => navigate('/dashboard/mentorship')}
                    >
                        {assignedMentor ? 'Contact Mentor' : 'Request Mentorship'}
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-2xl font-black text-slate-900">Recent Activity</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/requests')} className="font-bold">View All</Button>
                </div>
                <div className="p-4">
                    {loading ? (
                        <div className="p-12 text-center text-slate-500 font-medium">Loading your requests...</div>
                    ) : requests.length > 0 ? (
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Request Title</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {requests.map(req => (
                                    <tr key={req._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-5 font-bold text-slate-900">
                                            {req.title}
                                            {req.isMentorship && <span className="ml-2 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-black uppercase rounded">Mentorship</span>}
                                        </td>
                                        <td className="px-6 py-5 text-slate-500 font-medium">{new Date(req.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "px-3 py-1.5 rounded-xl text-xs font-black uppercase",
                                                (req.status === 'RESOLVED' || req.status === 'APPROVED' || req.status === 'COMPLETED') ? 'bg-emerald-100 text-emerald-700' :
                                                    (req.status === 'REJECTED') ? 'bg-red-100 text-red-700' :
                                                        (req.status === 'SCHEDULED' || req.status === 'IN_PROGRESS') ? 'bg-indigo-100 text-indigo-700' :
                                                            'bg-amber-100 text-amber-700'
                                            )}>
                                                {req.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-slate-500 font-medium mb-4">No requests found</p>
                            <Button onClick={() => setIsModalOpen(true)}>Create Your First Request</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-6 pb-4">
                <div className="h-px bg-slate-200 w-full mb-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
                    <div className="flex items-center gap-5">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 border-2 border-white flex items-center justify-center text-indigo-600 font-black text-sm">
                                    {i}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-slate-600">
                            <span className="text-2xl font-black text-slate-900">{stats.resolved + stats.pending}+</span> Total Requests Managed
                        </p>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest">CampusConnect Student Portal v2.0</p>
                </div>
            </div>

            <NewRequestModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); }}
                onSuccess={() => { window.location.reload(); }}
            />
        </div>
    );
};

export default Overview;
