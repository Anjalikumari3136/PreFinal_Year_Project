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
    Loader2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { cn } from '../../utils/cn';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const [facultyRes, requestsRes] = await Promise.all([
                axios.get('https://prefinal-year-project.onrender.com/api/mentorship/faculty', config),
                axios.get('https://prefinal-year-project.onrender.com/api/mentorship/my-requests', config)
            ]);
            setFacultyList(facultyRes.data);
            setMyRequests(requestsRes.data);
        } catch (error) {
            console.error('Error fetching mentorship data', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async (e) => {
        e.preventDefault();
        if (!requestMessage.trim()) return;

        setSubmitting(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            await axios.post('https://prefinal-year-project.onrender.com/api/mentorship/request', {
                mentorId: selectedFaculty._id,
                message: requestMessage
            }, config);

            toast.success('Mentorship request sent successfully!');
            setIsModalOpen(false);
            setRequestMessage('');
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send request');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredFaculty = facultyList.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mentorship Program</h1>
                    <p className="text-slate-500 mt-1 text-lg">Connect with faculty members for guidance and career support.</p>
                </div>

                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setView('find')}
                        className={cn(
                            "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                            view === 'find' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        Find a Mentor
                    </button>
                    <button
                        onClick={() => setView('my-requests')}
                        className={cn(
                            "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                            view === 'my-requests' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        My Requests
                    </button>
                </div>
            </div>

            {view === 'find' ? (
                <div className="space-y-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, department, or expertise..."
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
                            <p className="text-slate-500 font-medium">Fetching expert faculty list...</p>
                        </div>
                    ) : filteredFaculty.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No faculty found</h3>
                            <p className="text-slate-500">Try searching with a different keyword.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFaculty.map((faculty) => (
                                <div key={faculty._id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                    <div className="px-6 pb-6 pt-0 relative">
                                        <div className="absolute -top-12 left-6">
                                            {faculty.profileDetails?.avatar ? (
                                                <img src={faculty.profileDetails.avatar} alt={faculty.name} className="h-24 w-24 rounded-2xl object-cover border-4 border-white shadow-lg" />
                                            ) : (
                                                <div className="h-24 w-24 rounded-2xl bg-white flex items-center justify-center border-4 border-white shadow-lg text-3xl font-bold text-indigo-600">
                                                    {faculty.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-14 space-y-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 truncate">{faculty.name}</h3>
                                                <p className="text-indigo-600 font-semibold text-sm">{faculty.designation || 'Faculty Member'}</p>
                                                <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-sm">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    <span>{faculty.department || 'General Department'}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {(faculty.facultyRoles || ['Mentor']).map((role, idx) => (
                                                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-4 border-t border-slate-50">
                                                <Button
                                                    className="w-full group/btn flex items-center justify-center gap-2"
                                                    onClick={() => {
                                                        setSelectedFaculty(faculty);
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    <UserPlus className="h-4 w-4" />
                                                    Request Mentorship
                                                </Button>
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
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                        </div>
                    ) : myRequests.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No mentorship requests yet</h3>
                            <p className="text-slate-500">Find a mentor and start your professional journey.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {myRequests.map((request) => (
                                <div key={request._id} className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col md:flex-row gap-6 hover:border-indigo-200 transition-colors shadow-sm">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl font-bold">
                                                    {request.mentor?.name?.charAt(0) || 'M'}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900">{request.mentor?.name || 'Assigned Mentor'}</h3>
                                                    <p className="text-sm text-slate-500">{request.mentor?.department || 'Department'} • {request.mentor?.designation || 'Faculty'}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "px-4 py-1.5 rounded-full text-xs font-bold border",
                                                getStatusColor(request.status)
                                            )}>
                                                {request.status}
                                            </span>
                                        </div>

                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                            <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-2">
                                                <MessageSquare className="h-3 w-3" /> My Message
                                            </p>
                                            <p className="text-slate-700 text-sm leading-relaxed">{request.requestMessage}</p>
                                        </div>

                                        {request.status === 'SCHEDULED' && request.meetingDetails && (
                                            <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                                                        <Calendar className="h-4 w-4" />
                                                    </div>
                                                    <h4 className="font-bold text-emerald-900">Meeting Scheduled</h4>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-3 text-emerald-800">
                                                        <div className="h-10 w-10 rounded-xl bg-white/50 flex items-center justify-center border border-emerald-100">
                                                            <Calendar className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] uppercase font-bold text-emerald-600/70">Date</p>
                                                            <p className="text-sm font-semibold">{new Date(request.meetingDetails.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-emerald-800">
                                                        <div className="h-10 w-10 rounded-xl bg-white/50 flex items-center justify-center border border-emerald-100">
                                                            <Clock className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] uppercase font-bold text-emerald-600/70">Time</p>
                                                            <p className="text-sm font-semibold">{request.meetingDetails.time}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-emerald-800 col-span-full">
                                                        <div className="h-10 w-10 rounded-xl bg-white/50 flex items-center justify-center border border-emerald-100">
                                                            <MapPin className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] uppercase font-bold text-emerald-600/70">Location / Platform</p>
                                                            <p className="text-sm font-semibold">{request.meetingDetails.location}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {request.meetingDetails.meetingNotes && (
                                                    <div className="mt-4 pt-4 border-t border-emerald-200/50">
                                                        <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Notes from Admin</p>
                                                        <p className="text-sm text-emerald-800">{request.meetingDetails.meetingNotes}</p>
                                                    </div>
                                                )}
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
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[70] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                    {selectedFaculty.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{selectedFaculty.name}</h3>
                                    <p className="text-indigo-600">{selectedFaculty.department}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleRequest} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
                                    <Info className="h-5 w-5 text-indigo-500" />
                                    <p>Tell your mentor why you'd like to connect and what you'd like to discuss.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Request Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-700 placeholder:text-slate-400"
                                        placeholder="Hi! I am interested in your guidance regarding my career development and tech stack choices..."
                                        value={requestMessage}
                                        onChange={(e) => setRequestMessage(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="flex-1 py-4"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 py-4"
                                    disabled={submitting}
                                >
                                    {submitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : 'Send Request'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mentorship;
