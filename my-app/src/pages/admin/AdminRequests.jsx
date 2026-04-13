import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MessageCircle,
    CheckCircle,
    XCircle,
    Clock,
    X,
    AlertCircle,
    UserPlus,
    ShieldPlus,
    FileText,
    ArrowRight,
    Loader2,
    Shield
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

const AdminRequests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('All');
    const [faculty, setFaculty] = useState([]);

    const [resolutionNote, setResolutionNote] = useState('');
    const [resolving, setResolving] = useState(false);
    const [assigningTo, setAssigningTo] = useState('');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/requests`, config);
            setRequests(data);
        } catch (error) { toast.error('Failed to fetch requests'); }
        finally { setLoading(false); }
    };

    const fetchFaculty = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/faculty`, config);
            setFaculty(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchRequests(); fetchFaculty(); }, []);

    const handleResolve = async (status) => {
        if (!resolutionNote && status !== 'IN_PROGRESS' && !assigningTo) {
            toast.error('Please add a note or assign a faculty.');
            return;
        }

        setResolving(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };
            const payload = { status, resolutionNotes: resolutionNote };
            if (assigningTo) payload.assignedTo = assigningTo;

            await axios.put(`${API_BASE_URL}/api/admin/requests/${selectedRequest._id}`, payload, config);
            toast.success(assigningTo ? `Request assigned to faculty` : `Request marked as ${status}`);
            setSelectedRequest(null);
            setResolutionNote('');
            setAssigningTo('');
            fetchRequests();
        } catch (error) { toast.error('Update failed'); }
        setResolving(false);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'RESOLVED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'IN_PROGRESS': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
            case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(req => req.status === filter.toUpperCase().replace(' ', '_'));

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-8 animate-in fade-in duration-500">
            <div className={cn("flex-1 flex flex-col transition-all duration-300", selectedRequest ? "w-1/2 hidden md:flex" : "w-full")}>
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">Request Control</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Handle student inquiries and delegation</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-white/50 border border-slate-200 rounded-2xl">
                        {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    filter === f ? "bg-orange-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
                    <div className="overflow-y-auto flex-1 p-6 space-y-4 custom-scrollbar">
                        {loading ? (
                            <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-orange-500" /></div>
                        ) : filteredRequests.map(req => (
                            <div
                                key={req._id}
                                onClick={() => {
                                    setSelectedRequest(req);
                                    setResolutionNote(req.resolutionNotes || '');
                                    setAssigningTo(req.assignedTo || '');
                                }}
                                className={cn(
                                    "p-6 rounded-[2rem] border cursor-pointer hover:shadow-xl transition-all relative group",
                                    selectedRequest?._id === req._id ? "border-orange-500 bg-orange-50/10 ring-2 ring-orange-500/5 shadow-lg shadow-orange-500/5" : "border-slate-100 bg-white hover:border-orange-200"
                                )}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-2">
                                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest", getStatusColor(req.status))}>
                                            {req.status.replace('_', ' ')}
                                        </span>
                                        {req.assignedTo && (
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-violet-50 text-violet-700 border border-violet-100 flex items-center gap-1 uppercase tracking-widest">
                                                <ShieldPlus className="h-2 w-2" /> DELEGATED
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{new Date(req.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors tracking-tight">{req.title}</h3>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[11px] font-bold text-slate-400">From: <span className="text-slate-900 font-black">{req.student?.name}</span> • {req.student?.studentId}</p>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{req.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedRequest && (
                <div className="w-full md:w-1/2 bg-white rounded-[3rem] border border-slate-200 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-orange-600 tracking-widest uppercase">
                                <AlertCircle className="h-4 w-4" /> Request Processing Center
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">{selectedRequest.title}</h2>
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{selectedRequest.category}</span>
                        </div>
                        <button onClick={() => setSelectedRequest(null)} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100 text-slate-400">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                        <div className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-inner">
                            <div className="h-14 w-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-600/20">
                                {selectedRequest.student?.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-lg font-black text-slate-900 leading-none mb-1">{selectedRequest.student?.name}</p>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {selectedRequest.student?.studentId} • STUDENT</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Student Description</h3>
                            <div className="text-slate-700 text-base font-medium leading-relaxed whitespace-pre-wrap bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:-rotate-12 transition-transform"><FileText className="h-32 w-32" /></div>
                                <span className="relative z-10">{selectedRequest.description}</span>
                            </div>
                        </div>

                        <div className="space-y-6 pt-2">
                            {selectedRequest.category === 'DEAN_OFFICE' ? (
                                <div className="p-8 bg-orange-50/50 rounded-[2.5rem] border border-orange-100 shadow-sm mb-6 text-center">
                                    <ShieldPlus className="h-8 w-8 text-orange-500 mx-auto mb-2 opacity-80" />
                                    <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest">Sent Directly to Dean's Portal</p>
                                    <p className="text-xs font-bold text-orange-600/70 mt-1">Admin reassignment is restricted for this category.</p>
                                </div>
                            ) : (
                                <div className="p-8 bg-violet-50/50 rounded-[2.5rem] border border-violet-100 shadow-sm mb-6">
                                    <h3 className="text-[10px] font-black text-violet-700 uppercase tracking-widest mb-6 flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-xl bg-violet-100 flex items-center justify-center"><UserPlus className="h-4 w-4" /></div>
                                        Delegate to Faculty / Expert
                                    </h3>
                                    <div className="flex gap-3">
                                        <select
                                            className="flex-1 p-5 bg-white border border-violet-200 rounded-2xl text-xs font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-violet-500/5 transition-all"
                                            value={assigningTo}
                                            onChange={(e) => setAssigningTo(e.target.value)}
                                        >
                                            <option value="">-- Choose Reviewer --</option>
                                            {faculty.map(f => (
                                                <option key={f._id} value={f._id}>{f.name} ({f.department})</option>
                                            ))}
                                        </select>
                                        <Button className="px-8 bg-violet-600 hover:bg-violet-700 rounded-2xl text-[10px] font-black uppercase tracking-widest h-auto" onClick={() => handleResolve('IN_PROGRESS')} disabled={!assigningTo || resolving}>
                                            Assign
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Internal Remarks</h3>
                                <textarea
                                    className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500/20 outline-none transition-all resize-none text-sm font-medium min-h-[150px] placeholder:italic"
                                    placeholder="Add resolution details for student..."
                                    value={resolutionNote}
                                    onChange={(e) => setResolutionNote(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    className="flex-1 py-5 bg-rose-50 text-rose-600 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-rose-100 hover:bg-rose-100 transition-all"
                                    onClick={() => handleResolve('REJECTED')}
                                    disabled={resolving}
                                >
                                    Reject Request
                                </button>
                                <button
                                    className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                    onClick={() => handleResolve('RESOLVED')}
                                    disabled={resolving}
                                >
                                    {resolving ? <Loader2 className="animate-spin h-5 w-5" /> : <><CheckCircle className="h-5 w-5" /> Resolve & Close</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRequests;
