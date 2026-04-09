import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail,
    Lock,
    Loader2,
    GraduationCap,
    User,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Shield,
    Hash,
    Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import toast from 'react-hot-toast';

const backgroundImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
];

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [currentBg, setCurrentBg] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        email: '',
        password: '',
        department: '',
        role: 'STUDENT'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
            toast.success('Identity Created! Please Authenticate');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-slate-950">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBg}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.4, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
            </div>

            {/* Top Navigation */}
            <Link to="/login" className="fixed top-10 left-10 z-50 flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:bg-indigo-600 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest pt-0.5 md:block hidden">Return to Login</span>
            </Link>

            {/* Register Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[480px] mx-4 relative z-10"
            >
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Shield className="h-32 w-32 text-white" />
                    </div>

                    {/* Branding */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-500/20 mb-6">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-2 uppercase text-center leading-tight">Create Identity</h1>
                        <p className="text-slate-400 text-sm font-light">Join the institutional network</p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-all font-light" />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 text-xs font-medium"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative group">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-all font-light" />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 text-xs font-medium"
                                    placeholder="ID Number"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-all font-light" />
                            <input
                                type="email"
                                className="w-full pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 text-xs font-medium"
                                placeholder="Institutional Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-all font-light" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 text-xs font-medium"
                                placeholder="Department / Division"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-all font-light" />
                            <input
                                type="password"
                                className="w-full pl-12 pr-6 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 text-xs font-medium"
                                placeholder="Security Key"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 text-xs mt-4 uppercase tracking-widest"
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                <>Verify & Register <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Already Identified?</p>
                        <Link to="/login" className="inline-flex items-center gap-2 text-white font-bold text-xs hover:text-indigo-400 transition-colors group">
                            Return to Secure Login <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
