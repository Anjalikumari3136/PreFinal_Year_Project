import React, { useState, useEffect } from 'react';
import { Plus, Filter, FileText, ChevronRight, X, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { cn } from '../../utils/cn';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import NewRequestModal from '../../components/dashboard/NewRequestModal';

const RequestDetailsModal = ({ isOpen, onClose, request }) => {
    if (!isOpen || !request) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'RESOLVED': return 'bg-emerald-50 text-emerald-700';
            case 'IN_PROGRESS': return 'bg-indigo-50 text-indigo-700';
            case 'REJECTED': return 'bg-red-50 text-red-700';
            default: return 'bg-amber-50 text-amber-700';
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{request.title}</h3>
                            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-bold", getStatusColor(request.status))}>
                                {request.status}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500">
                            ID: #{request._id.slice(-6).toUpperCase()} • {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Description</h4>
                        <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                            {request.description}
                        </div>
                    </div>

                    {request.resolutionNotes && (
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                Admin Response
                            </h4>
                            <div className="bg-indigo-50 p-4 rounded-xl text-indigo-900 leading-relaxed border border-indigo-100">
                                {request.resolutionNotes}
                            </div>
                        </div>
                    )}

                    {!request.resolutionNotes && request.status !== 'PENDING' && (
                        <div className="text-center p-4 text-slate-400 text-sm italic">
                            Handling your request... No remarks yet.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

const Requests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('All');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('http://localhost:5000/api/requests', config);
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests', error);
            toast.error('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'RESOLVED': return 'bg-emerald-50 text-emerald-700';
            case 'IN_PROGRESS': return 'bg-indigo-50 text-indigo-700';
            case 'REJECTED': return 'bg-red-50 text-red-700';
            default: return 'bg-amber-50 text-amber-700';
        }
    };

    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(req => req.status === filter.toUpperCase().replace(' ', '_'));

    return (
        <>
            <NewRequestModal
                isOpen={isNewModalOpen}
                onClose={() => setIsNewModalOpen(false)}
                onCreated={() => { fetchRequests(); }}
            />

            <RequestDetailsModal
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                request={selectedRequest}
            />

            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Requests</h1>
                        <p className="text-slate-500">Manage your administrative and academic requests.</p>
                    </div>
                    <Button className="flex items-center gap-2" onClick={() => setIsNewModalOpen(true)}>
                        <Plus className="h-4 w-4" /> New Request
                    </Button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {['All', 'Pending', 'In Progress', 'Resolved'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 border rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                filter === f
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Request Details</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading && requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-indigo-600" />
                                            Loading requests...
                                        </td>
                                    </tr>
                                ) : filteredRequests.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            No requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRequests.map((req) => (
                                        <tr
                                            key={req._id}
                                            className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                            onClick={() => setSelectedRequest(req)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{req.title}</p>
                                                        <p className="text-xs text-slate-500">ID: #{req._id.slice(-6).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                                    {req.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("px-3 py-1 rounded-full text-xs font-bold", getStatusColor(req.status))}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Requests;
