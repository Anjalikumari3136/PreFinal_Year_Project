import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, CheckCircle, XCircle, Clock, X, AlertCircle, UserPlus, ShieldPlus } from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

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
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/admin/requests', config);
            setRequests(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch requests');
        } finally {
            setLoading(false);
        }
    };

    const fetchFaculty = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/admin/faculty', config);
            setFaculty(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRequests();
        fetchFaculty();
    }, []);

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

            const payload = {
                status,
                resolutionNotes: resolutionNote
            };

            if (assigningTo) payload.assignedTo = assigningTo;

            await axios.put(`https://prefinal-year-project.onrender.com/api/admin/requests/${selectedRequest._id}`, payload, config);

            toast.success(assigningTo ? `Request assigned to faculty` : `Request marked as ${status}`);
            setSelectedRequest(null);
            setResolutionNote('');
            setAssigningTo('');
            fetchRequests();
        } catch (error) {
            toast.error('Update failed');
        }
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
        <div className="flex h-[calc(100vh-8rem)] gap-6">
            <div className={cn("flex-1 flex flex-col transition-all duration-300", selectedRequest ? "w-1/2 hidden md:flex" : "w-full")}>
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Request Management</h1>
                        <p className="text-slate-500">Handle student inquiries and delegation</p>
                    </div>
                    <div className="flex gap-2">
                        {['All', 'Pending', 'In Progress', 'Resolved'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                                    filter === f
                                        ? "bg-slate-800 text-white border-slate-800"
                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1 overflow-hidden flex flex-col">
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {loading ? (
                            <p className="p-8 text-center text-slate-500">Loading...</p>
                        ) : filteredRequests.map(req => (
                            <div
                                key={req._id}
                                onClick={() => {
                                    setSelectedRequest(req);
                                    setResolutionNote(req.resolutionNotes || '');
                                    setAssigningTo(req.assignedTo || '');
                                }}
                                className={cn(
                                    "p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all",
                                    selectedRequest?._id === req._id ? "border-indigo-500 bg-indigo-50/10 ring-1 ring-indigo-500" : "border-slate-100 bg-white hover:border-indigo-200"
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-2">
                                        <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider", getStatusColor(req.status))}>
                                            {req.status.replace('_', ' ')}
                                        </span>
                                        {req.assignedTo && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 text-violet-700 border border-violet-100 flex items-center gap-1">
                                                <ShieldPlus className="h-2 w-2" /> DELEGATED
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-400">{new Date(req.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">{req.title}</h3>
                                <p className="text-xs text-slate-500 mb-2">From: <span className="font-medium text-slate-700">{req.student?.name}</span> ({req.student?.studentId || 'N/A'})</p>
                                <p className="text-sm text-slate-600 line-clamp-2">{req.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedRequest && (
                <div className="w-full md:w-1/2 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col h-full animate-in slide-in-from-right duration-200">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50 rounded-t-2xl">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedRequest.title}</h2>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <span className="flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {selectedRequest.category}</span>
                            </div>
                        </div>
                        <button onClick={() => setSelectedRequest(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                            <X className="h-6 w-6 text-slate-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                   
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                {selectedRequest.student?.name?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{selectedRequest.student?.name}</p>
                                <p className="text-xs text-slate-500">ID: {selectedRequest.student?.studentId}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Description</h3>
                            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-slate-50/30 p-4 rounded-xl border border-slate-100">{selectedRequest.description}</div>
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="p-4 bg-violet-50 rounded-xl border border-violet-100">
                                <h3 className="text-xs font-black text-violet-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <UserPlus className="h-4 w-4" /> Delegate to Faculty / Staff
                                </h3>
                                <div className="flex gap-2">
                                    <select
                                        className="flex-1 p-2 bg-white border border-violet-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
                                        value={assigningTo}
                                        onChange={(e) => setAssigningTo(e.target.value)}
                                    >
                                        <option value="">-- Choose Reviewer --</option>
                                        {faculty.map(f => (
                                            <option key={f._id} value={f._id}>{f.name} ({f.department})</option>
                                        ))}
                                    </select>
                                    <Button size="sm" onClick={() => handleResolve('IN_PROGRESS')} disabled={!assigningTo || resolving}>
                                        Assign
                                    </Button>
                                </div>
                                <p className="text-[10px] text-violet-500 mt-2 italic">Assigning will mark request as 'In Progress' and notify faculty.</p>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <MessageCircle className="h-4 w-4" /> Internal Notes / Response
                                </h3>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
                                    rows="4"
                                    placeholder="Add resolution details..."
                                    value={resolutionNote}
                                    onChange={(e) => setResolutionNote(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="danger"
                                    className="h-9 px-3 text-xs"
                                    onClick={() => handleResolve('REJECTED')}
                                    disabled={resolving}
                                >
                                    Reject
                                </Button>
                                <Button
                                    className="h-9 px-3 text-xs bg-emerald-600 hover:bg-emerald-700"
                                    onClick={() => handleResolve('RESOLVED')}
                                    disabled={resolving}
                                >
                                    Resolve & Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRequests;
