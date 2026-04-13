import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
    User,
    Lock,
    Mail,
    Loader2,
    ArrowLeft,
    GraduationCap,
    BookOpen,
    ShieldCheck,
    ArrowRight,
    Hash,
    Building2,
    Sparkles,
    Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import toast from 'react-hot-toast';

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('STUDENT');

    const academicDepartments = [
        "Computer Science",
        "Information Technology",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering",
        "Business Administration",
        "Arts & Science"
    ];

    const facultyUnits = [
        "Select Office / Unit",
        "Examination Department",
        "Registrar / Documentation",
        "Fees & Accounts Office",
        "Career & Placements",
        "Central Library Services",
        "Hostel Management",
        "Sports & Athletics Bureau",
        "Transport & Logistics",
        "Office of the Dean",
        "Administrative Office"
    ];

    const currentDepts = (role === 'FACULTY' || role === 'ADMIN') ? facultyUnits : academicDepartments;

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
        if (location.pathname === '/register') setRole('STUDENT');
    }, [location.pathname]);

    const toggleMode = () => {
        const newPath = isLogin ? '/register' : '/login';
        navigate(newPath);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        // Domain restriction
        const isAllowedAdmin = email.toLowerCase() === 'admin@universiy.edu' || email.toLowerCase() === 'admin@university.edu' || email.toLowerCase() === 'admin@krmu.edu.in';
        if (!email.toLowerCase().endsWith('@krmu.edu.in') && !isAllowedAdmin) {
            toast.error('Access denied. Only @krmu.edu.in institutional accounts are permitted.');
            return;
        }

        setIsLoading(true);
        const res = await login(email, password);
        if (res.success) {
            toast.success(`Welcome back, ${res.role}`);
            if (res.role === 'ADMIN') navigate('/admin-dashboard');
            else if (res.role === 'FACULTY') navigate('/faculty-dashboard');
            else navigate('/dashboard');
        } else {
            if (res.requiresVerification) {
                toast.error('Identity Not Verified');
                navigate(`/verify-otp?email=${res.email}`);
            } else {
                toast.error(res.message || 'Authentication failed');
            }
        }
        setIsLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();

        // Domain restriction
        const isAllowedAdmin = email.toLowerCase() === 'admin@universiy.edu' || email.toLowerCase() === 'admin@university.edu' || email.toLowerCase() === 'admin@krmu.edu.in';
        if (!email.toLowerCase().endsWith('@krmu.edu.in') && !isAllowedAdmin) {
            toast.error('Registration requires a valid @krmu.edu.in institutional email.');
            return;
        }

        setIsLoading(true);
        const data = {
            name: e.target.name.value,
            studentId: e.target.idField.value,
            email: email,
            password: e.target.password.value,
            department: e.target.department.value,
            role: role
        };
        try {
            await axios.post(`${API_BASE_URL}/api/auth/register`, data);
            toast.success('Security OTP Dispatched! Verify Identity');
            navigate(`/verify-otp?email=${email}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
        setIsLoading(false);
    };

    const loginRoles = [
        { id: 'STUDENT', label: 'Student', icon: GraduationCap },
        { id: 'FACULTY', label: 'Faculty', icon: BookOpen },
        { id: 'ADMIN', label: 'Admin', icon: ShieldCheck }
    ];

    const registerRoles = [
        { id: 'STUDENT', label: 'Student', icon: GraduationCap },
        { id: 'FACULTY', label: 'Faculty', icon: BookOpen }
    ];

    return (
        <div className="min-h-screen bg-[#010714] flex items-center justify-center p-4 font-sans overflow-hidden">
            {/* Ultra-Vibrant Background Glows */}
            <div className="fixed inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[130px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[130px] rounded-full"
                />
            </div>

            <Link to="/" className="fixed top-10 left-10 z-50 flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all group text-[11px] font-black uppercase tracking-[0.2em] italic">
                <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400 transition-all">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </div>
                Return Home
            </Link>

            <div className={`relative w-full shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex border border-white/10 transition-all duration-700 bg-slate-900/40 backdrop-blur-3xl ${isLogin ? 'max-w-[880px] h-[600px] rounded-[2.5rem]' : 'max-w-[980px] h-[720px] rounded-[3.5rem]'}`}>

                {/* Diagonal Sliding Panel - Glass Gradient */}
                <motion.div
                    initial={false}
                    animate={{ x: isLogin ? '100%' : '0%' }}
                    transition={{ type: "spring", stiffness: 70, damping: 20 }}
                    className="absolute top-0 left-0 w-1/2 h-full z-20 hidden md:block overflow-hidden"
                >
                    <div className="h-full w-full bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-800 relative">
                        {/* High-End Glass Ripple */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                            <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] border-[2px] border-white/20 rounded-full animate-ping duration-[10s]" />
                        </div>

                        <div
                            className="absolute inset-0 z-10"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                clipPath: 'polygon(0 0, 100% 0, 88% 100%, 0% 100%)'
                            }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-14 text-white z-20">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isLogin}
                                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.85, y: -10 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 mb-8 shadow-2xl">
                                        <Sparkles className="h-8 w-8 text-cyan-300" />
                                    </div>
                                    <h2 className="text-5xl font-black tracking-tight mb-4 drop-shadow-2xl">
                                        {isLogin ? "Welcome Back" : "Join The Elite"}
                                    </h2>
                                    <div className="h-1.5 w-16 bg-gradient-to-r from-cyan-300 to-white rounded-full mb-8 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                    <p className="text-white/80 text-sm font-semibold max-w-[260px] mb-12 leading-relaxed tracking-wide">
                                        {isLogin ? "Institutional Access Node V4.0. Secure authentication protocol active." : "Create your unique identity node within the campus network."}
                                    </p>
                                    <button
                                        onClick={toggleMode}
                                        className="px-12 py-4 bg-white/10 hover:bg-white text-white hover:text-blue-700 border-2 border-white/30 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-2xl backdrop-blur-md uppercase tracking-widest"
                                    >
                                        {isLogin ? "Create Account" : "Access Portal"}
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Login UI - Premium Dark */}
                <div className={`w-full md:w-1/2 h-full p-16 flex flex-col justify-center transition-all duration-700 ${isLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="max-w-[340px] mx-auto w-full">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase italic">Login</h3>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] italic">Operational Role Required</p>
                        </div>

                        <div className="flex bg-slate-950/40 p-1.5 rounded-[2rem] border border-white/5 mb-12 shadow-inner">
                            {loginRoles.map((r) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setRole(r.id)}
                                    className={`flex-1 flex flex-col items-center justify-center py-4 rounded-[1.5rem] transition-all duration-500 ${role === r.id
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_10px_30px_rgba(6,182,212,0.3)] scale-105 z-10'
                                        : 'text-slate-600 hover:text-slate-400'
                                        }`}
                                >
                                    <r.icon className={`h-5 w-5 mb-1.5 transition-transform duration-500 ${role === r.id ? 'scale-110' : ''}`} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{r.label}</span>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleLogin} className="space-y-10">
                            <div className="relative border-b-2 border-white/5 py-2.5 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-5 text-slate-600 text-[9px] font-black uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Credential Email</span>
                                <input name="email" type="email" required className="w-full bg-transparent text-white font-bold text-sm outline-none placeholder:text-slate-800" placeholder="your@campus.edu" />
                                <Mail className="absolute right-0 top-2.5 h-5 w-5 text-slate-700 group-focus-within:text-cyan-400 transition-colors" />
                            </div>

                            <div className="relative border-b-2 border-white/5 py-2.5 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-5 text-slate-600 text-[9px] font-black uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Access Password</span>
                                <input name="password" type="password" required className="w-full bg-transparent text-white font-bold text-sm outline-none placeholder:text-slate-800" placeholder="••••••••" />
                                <Lock className="absolute right-0 top-2.5 h-5 w-5 text-slate-700 group-focus-within:text-cyan-400 transition-colors" />
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(6,182,212,0.25)] hover:bg-white hover:text-cyan-900 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
                            >
                                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Access System <ArrowRight className="h-5 w-5" /></>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Register UI - High-Tech Grid */}
                <div className={`w-full md:w-1/2 h-full px-12 py-10 flex flex-col justify-center transition-all duration-700 ${!isLogin ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="max-w-[400px] mx-auto w-full">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-black text-white tracking-tighter mb-3 uppercase italic">Register</h3>
                            <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase italic">Initialize Security Identity</p>
                        </div>

                        <div className="flex bg-slate-950/40 p-1.5 rounded-[1.5rem] border border-white/5 mb-10 shadow-inner">
                            {registerRoles.map((r) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setRole(r.id)}
                                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl transition-all duration-500 ${role === r.id
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105 z-10'
                                        : 'text-slate-600 hover:text-white'
                                        }`}
                                >
                                    <r.icon className="h-5 w-5" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{r.label}</span>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleRegister} className="grid grid-cols-2 gap-x-8 gap-y-10">
                            <div className="col-span-2 relative border-b-2 border-white/5 py-2 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-4 text-slate-600 text-[9px] font-black uppercase">Full Identity Name</span>
                                <input name="name" required className="w-full bg-transparent text-white font-bold text-sm outline-none placeholder:text-slate-800 text-xs" placeholder="John Doe" />
                                <User className="absolute right-0 top-2 h-4 w-4 text-slate-700 group-focus-within:text-cyan-400" />
                            </div>

                            <div className="relative border-b-2 border-white/5 py-2 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-4 text-slate-600 text-[9px] font-black uppercase text-ellipsis overflow-hidden whitespace-nowrap">{role === 'STUDENT' ? 'Student ID' : 'Employee ID'}</span>
                                <input name="idField" required className="w-full bg-transparent text-white font-bold text-sm outline-none placeholder:text-slate-800 text-xs" placeholder={role === 'STUDENT' ? 'STU-2025' : 'FAC-100'} />
                                <Hash className="absolute right-0 top-2 h-4 w-4 text-slate-700 group-focus-within:text-cyan-400" />
                            </div>

                            <div className="relative border-b-2 border-white/5 py-2 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-4 text-slate-600 text-[9px] font-black uppercase">Access Unit</span>
                                <select name="department" className="w-full bg-transparent text-white font-bold text-xs outline-none appearance-none cursor-pointer">
                                    {currentDepts.map(d => <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>)}
                                </select>
                                <Building2 className="absolute right-0 top-2 h-4 w-4 text-slate-700 group-focus-within:text-cyan-400" />
                            </div>

                            <div className="col-span-2 relative border-b-2 border-white/5 py-2 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-4 text-slate-600 text-[9px] font-black uppercase">Official Network Email</span>
                                <input name="email" type="email" required className="w-full bg-transparent text-white font-bold text-sm outline-none placeholder:text-slate-800 text-xs" placeholder="your@campus.edu" />
                                <Mail className="absolute right-0 top-2 h-4 w-4 text-slate-700 group-focus-within:text-cyan-400" />
                            </div>

                            <div className="col-span-2 relative border-b-2 border-white/5 py-2 focus-within:border-cyan-400 transition-all group">
                                <span className="absolute left-0 -top-4 text-slate-600 text-[9px] font-black uppercase">Root Access Key</span>
                                <input name="password" type="password" required className="w-full bg-transparent text-white font-bold text-sm outline-none placeholder:text-slate-800 text-xs" placeholder="••••••••" />
                                <Lock className="absolute right-0 top-2 h-4 w-4 text-slate-700 group-focus-within:text-cyan-400" />
                            </div>

                            <button
                                disabled={isLoading}
                                className="col-span-2 py-4.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-3xl text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 mt-6"
                            >
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Activate Profile <ArrowRight className="h-4 w-4" /></>}
                            </button>
                        </form>
                    </div>
                </div>

            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-5 text-slate-700 text-[9px] font-black tracking-[0.4em] uppercase opacity-40">
                <Shield className="h-4 w-4" />
                Secured Node Environment V5.2
            </div>
        </div>
    );
};

export default Auth;
