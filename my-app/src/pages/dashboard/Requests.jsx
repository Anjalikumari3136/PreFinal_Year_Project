import React, { useState, useEffect } from 'react';
import { Plus, Filter, FileText, ChevronRight, X, Loader2, MessageCircle, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
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
            case 'RESOLVED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'IN_PROGRESS': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh] border border-slate-100">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase italic">{request.title}</h3>
                            <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border", getStatusColor(request.status))}>
                                {request.status.replace('_', ' ')}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Token: #{request._id.slice(-8).toUpperCase()} • Submitted {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-10 overflow-y-auto space-y-10 custom-scrollbar">
                    <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-12 transition-transform"><FileText className="h-32 w-32" /></div>
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Original Description</h4>
                        <div className="text-slate-700 font-medium text-base leading-relaxed whitespace-pre-wrap relative z-10 transition-colors">
                            {request.description}
                        </div>
                    </div>

                    {request.resolutionNotes && (
                        <div className="pt-2">
                            <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-orange-100 flex items-center justify-center"><ShieldCheck className="h-4 w-4" /></div>
                                Official Resolution Desk
                            </h4>
                            <div className="bg-[#171317] p-8 rounded-[2.5rem] text-white leading-relaxed border border-white/5 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <span className="relative z-10 font-bold block mb-4 text-orange-500 uppercase text-[9px] tracking-widest underline decoration-white/20">Admin Feedback:</span>
                                <p className="relative z-10 text-slate-300 font-medium italic">"{request.resolutionNotes}"</p>
                            </div>
                        </div>
                    )}

                    {!request.resolutionNotes && request.status !== 'PENDING' && (
                        <div className="text-center p-10 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                            <Clock className="h-10 w-10 text-orange-400 mx-auto mb-4 animate-pulse" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                                Our administration is currently processing your request. Please check back later.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                    <Button onClick={onClose} className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black transition-all">
                        Acknowledge & Sync
                    </Button>
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
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('https://prefinal-year-project.onrender.com/api/requests', config);
            setRequests(data);
        } catch (error) { toast.error('Failed to load requests'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchRequests(); }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'RESOLVED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'IN_PROGRESS': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'REJECTED': return 'bg-red-50 text-red-700 border-red-100';
            default: return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    const filteredRequests = filter === 'All'
        ? requests
        : requests.filter(req => req.status === filter.toUpperCase().replace(' ', '_'));

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <NewRequestModal isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} onCreated={() => { fetchRequests(); }} />
            <RequestDetailsModal isOpen={!!selectedRequest} onClose={() => setSelectedRequest(null)} request={selectedRequest} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-none mb-2">Request Hub</h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest underline decoration-orange-600 decoration-2 underline-offset-4">Academic & Admin Oversight Bureau</p>
                </div>
                <button 
                    onClick={() => setIsNewModalOpen(true)}
                    className="group bg-[#f4511e] text-white px-8 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-orange-600/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-4"
                >
                    <Plus className="h-5 w-5 bg-white/20 rounded-lg p-1 group-hover:rotate-90 transition-transform" />
                    New Request
                </button>
            </div>

            <div className="flex gap-2 bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm w-fit overflow-x-auto">
                {['All', 'Pending', 'In Progress', 'Resolved'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            filter === f ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Request Details</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current State</th>
                                <th className="px-8 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && requests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <Loader2 className="h-10 w-10 animate-spin mx-auto text-[#f4511e]" />
                                        <p className="mt-4 font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]">Fetching records...</p>
                                    </td>
                                </tr>
                            ) : filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center flex flex-col items-center">
                                        <div className="h-16 w-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                                            <AlertCircle className="h-8 w-8" />
                                        </div>
                                        <p className="font-black text-slate-400 uppercase text-xs tracking-widest">No active requests found.</p>
                                        <button onClick={() => setIsNewModalOpen(true)} className="mt-4 text-orange-600 font-black uppercase text-[10px] tracking-widest underline underline-offset-4">Submit naya request</button>
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr
                                        key={req._id}
                                        className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                        onClick={() => setSelectedRequest(req)}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-orange-600 group-hover:border-orange-100 transition-all group-hover:shadow-lg group-hover:scale-105 group-hover:-rotate-3">
                                                    <FileText className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900 text-lg tracking-tight mb-1 group-hover:text-orange-600 transition-colors uppercase italic">{req.title}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">ID: #{req._id.slice(-8).toUpperCase()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="inline-flex px-4 py-1.5 rounded-xl text-[10px] font-black bg-slate-100 text-slate-500 uppercase tracking-widest border border-slate-200">
                                                {req.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-slate-500 text-xs font-bold uppercase tracking-tighter">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn("px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border", getStatusColor(req.status))}>
                                                {req.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-all">
                                            <div className="h-10 w-10 rounded-full bg-slate-900 text-white inline-flex items-center justify-center shadow-lg group-hover:translate-x-0 translate-x-4 transition-transform">
                                                <ChevronRight className="h-5 w-5" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-[#171317] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="absolute top-0 right-0 w-[500px] h-full bg-orange-600 rounded-full blur-[120px] -mr-48 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative z-10 flex gap-10 items-center">
                    <div className="hidden sm:flex flex-col gap-2">
                        <div className="h-1.5 w-12 bg-orange-600 rounded-full"></div>
                        <div className="h-1.5 w-8 bg-slate-600 rounded-full"></div>
                    </div>
                    <div>
                        <h4 className="text-2xl font-black tracking-tight mb-2 uppercase italic leading-none">Security Protocol Active</h4>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest opacity-80">Encryption: AES-256 Enabled • Real-time Monitoring</p>
                    </div>
                </div>
                <div className="relative z-10 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                     <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1 italic">Current System Load</p>
                     <p className="text-3xl font-black tracking-tighter">Optimized</p>
                </div>
            </div>
        </div>
    );
};

export default Requests;
