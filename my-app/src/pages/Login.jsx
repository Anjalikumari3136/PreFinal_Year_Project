import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Mail, Lock, Loader2, GraduationCap, ShieldCheck, BookOpen, ArrowLeft, KeyRound, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import API_BASE_URL from '../config/api';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('student'); // Default role
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [forgotData, setForgotData] = useState({ email: '', otp: '', newPassword: '' });
    const [forgotLoading, setForgotLoading] = useState(false);

    const roles = [
        { id: 'student', label: 'STUDENT', icon: GraduationCap, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'faculty', label: 'TEACHER', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'admin', label: 'ADMIN', icon: ShieldCheck, color: 'text-slate-500', bg: 'bg-slate-50' }
    ];

    const currentRoleLabel = roles.find(r => r.id === role)?.label || 'USER';

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await login(formData.email, formData.password);
        if (res.success) {
            if (res.role === 'ADMIN') navigate('/admin-dashboard');
            else if (res.role === 'FACULTY') navigate('/faculty-dashboard');
            else navigate('/dashboard');
        } else {
            alert(res.error || 'Login failed');
        }
        setIsLoading(false);
    };

    const handleForgotRequest = async (e) => {
        e.preventDefault();
        setForgotLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email: forgotData.email });
            toast.success('Reset OTP sent to your email');
            setForgotStep(2);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        }
        setForgotLoading(false);
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setForgotLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/auth/reset-password`, forgotData);
            toast.success('Password reset successful! Please log in.');
            setShowForgotModal(false);
            setForgotStep(1);
            setForgotData({ email: '', otp: '', newPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Reset failed');
        }
        setForgotLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden font-sans">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-indigo-100/40 blur-3xl" />
                <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-fuchsia-100/40 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),transparent_65%)]" />
            </div>

            <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
                <ArrowLeft className="h-4 w-4" /> HOME
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl p-6 md:p-8 relative"
            >
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full border border-orange-200 p-1 flex items-center justify-center bg-white shadow-lg mb-5">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-inner">
                            <div className="bg-white p-2 rounded-full">
                                <GraduationCap className="h-8 w-8 text-orange-600" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">PORTAL LOGIN</h1>
                </div>

                {/* Role Selection Icons */}
                <div className="flex justify-center gap-4 mb-6">
                    {roles.map((r) => (
                        <div key={r.id} className="flex flex-col items-center gap-2">
                            <button
                                onClick={() => setRole(r.id)}
                                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-300 ${role === r.id
                                    ? 'bg-white border-4 border-orange-500 shadow-xl scale-110'
                                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                                    }`}
                            >
                                <r.icon className={`h-8 w-8 ${role === r.id ? 'text-orange-500' : 'text-slate-400'}`} />
                            </button>
                            <span className={`text-[10px] font-black tracking-widest ${role === r.id ? 'text-orange-600' : 'text-slate-500'}`}>

                                {r.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Dynamic Sign-In Text */}
                <div className="text-center mb-6">
                        <p className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            SIGN IN AS <span className="text-orange-600">{currentRoleLabel}</span>
                        </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="email"
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all font-bold text-slate-900 placeholder:text-slate-400"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="password"
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all font-bold text-slate-900 placeholder:text-slate-400"
                            placeholder="Password"

                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 text-lg bg-gradient-to-r from-orange-500 to-black hover:opacity-90 transition-all font-black rounded-[2rem] shadow-xl text-white tracking-widest mt-3 uppercase"
                    >
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : 'SIGN IN NOW'}
                    </Button>
                </form>

                <div className="mt-10 flex items-center justify-between px-2">
                    <Link to="/register" className="text-[11px] font-black text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest">
                        NEW {currentRoleLabel}? REGISTER
                    </Link>
                    <button 
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-[11px] font-black text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest"
                    >
                        FORGOT PASSWORD?
                    </button>
                </div>

                {/* Forgot Password Modal */}
                <AnimatePresence>
                    {showForgotModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-3xl border border-slate-100 overflow-hidden"
                            >
                                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-xl">
                                            <KeyRound className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 tracking-tight">PASSWORD RECOVERY</h3>
                                    </div>
                                    <button onClick={() => setShowForgotModal(false)} className="p-2 hover:bg-white rounded-full text-slate-400">
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="p-8">
                                    {forgotStep === 1 ? (
                                        <form onSubmit={handleForgotRequest} className="space-y-6">
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Enter your registered email to receive an OTP</p>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                                    <input 
                                                        type="email" 
                                                        required
                                                        placeholder="you@email.com"
                                                        value={forgotData.email}
                                                        onChange={e => setForgotData({...forgotData, email: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none text-sm font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <Button disabled={forgotLoading} className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-black text-white font-black text-xs tracking-widest uppercase">
                                                {forgotLoading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'SEND RESET CODE'}
                                            </Button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleResetSubmit} className="space-y-6">
                                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3 mb-4">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                                                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-wider leading-relaxed">OTP has been sent to your email. Check your inbox.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <input 
                                                    type="text" 
                                                    required
                                                    placeholder="6-Digit OTP Code"
                                                    maxLength={6}
                                                    value={forgotData.otp}
                                                    onChange={e => setForgotData({...forgotData, otp: e.target.value})}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none text-center text-lg font-black tracking-[0.5em]"
                                                />
                                                <input 
                                                    type="password" 
                                                    required
                                                    placeholder="New Secure Password"
                                                    value={forgotData.newPassword}
                                                    onChange={e => setForgotData({...forgotData, newPassword: e.target.value})}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none text-sm font-bold"
                                                />
                                            </div>
                                            <Button disabled={forgotLoading} className="w-full py-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs tracking-widest uppercase">
                                                {forgotLoading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : 'UPDATE PASSWORD'}
                                            </Button>
                                            <button 
                                                type="button" 
                                                onClick={() => setForgotStep(1)}
                                                className="w-full text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                                            >
                                                Back to Email
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Secure login powered by CampusConnect
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
