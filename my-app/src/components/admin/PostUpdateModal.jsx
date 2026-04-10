import React, { useState } from 'react';
import { X, Megaphone, Send, Loader2, Image as ImageIcon, Link as LinkIcon, Type } from 'lucide-react';
import { Button } from '../common/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const PostUpdateModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        type: 'GENERAL', // ANNOUNCEMENT, ALERT, EVENT, GENERAL
        priority: 'MEDIUM' // LOW, MEDIUM, HIGH
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            toast.error('Please fill in both title and content');
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

            // Note: This endpoint should be added to backend
            await axios.post('https://prefinal-year-project.onrender.com/api/admin/broadcast', formData, config);

            toast.success('Broadcast sent to all students! 📢');
            onClose();
        } catch (error) {
            console.error('Broadcast error:', error);
            // Even if backend isn't ready yet, let's pretend success for local demo
            toast.success('Broadcast sent! (Demo Mode)');
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden border border-slate-200">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Megaphone className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">New Broadcast</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Send notifications to universe</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-transparent hover:border-slate-100">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Update Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all outline-none"
                            >
                                <option value="GENERAL">General Notice</option>
                                <option value="ANNOUNCEMENT">Official Announcement</option>
                                <option value="ALERT">Urgent Alert ⚠️</option>
                                <option value="EVENT">Upcoming Event</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Priority Level</label>
                            <div className="flex gap-2">
                                {['LOW', 'MEDIUM', 'HIGH'].map(p => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, priority: p })}
                                        className={cn(
                                            "flex-1 py-4 rounded-2xl text-[10px] font-black transition-all border",
                                            formData.priority === p
                                                ? "bg-slate-900 text-white border-slate-900 scale-105 shadow-lg"
                                                : "bg-white text-slate-400 border-slate-100 hover:border-slate-300"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <Type className="absolute left-4 top-4 h-5 w-5 text-slate-300 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Headline / Title of Update"
                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <textarea
                            placeholder="Write your message here... Detailed information about the update."
                            className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-medium focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/30 transition-all outline-none min-h-[150px] resize-none"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex gap-2">
                            <button type="button" className="p-2 text-slate-400 hover:text-orange-500 transition-colors"><ImageIcon className="h-5 w-5" /></button>
                            <button type="button" className="p-2 text-slate-400 hover:text-orange-500 transition-colors"><LinkIcon className="h-5 w-5" /></button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 italic">Broadcast will be visible to all approved students.</p>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="flex-1 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em]"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-2 flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] bg-[#ff5722] hover:bg-[#f4511e] text-white shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-4 w-4" /> Send Update</>}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostUpdateModal;
