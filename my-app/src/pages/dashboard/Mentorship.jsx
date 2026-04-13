import React, { useState, useEffect } from 'react';
import {
    Users,
    Calendar,
    Video,
    MapPin,
    Clock,
    MessageSquare,
    CheckCircle2,
    Clock3,
    Search,
    UserPlus,
    Info,
    ChevronRight,
    X,
    Loader2,
    Award,
    TrendingUp,
    Shield
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { cn } from '../../utils/cn';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

const Mentorship = () => {
    const { user } = useAuth();
    const [facultyList, setFacultyList] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [requestMessage, setRequestMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [view, setView] = useState('find'); 

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [facultyRes, requestsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/mentorship/faculty`, config),
                axios.get(`${API_BASE_URL}/api/mentorship/my-requests`, config)
            ]);
            setFacultyList(facultyRes.data);
            setMyRequests(requestsRes.data);
        } catch (error) { toast.error('Failed to load mentorship hub'); }
        finally { setLoading(false); }
    };

    const handleRequest = async (e) => {
        e.preventDefault();
        if (!requestMessage.trim()) return;
        setSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`${API_BASE_URL}/api/mentorship/request`, {
                mentorId: selectedFaculty._id,
                message: requestMessage
            }, config);
            toast.success('Mentorship request sent!');
            setIsModalOpen(false);
            setRequestMessage('');
            fetchData();
        } catch (error) { toast.error(error.response?.data?.message || 'Failed to send request'); }
        finally { setSubmitting(false); }
    };

    const filteredFaculty = facultyList.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'PENDING': return 'bg-orange-50 text-orange-700 border-orange-100 shadow-sm';
            case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2 italic uppercase">Mentorship Program</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-orange-600 decoration-2 underline-offset-4">Connect with University Expert Bureau</p>
                </div>

                <div className="flex bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm w-fit shrink-0">
                    <button
                        onClick={() => setView('find')}
                        className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            view === 'find' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        Find Experts
                    </button>
                    <button
                        onClick={() => setView('my-requests')}
                        className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            view === 'my-requests' ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        My Sessions
                    </button>
                </div>
            </div>

            {view === 'find' ? (
                <div className="space-y-8">
                    <div className="relative group max-w-2xl">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find by name, department, or domain expertise..."
                            className="w-full pl-14 pr-8 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all outline-none text-slate-700 font-bold text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="py-20 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-orange-500" /></div>
                    ) : filteredFaculty.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                            <Users className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                            <p className="font-black text-slate-400 uppercase text-xs tracking-widest">No expert mentors found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredFaculty.map((faculty) => (
                                <div key={faculty._id} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group">
                                    <div className="h-28 bg-[#171317] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/30 rounded-full blur-[50px] -mr-16 opacity-50"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent"></div>
                                    </div>
                                    <div className="px-8 pb-10 relative">
                                        <div className="mt-8 space-y-5">
                                            <div>
                                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-3 group-hover:text-orange-600 transition-colors italic uppercase">{faculty.name}</h3>
                                                <p className="text-orange-600 font-black text-[10px] uppercase tracking-widest">{faculty.designation || 'Academic Mentor'}</p>
                                                <div className="flex items-center gap-2 mt-3 text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{faculty.department || 'Center for Excellence'}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {(faculty.facultyRoles || ['Guidance', 'Research']).map((role, idx) => (
                                                    <span key={idx} className="px-3 py-1 rounded-xl bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-widest border border-slate-100">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-6 border-t border-slate-50">
                                                <button
                                                    className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                                    onClick={() => {
                                                        setSelectedFaculty(faculty);
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    <UserPlus className="h-4 w-4" />
                                                    Request Assignment
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {loading ? (
                        <div className="py-20 text-center"><Loader2 className="h-10 w-10 animate-spin mx-auto text-orange-500" /></div>
                    ) : myRequests.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                            <Award className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                            <p className="font-black text-slate-400 uppercase text-xs tracking-widest">No mentorship history yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {myRequests.map((request) => (
                                <div key={request._id} className="bg-white rounded-[3rem] border border-slate-100 p-8 flex flex-col md:flex-row gap-10 hover:shadow-2xl hover:border-orange-100 transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-[400px] h-full bg-orange-600 rounded-full blur-[100px] opacity-[0.02] -mr-48"></div>
                                    <div className="flex-1 space-y-6 relative z-10">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="h-20 w-20 rounded-[2rem] bg-[#171317] flex items-center justify-center text-white text-3xl font-black shadow-2xl">
                                                    {request.mentor?.name?.charAt(0) || 'M'}
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic group-hover:text-orange-600 transition-all underline decoration-slate-100 decoration-4 underline-offset-4">{request.mentor?.name || 'Academic Mentor'}</h3>
                                                    <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">{request.mentor?.department || 'University Bureau'} • {request.mentor?.designation || 'Specialist'}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm h-fit",
                                                getStatusColor(request.status)
                                            )}>
                                                {request.status.replace('_', ' ')}
                                            </span>
                                        </div>

                                        <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 relative group/msg">
                                            <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover/msg:rotate-6 transition-transform rotate-12"><MessageSquare className="h-32 w-32" /></div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <TrendingUp className="h-3 w-3" /> Statement of Purpose
                                            </p>
                                            <p className="text-slate-700 font-medium text-base italic leading-relaxed relative z-10">"{request.requestMessage}"</p>
                                        </div>

                                        {request.status === 'SCHEDULED' && request.meetingDetails && (
                                            <div className="bg-[#171317] p-10 rounded-[2.5rem] border border-white/5 text-white shadow-2xl relative overflow-hidden group/session">
                                                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600 rounded-full blur-[100px] -mr-24 -mt-24 opacity-30 shadow-orange-600/50"></div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-4 mb-10">
                                                        <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
                                                            <Calendar className="h-5 w-5" />
                                                        </div>
                                                        <h4 className="text-xl font-black uppercase italic tracking-tight">Meeting Protocol Initialized</h4>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 opacity-80 underline decoration-white/10 decoration-2">Date</p>
                                                            <p className="text-base font-black tracking-tight">{new Date(request.meetingDetails.date).toDateString()}</p>
                                                        </div>
                                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 opacity-80 underline decoration-white/10 decoration-2">Timestamp</p>
                                                            <p className="text-base font-black tracking-tight">{request.meetingDetails.time}</p>
                                                        </div>
                                                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 opacity-80 underline decoration-white/10 decoration-2">Hub Location</p>
                                                            <p className="text-base font-black tracking-tight flex items-center gap-3 group/loc cursor-pointer hover:text-orange-400 transition-colors">
                                                                <Video className="h-4 w-4" /> {request.meetingDetails.location}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {request.meetingDetails.meetingNotes && (
                                                        <div className="mt-8 pt-8 border-t border-white/5">
                                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">Mentor Notes:</p>
                                                            <p className="text-slate-400 text-sm font-medium leading-relaxed uppercase tracking-wide opacity-80">{request.meetingDetails.meetingNotes}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isModalOpen && selectedFaculty && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden border border-slate-100">
                        <div className="p-8 md:p-10 border-b border-slate-50 flex items-start justify-between bg-slate-50/50">
                            <div className="flex items-center gap-5">
                                <div className="h-20 w-20 rounded-[2rem] bg-orange-600 text-white flex items-center justify-center shadow-2xl font-black text-3xl">
                                    {selectedFaculty.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none italic uppercase mb-2">{selectedFaculty.name}</h3>
                                    <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] underline decoration-slate-400 underline-offset-4">{selectedFaculty.department}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100 text-slate-400">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleRequest} className="p-8 md:p-10 space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 text-slate-500 text-xs font-bold uppercase tracking-wide bg-[#171317] p-6 rounded-[2rem] text-white/80 border border-white/5 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    <Info className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
                                    <p className="relative z-10 leading-relaxed uppercase opacity-80">Security Protocol: Every request is monitored by administration to ensure expert quality standards.</p>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Letter of Intent</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all text-slate-700 font-bold text-sm resize-none placeholder:italic placeholder:font-normal placeholder:opacity-50"
                                        placeholder="Explain your academic goals and why you believe this mentor board is right for your growth..."
                                        value={requestMessage}
                                        onChange={(e) => setRequestMessage(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex-1 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-[2] py-5 rounded-2xl bg-slate-900 text-white hover:bg-black font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all outline-none border-none"
                                    disabled={submitting}
                                >
                                    {submitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Authorize Request'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <div className="bg-slate-50 rounded-[3rem] p-12 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group">
                 <div className="h-20 w-20 rounded-3xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 mb-6 group-hover:rotate-12 transition-transform shadow-sm">
                     <Shield className="h-8 w-8" />
                 </div>
                 <h4 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic leading-none mb-4">Integrity Board</h4>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] max-w-[450px] leading-relaxed opacity-80">Mentorship sessions are recorded for institutional compliance and quality assurance to protect both students and faculty.</p>
            </div>
        </div>
    );
};

export default Mentorship;
