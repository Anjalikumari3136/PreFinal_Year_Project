import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/common/Button';
import { Mail, Lock, User, Hash, Loader2, GraduationCap, Briefcase, Building2, ShieldCheck, ArrowRight, ArrowLeft, Star, Heart } from 'lucide-react';
import { cn } from '../utils/cn';
import API_BASE_URL from '../config/api';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('STUDENT'); // Default role
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        email: '',
        password: '',
        department: '',
        designation: ''
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
            await axios.post(`${API_BASE_URL}/api/auth/register`, {
                ...formData,
                role
            });
            setShowOTP(true);
        } catch (error) {
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
        setIsLoading(false);
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
                email: formData.email,
                otp
            });
            alert(role === 'STUDENT' ? 'Verification successful! You can now login.' : 'Email verified! Please wait for Administrator approval before logging in.');
            navigate('/login');
        } catch (error) {
            alert(error.response && error.response.data.message ? error.response.data.message : error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50/50 relative overflow-hidden font-sans">
            {/* Soft Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[130px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-orange-100/30 blur-[120px]" />
            </div>

            <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-[11px] z-50">
                <ArrowLeft className="h-4 w-4" /> Home
            </Link>

            <div className="max-w-2xl w-full mx-4 relative z-10 flex flex-col md:flex-row bg-white rounded-[3.5rem] shadow-2xl shadow-indigo-200/20 border border-slate-100 overflow-hidden min-h-[650px]">
                
                {/* Left Side: Elegant Institutional Branding */}
                <div className="md:w-[38%] bg-[#171317] p-10 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Abstract Soft Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-600/30 rounded-full blur-[80px]"></div>
                    
                    <div className="relative z-10">
                        <div className="h-14 w-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-orange-600/30">
                            <GraduationCap className="h-7 w-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight leading-[1.1] mb-4">
                            Shape Your <br />
                            <span className="text-orange-500 italic">Academic Future</span>
                        </h2>
                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[200px]">
                            Join the unified ecosystem designed to streamline institutional support and accelerate learning.
                        </p>
                    </div>

                    <div className="relative z-10">
                         <div className="flex flex-col gap-6">
                             <div className="flex items-center gap-4">
                                 <div className="h-1 w-12 bg-orange-600 rounded-full"></div>
                                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Project UniSupport</p>
                             </div>
                             <p className="text-[10px] text-slate-500 font-bold opacity-80 leading-normal">
                                Your data is protected by enterprise-grade security protocols. Registration is the first step toward efficiency.
                             </p>
                         </div>
                    </div>
                </div>

                {/* Right Side: Professional Form */}
                <div className="flex-1 p-8 md:p-12 md:pl-10">
                    <div className="mb-10">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{showOTP ? 'ACCOUNT VERIFICATION' : 'CREATE ACCOUNT'}</h3>
                        <div className="flex items-center gap-2 mt-2">
                             <div className="h-1 w-8 bg-orange-500 rounded-full"></div>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{showOTP ? 'Secure Authorization' : 'Select Your Role Below'}</p>
                        </div>
                    </div>

                    {!showOTP ? (
                        <form onSubmit={handleRegister} className="space-y-7">
                            {/* Role Switcher */}
                            <div className="flex bg-slate-100/80 backdrop-blur-md p-1.5 rounded-2xl">
                                <button
                                    type="button"
                                    onClick={() => setRole('STUDENT')}
                                    className={cn(
                                        "flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all", 
                                        role === 'STUDENT' ? "bg-white text-orange-600 shadow-xl" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('FACULTY')}
                                    className={cn(
                                        "flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all", 
                                        role === 'FACULTY' ? "bg-white text-orange-600 shadow-xl" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    Faculty
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-400/50 outline-none transition-all text-[13px] font-bold text-slate-900 placeholder:text-slate-300"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{role === 'STUDENT' ? 'Student ID' : 'Employee ID'}</label>
                                        <div className="relative group">
                                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                                            <input
                                                name="studentId"
                                                value={formData.studentId}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-400/50 outline-none transition-all text-[13px] font-bold text-slate-900 placeholder:text-slate-300"
                                                placeholder={role === 'STUDENT' ? 'STU-2025' : 'FAC-100'}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                                        <div className="relative group">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                                            <select
                                                name="department"
                                                value={formData.department}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-400/50 outline-none transition-all text-[13px] font-bold text-slate-900 cursor-pointer appearance-none"
                                                required
                                            >
                                                <option value="" disabled>Select Department</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Engineering">Engineering & Technology</option>
                                                <option value="Business Management">Business Management</option>
                                                <option value="EXAMINATION">Examination Department</option>
                                                <option value="REGISTRAR">Registrar / Documentation</option>
                                                <option value="FEES">Fees & Accounts Office</option>
                                                <option value="PLACEMENT">Career & Placements</option>
                                                <option value="LIBRARY">Central Library Services</option>
                                                <option value="HOSTEL">Hostel Management</option>
                                                <option value="SPORTS">Sports & Athletics Bureau</option>
                                                <option value="TRANSPORT">Transport & Logistics</option>
                                                <option value="DEAN_OFFICE">Office of the Dean</option>
                                                <option value="ADMINISTRATIVE">Administrative Office</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-400/50 outline-none transition-all text-[13px] font-bold text-slate-900 placeholder:text-slate-300"
                                            placeholder="example@university.edu"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 group-focus-within:text-orange-500 transition-colors" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-8 focus:ring-orange-500/5 focus:border-orange-400/50 outline-none transition-all text-[13px] font-bold text-slate-900 placeholder:text-slate-300"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-5 rounded-[2rem] text-[12px] font-black bg-[#171317] hover:bg-black shadow-2xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : <>Sign Up Now <ArrowRight className="h-4 w-4" /></>}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify} className="space-y-8 py-4">
                            <div className="text-center p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Enter Verification Code</p>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-transparent text-center text-5xl tracking-[0.5em] font-black text-slate-900 outline-none placeholder:text-slate-100"
                                    placeholder="000000"
                                    maxLength="6"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full py-5 rounded-[2rem] text-[12px] font-black bg-orange-600 hover:bg-orange-700 shadow-xl tracking-widest uppercase" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Authorize Account'}
                            </Button>
                            <button 
                                type="button" 
                                onClick={() => setShowOTP(false)}
                                className="w-full text-slate-400 text-[11px] font-bold hover:text-slate-700 uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" /> Re-enter Information
                            </button>
                        </form>
                    )}

                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-2">
                        <p className="text-[11px] font-bold text-slate-400">Already a member?</p>
                        <Link to="/login" className="text-[11px] font-black text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-widest italic decoration-2 underline-offset-4 hover:underline">
                            Log In Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
