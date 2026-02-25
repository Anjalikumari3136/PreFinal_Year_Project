import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Clock,
    MapPin,
    MessageSquare,
    User,
    CheckCircle2,
    X,
    Loader2,
    Info,
    ExternalLink,
    ChevronRight,
    Video
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

const MentorshipManagement = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [facultyList, setFacultyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('All');

   
    const [meetingData, setMeetingData] = useState({
        date: '',
        time: '',
        location: '',
        meetingNotes: '',
        adminResponse: '',
        mentorId: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [reqRes, facRes] = await Promise.all([
                axios.get('http://localhost:5000/api/mentorship/admin/requests', config),
                axios.get('http://localhost:5000/api/admin/faculty', config)
            ]);
            setRequests(reqRes.data);
            setFacultyList(facRes.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSchedule = async (e) => {
        e.preventDefault();
        if (!meetingData.date || !meetingData.time || !meetingData.location) {
            toast.error('Please fill all mandatory meeting details');
            return;
        }

        setSubmitting(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            await axios.put(`http://localhost:5000/api/mentorship/admin/schedule/${selectedRequest._id}`, meetingData, config);

            toast.success('Meeting scheduled and mentor assigned!');
            setSelectedRequest(null);
            setMeetingData({
                date: '',
                time: '',
                location: '',
                meetingNotes: '',
                adminResponse: '',
                mentorId: ''
            });
            fetchRequests();
        } catch (error) {
            toast.error('Scheduling failed');
        }
        setSubmitting(false);
    };

    const handleReject = async () => {
        if (!window.confirm('Are you sure you want to reject this request?')) return;
        setSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/mentorship/admin/status/${selectedRequest._id}`, {
                status: 'REJECTED',
                adminResponse: meetingData.adminResponse
            }, config);
            toast.success('Request rejected');
            setSelectedRequest(null);
            fetchRequests();
        } catch (error) {
            toast.error('Failed to reject');
        }
        setSubmitting(false);
    };

    const handleQuickAssign = async () => {
        setSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/mentorship/admin/schedule/${selectedRequest._id}`, {
                mentorId: meetingData.mentorId || selectedRequest.mentor._id,
                adminResponse: meetingData.adminResponse
            }, config);
            toast.success('Mentor assigned as per request!');
            setSelectedRequest(null);
            fetchRequests();
        } catch (error) {
            toast.error('Assignment failed');
        }
        setSubmitting(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'PENDING': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(req => req.status === filter.toUpperCase());

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
          
            <div className={cn("flex-1 flex flex-col transition-all duration-300", selectedRequest ? "hidden lg:flex" : "w-full")}>
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Mentorship Coordination</h1>
                        <p className="text-slate-500">Approve mentorship requests and schedule meetings</p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {['All', 'Pending', 'Scheduled'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                    filter === f
                                        ? "bg-white text-indigo-600 shadow-sm"
                                        : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12">
                            <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mb-4" />
                            <p className="text-slate-500">Fetching requests...</p>
                        </div>
                    ) : filteredRequests.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12">
                            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Calendar className="h-8 w-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium text-lg">No requests to show</p>
                            <p className="text-slate-400 text-sm">Choose another filter or check back later.</p>
                        </div>
                    ) : (
                        <div className="overflow-y-auto flex-1 p-4 space-y-3">
                            {filteredRequests.map(req => (
                                <div
                                    key={req._id}
                                    onClick={() => {
                                        setSelectedRequest(req);
                                        setMeetingData({
                                            date: req.meetingDetails?.date?.split('T')[0] || '',
                                            time: req.meetingDetails?.time || '',
                                            location: req.meetingDetails?.location || '',
                                            meetingNotes: req.meetingDetails?.meetingNotes || '',
                                            adminResponse: req.adminResponse || '',
                                            mentorId: req.mentor?._id || ''
                                        });
                                    }}
                                    className={cn(
                                        "p-5 rounded-2xl border cursor-pointer hover:shadow-lg transition-all duration-300 group",
                                        selectedRequest?._id === req._id ? "border-indigo-500 bg-indigo-50/20 ring-1 ring-indigo-500" : "border-slate-100 bg-white hover:border-indigo-200"
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                                {req.student?.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">{req.student?.name}</h3>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{req.student?.department} • Year {req.student?.year}</p>
                                            </div>
                                        </div>
                                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest", getStatusColor(req.status))}>
                                            {req.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                        <User className="h-4 w-4 text-indigo-500" />
                                        <span>Requested Mentor: <span className="font-bold text-slate-900">{req.mentor?.name}</span></span>
                                    </div>

                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(req.createdAt).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1 group-hover:text-indigo-600 transition-colors">Details <ChevronRight className="h-3 w-3" /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {
                selectedRequest ? (
                    <div className="w-full lg:w-[450px] bg-white rounded-[2rem] border border-slate-200 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300 overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100">
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Assign Meeting</h2>
                            </div>
                            <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                                <X className="h-6 w-6 text-slate-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                           
                            <div className="bg-indigo-50/50 p-6 rounded-[1.5rem] border border-indigo-100 relative">
                                <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Student Request</div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                                        {selectedRequest.student?.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{selectedRequest.student?.name}</p>
                                        <p className="text-xs text-indigo-600">{selectedRequest.student?.studentId}</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-sm italic leading-relaxed">"{selectedRequest.requestMessage}"</p>
                                <div className="mt-4 pt-4 border-t border-indigo-100 flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400">Target Faculty:</span>
                                    <span className="text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">{selectedRequest.mentor?.name}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 space-y-4">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Official Mentor Assignment</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold"
                                    value={meetingData.mentorId}
                                    onChange={(e) => setMeetingData({ ...meetingData, mentorId: e.target.value })}
                                >
                                    <option value="">Select Official Mentor</option>
                                    {facultyList.map(f => (
                                        <option key={f._id} value={f._id}>{f.name} - {f.department}</option>
                                    ))}
                                </select>
                                <p className="text-[10px] text-slate-400 font-medium px-1 italic">
                                    * Defaults to student's requested mentor. You can override this selection if needed.
                                </p>
                            </div>
                            <form onSubmit={handleSchedule} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                                            value={meetingData.date}
                                            onChange={(e) => setMeetingData({ ...meetingData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Time</label>
                                        <input
                                            type="time"
                                            required
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                                            value={meetingData.time}
                                            onChange={(e) => setMeetingData({ ...meetingData, time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Location / Meeting Link</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Room 202 or Zoom/G-Meet Link"
                                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                                            value={meetingData.location}
                                            onChange={(e) => setMeetingData({ ...meetingData, location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Notes for Student & Mentor</label>
                                    <textarea
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm resize-none"
                                        rows="3"
                                        placeholder="Add any specific instructions or items to bring..."
                                        value={meetingData.meetingNotes}
                                        onChange={(e) => setMeetingData({ ...meetingData, meetingNotes: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex flex-col gap-3 pt-4">
                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1 py-4 border-rose-200 text-rose-600 hover:bg-rose-50"
                                            onClick={handleReject}
                                            disabled={submitting}
                                        >
                                            Reject Request
                                        </Button>
                                        <Button
                                            type="button"
                                            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100"
                                            onClick={handleQuickAssign}
                                            disabled={submitting}
                                        >
                                            Approve & Assign
                                        </Button>
                                    </div>
                                    <div className="p-3 bg-indigo-50/30 rounded-2xl border border-indigo-50 text-center">
                                        <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mb-2">Or Schedule Official Meeting</p>
                                        <Button
                                            type="submit"
                                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                                            disabled={submitting}
                                        >
                                            {submitting ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (selectedRequest.status === 'SCHEDULED' ? 'Update Meeting & Sync' : 'Schedule Meeting')}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex w-[450px] bg-slate-50 rounded-[2rem] border border-dashed border-slate-300 border-2 items-center justify-center p-12 text-center">
                        <div className="space-y-4">
                            <div className="h-20 w-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center mx-auto text-indigo-600">
                                <Info className="h-10 w-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Select a request</h3>
                                <p className="text-slate-500 mt-2">Click on a student's mentorship request to review details and assign a meeting slot.</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default MentorshipManagement;
