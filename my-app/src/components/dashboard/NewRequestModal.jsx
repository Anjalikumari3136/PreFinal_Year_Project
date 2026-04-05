import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '../common/Button';
import API_BASE_URL from '../../config/api';

const NewRequestModal = ({ isOpen, onClose, onCreated }) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        category: 'ACADEMIC',
        title: '',
        description: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading('Submitting request...');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(`${API_BASE_URL}/api/requests`, formData, config);

            toast.success('Request submitted successfully!', { id: loadingToast });
            if (onCreated) onCreated(); 
            setFormData({ category: 'ACADEMIC', title: '', description: '' });
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to submit request', { id: loadingToast });
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl animate-in zoom-in-100 duration-200 border border-slate-100 overflow-hidden">
                <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/30">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">New Request</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Submit your query for review</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Request Category</label>
                        <select
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all font-bold text-slate-800 text-sm outline-none cursor-pointer"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="ACADEMIC">Academic / Course Issue</option>
                            <option value="ADMINISTRATIVE">Administrative Office</option>
                            <option value="EXAM">Examination Department</option>
                            <option value="FEES">Fees & Accounts Office</option>
                            <option value="REGISTRAR">Registrar / Documentation</option>
                            <option value="PLACEMENT">Career & Placements</option>
                            <option value="LIBRARY">Central Library Services</option>
                            <option value="HOSTEL">Hostel & Housing Management</option>
                            <option value="IT_SUPPORT">IT & Technical Support</option>
                            <option value="SPORTS">Sports & Athletics Bureau</option>
                            <option value="TRANSPORT">Transport & Logistics</option>
                            <option value="DEAN_OFFICE">Office of the Dean</option>
                            <option value="OTHER">General Support Query</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Subject / Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Need Bonafide Certificate"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all font-bold text-slate-800 text-sm outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Detail Description</label>
                        <textarea
                            placeholder="Please provide details about your request so we can assist you better..."
                            rows="4"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all font-medium text-slate-800 text-sm resize-none outline-none"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onClose} className="px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-600/20 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit Request'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewRequestModal;
