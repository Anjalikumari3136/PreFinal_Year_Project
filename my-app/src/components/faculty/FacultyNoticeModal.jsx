import React, { useState } from 'react';
import { X, Megaphone, Send, Loader2, Type, Users } from 'lucide-react';
import { Button } from '../common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import API_BASE_URL from '../../config/api';

const FacultyNoticeModal = ({ isOpen, onClose, onRefresh }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        targetGroup: 'MENTEES' // MENTEES, ALL
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.message) {
            toast.error('Please fill in both title and message');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };
            
            await axios.post(`${API_BASE_URL}/api/faculty/send-notice`, formData, config);
            
            toast.success(`Notice sent to ${formData.targetGroup.toLowerCase()} and their emails! 📧`);
            onRefresh && onRefresh();
            onClose();
        } catch (error) {
            console.error('Notice error:', error);
            toast.error(error.response?.data?.message || 'Failed to send notice');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden border border-slate-200">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-600/20">
                            <Megaphone className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">Send Notice</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Broadcast to students & email</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Target Audience</label>
                        <div className="flex gap-4">
                            {[
                                { id: 'MENTEES', label: 'My Mentees Only', icon: Users },
                                { id: 'ALL', label: 'All Approved Students', icon: Megaphone }
                            ].map(group => (
                                <button
                                    key={group.id}
                                    type="button"
                                    onClick={() => setFormData({...formData, targetGroup: group.id})}
                                    className={cn(
                                        "flex-1 p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                                        formData.targetGroup === group.id
                                            ? "bg-[#171317] border-[#171317] text-white shadow-xl scale-[1.02]"
                                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                                    )}
                                >
                                    <group.icon className={cn("h-5 w-5", formData.targetGroup === group.id ? "text-orange-500" : "text-slate-300")} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">{group.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <Type className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Notice Headline"
                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                        </div>

                        <textarea
                            placeholder="Detailed message... This will be sent to the students' dashboard and email inbox."
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all outline-none min-h-[180px] resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            required
                        ></textarea>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em]"
                        >
                            Dismiss
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-4 w-4" /> Finalize & Broadcast</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FacultyNoticeModal;
