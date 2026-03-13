import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Mail, Lock, Loader2, GraduationCap, ShieldCheck, BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('student'); // Default role
    const [formData, setFormData] = useState({ email: '', password: '' });

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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-6 font-sans">
            <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors font-bold uppercase tracking-widest text-xs">
                <ArrowLeft className="h-4 w-4" /> HOME
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 relative"
            >
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-24 h-24 rounded-full border border-orange-200 p-1 flex items-center justify-center bg-white shadow-lg mb-6">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-inner">
                            <div className="bg-white p-2 rounded-full">
                                <GraduationCap className="h-10 w-10 text-orange-600" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">PORTAL LOGIN</h1>
                </div>

                {/* Role Selection Icons */}
                <div className="flex justify-center gap-6 mb-8">
                    {roles.map((r) => (
                        <div key={r.id} className="flex flex-col items-center gap-3">
                            <button
                                onClick={() => setRole(r.id)}
                                className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition-all duration-300 ${role === r.id
                                    ? 'bg-white border-4 border-orange-500 shadow-xl scale-110'
                                    : 'bg-slate-50 border-2 border-slate-100 hover:border-slate-200 opacity-60'
                                    }`}
                            >
                                <r.icon className={`h-10 w-10 ${role === r.id ? 'text-slate-800' : 'text-slate-400'}`} />
                            </button>
                            <span className={`text-[11px] font-black tracking-widest ${role === r.id ? 'text-orange-500' : 'text-slate-300'}`}>
                                {r.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Dynamic Sign-In Text */}
                <div className="text-center mb-10">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
                        SIGN IN AS <span className="text-orange-500">{currentRoleLabel}</span>
                    </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            className="w-full px-8 py-5 bg-slate-50 border-none rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-slate-100 transition-all font-bold text-slate-700 placeholder:text-slate-300"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 text-xl bg-gradient-to-r from-orange-500 to-black hover:opacity-90 transition-all font-black rounded-[2rem] shadow-xl text-white tracking-widest mt-4 uppercase"
                    >
                        {isLoading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : 'SIGN IN NOW'}
                    </Button>
                </form>

                <div className="mt-12 flex items-center justify-between px-2">
                    <Link to="/register" className="text-xs font-black text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest">
                        NEW {currentRoleLabel}? REGISTER
                    </Link>
                    <button className="text-xs font-black text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest">
                        FORGOT PASSWORD?
                    </button>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Secure login powered by CampusConnect
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
