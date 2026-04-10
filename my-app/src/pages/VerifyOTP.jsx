import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Loader2, ArrowRight, Mail } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    
    // Get email from query params
    const query = new URLSearchParams(location.search);
    const email = query.get('email');

    useEffect(() => {
        if (!email) {
            toast.error('Invalid verification link');
            navigate('/login');
        }
    }, [email, navigate]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length < 6) {
            toast.error('Please enter full 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
                email,
                otp: otpString
            });
            
            toast.success('Identity Verified Successfully!');
            sessionStorage.setItem('userInfo', JSON.stringify(data));
            
            // Reload to update AuthContext state or use a context function
            window.location.reload(); 
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        }
        setIsLoading(false);
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, { email });
            toast.success('New Security OTP Dispatched');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#010714] flex items-center justify-center p-4 font-sans overflow-hidden">
            {/* ... Background Glows ... */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 blur-[130px] rounded-full" />
                <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[130px] rounded-full" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-[500px] bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl z-10"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/20 mb-8">
                        <ShieldCheck className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase italic">Verify Identity</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-10">Verification code sent to {email}</p>

                    <form onSubmit={handleVerify} className="w-full space-y-10">
                        {/* OTP Inputs */}
                        <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    className="w-12 h-16 bg-white/5 border border-white/10 rounded-2xl text-center text-2xl font-black text-white focus:border-indigo-500 outline-none transition-all shadow-inner"
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                />
                            ))}
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Finalize Authentication <ArrowRight className="h-5 w-5" /></>}
                        </button>

                        <div className="flex flex-col gap-4 items-center">
                            <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest italic">Didn't receive code?</p>
                            <button 
                                type="button"
                                onClick={handleResend}
                                disabled={isLoading}
                                className="text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors disabled:opacity-50"
                            >
                                Resend To Institutional Mail
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyOTP;
