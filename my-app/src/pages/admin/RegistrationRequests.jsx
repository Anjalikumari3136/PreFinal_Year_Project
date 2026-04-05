import React, { useState, useEffect } from 'react';
import { Check, X, UserCheck, ShieldAlert, Search, Filter, Loader2, Mail, Hash, Building2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import API_BASE_URL from '../../config/api';

const RegistrationRequests = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`${API_BASE_URL}/api/admin/pending-approvals`, config);
            setRequests(data);
        } catch (error) {
            toast.error('Failed to fetch pending requests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (userId, status) => {
        setProcessing(userId);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`${API_BASE_URL}/api/admin/users/${userId}/status`, { status }, config);
            toast.success(`User ${status === 'APPROVED' ? 'Approved' : 'Rejected'} Successfully`);
            fetchRequests();
        } catch (error) {
            toast.error('Update failed');
        } finally {
            setProcessing(null);
        }
    };

    const filteredRequests = requests.filter(req => 
        req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.studentId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <UserCheck className="h-8 w-8 text-indigo-600" />
                        Pending Registrations
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Review and approve new student/faculty accounts</p>
                </div>
                <div className="flex bg-white rounded-2xl border border-slate-200 p-1 shadow-sm w-full md:w-auto">
                    <div className="flex items-center px-4 text-slate-400">
                        <Search className="h-4 w-4" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search by name, email or ID..." 
                        className="bg-transparent border-none outline-none py-2 text-sm w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                        <p className="font-bold tracking-widest text-[10px] uppercase">Scanning Database...</p>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div className="h-[400px] flex flex-col items-center justify-center text-slate-400 gap-4 p-8 text-center">
                        <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center">
                            <Check className="h-10 w-10 text-slate-200" />
                        </div>
                        <div>
                            <p className="font-black text-slate-900 uppercase tracking-tight text-lg">All caught up!</p>
                            <p className="text-sm mt-1 max-w-xs mx-auto">There are no pending registration requests waiting for your approval at this moment.</p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {filteredRequests.map((req) => (
                            <div key={req._id} className="p-6 hover:bg-slate-50 transition-colors group">
                                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                                    <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xl shrink-0 shadow-lg shadow-indigo-100/50">
                                        {req.name.charAt(0)}
                                    </div>
                                    
                                    <div className="flex-1 space-y-2 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                                        <div>
                                            <h3 className="font-black text-slate-900 truncate uppercase tracking-tight">{req.name}</h3>
                                            <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black border uppercase tracking-wider",
                                                req.role === 'STUDENT' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-violet-50 text-violet-600 border-violet-100")}>
                                                {req.role}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-1">
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                <Mail className="h-3 w-3" /> {req.email}
                                            </p>
                                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                                <Hash className="h-3 w-3" /> {req.studentId || 'N/A'}
                                            </p>
                                        </div>

                                        <div className="space-y-1 text-right">
                                            <p className="text-xs text-slate-500 flex items-center gap-2 lg:justify-end">
                                                <Building2 className="h-3 w-3" /> {req.department || 'General'}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold lg:text-right">
                                                Joined: {new Date(req.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0 lg:ml-auto w-full lg:w-auto mt-4 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold text-xs flex-1 lg:flex-none"
                                            disabled={processing === req._id}
                                            onClick={() => handleAction(req._id, 'REJECTED')}
                                        >
                                            <X className="h-4 w-4 mr-1 lg:mr-0" /> <span className="lg:hidden">Reject Request</span>
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs flex-1 lg:flex-none shadow-lg shadow-emerald-200"
                                            disabled={processing === req._id}
                                            onClick={() => handleAction(req._id, 'APPROVED')}
                                        >
                                            <Check className="h-4 w-4 mr-1 lg:mr-0" /> <span className="lg:hidden">Approve Account</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 flex gap-4">
                <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="font-black text-amber-900 text-sm uppercase tracking-tight">Security Protocol Notice</h4>
                    <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        Verify student credentials against campus database before approval. Approving an account grants immediate access to department resources and private communication channels. Rejected accounts will be flagged for secondary review.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationRequests;
