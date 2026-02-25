import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Mail, Lock, User, Key, ArrowRight, Loader2, GraduationCap, ShieldCheck, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const activeRole = location.state?.role || 'user'; // 'student', 'admin', 'faculty', or generic

    const getPortalConfig = (role) => {
        switch (role) {
            case 'admin': return {
                title: "Admin Portal",
                color: "indigo",
                icon: ShieldCheck,
                bgGradient: "from-indigo-600 to-blue-700"
            };
            case 'faculty': return {
                title: "Faculty Portal",
                color: "violet",
                icon: BookOpen,
                bgGradient: "from-violet-600 to-fuchsia-700"
            };
            case 'student': return {
                title: "Student Portal",
                color: "emerald",
                icon: GraduationCap,
                bgGradient: "from-emerald-500 to-teal-600"
            };
            default: return {
                title: "Welcome Back",
                color: "indigo",
                icon: User,
                bgGradient: "from-slate-700 to-slate-900"
            };
        }
    };

    const config = getPortalConfig(activeRole);
    const ConfigIcon = config.icon;

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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center animate-in slide-in-from-left duration-500">
                    <div className="mb-8">
                        <div className={`w-12 h-12 rounded-xl bg-${config.color}-50 flex items-center justify-center mb-4`}>
                            <ConfigIcon className={`h-6 w-6 text-${config.color}-600`} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-2">{config.title} Login</h2>
                        <p className="text-slate-500">Please enter your credentials.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                                    placeholder="user@university.edu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className={`w-full py-4 text-lg bg-${config.color}-600 hover:bg-${config.color}-700`}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Sign In'}
                        </Button>
                    </form>
                    {(activeRole === 'student' || activeRole === 'user') && (
                        <div className="mt-8 text-center text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            New Student? {' '}
                            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
                                Register Account Here
                            </Link>
                        </div>
                    )}

                    <div className="mt-4 text-center">
                        <Link to="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
                <div className={`hidden md:flex flex-col justify-center items-center bg-gradient-to-br ${config.bgGradient} p-12 text-white relative overflow-hidden`}>
                    <div className="relative z-10 text-center">
                        <div className="w-24 h-24 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-xl">
                            <ConfigIcon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Secure Access</h3>
                        <p className="text-indigo-100 max-w-xs mx-auto leading-relaxed">
                            {activeRole === 'admin' ? 'Restricted area for system administrators.' :
                                activeRole === 'faculty' ? 'Manage your courses and students efficiently.' :
                                    'Your academic journey starts here.'}
                        </p>
                    </div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
