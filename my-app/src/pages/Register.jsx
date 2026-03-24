import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/common/Button';
import { Mail, Lock, User, Hash, Loader2 } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        email: '',
        password: ''
    });

    const [showOTP, setShowOTP] = useState(false);
    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('https://prefinal-year-project.onrender.com/api/auth/register', formData);
            setShowOTP(true);
            alert('OTP sent to your email. Please check and verify.');
        } catch (error) {
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
        setIsLoading(false);
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('https://prefinal-year-project.onrender.com/api/auth/verify-otp', {
                email: formData.email,
                otp
            });
            alert('Verification successful! You can now login.');
            navigate('/login', { state: { role: 'student' } });
        } catch (error) {
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900">{showOTP ? 'Verify Email' : 'Get Started'}</h2>
                    <p className="text-slate-500 mt-2">{showOTP ? 'Enter the 6-digit code sent to your mail' : 'Create your student account'}</p>
                </div>

                {!showOTP ? (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Student ID</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                                    placeholder="STU-2025-001"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                                    placeholder="student@uni.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full mt-4" size="lg" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Create Account'}
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Verification Code</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl tracking-[0.5em] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    placeholder="000000"
                                    maxLength="6"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Verify & Register'}
                        </Button>
                        <button 
                            type="button" 
                            onClick={() => setShowOTP(false)}
                            className="w-full text-slate-500 text-sm hover:text-slate-700 font-medium"
                        >
                            Back to Registration
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm">
                    <span className="text-slate-500">Already have an account? </span>
                    <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
