import React from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Award,
    BookOpen,
    Edit3,
    Camera,
    ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FacultyProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/faculty-dashboard')}
                        className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#00ff9d] hover:bg-[#00ff9d]/10 transition-all border border-slate-100"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Professional Profile</h1>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-1">Manage personal info & credentials</p>
                    </div>
                </div>
                <button className="bg-[#094d37] hover:bg-[#0c6348] text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 shadow-lg transition-all">
                    <Edit3 className="h-5 w-5 text-[#00ff9d]" />
                    EDIT PROFILE
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                    <div className="relative group">
                        <div className="h-40 w-40 rounded-[2.5rem] bg-slate-100 flex items-center justify-center text-slate-400 text-6xl font-black mb-8 border-8 border-slate-50 relative overflow-hidden">
                            {user?.name?.charAt(0) || 'P'}
                        </div>
                        <button className="absolute bottom-6 right-0 h-10 w-10 bg-[#00b894] rounded-xl flex items-center justify-center text-white border-4 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">{user?.name || 'Preveen Sir'}</h2>
                    <p className="text-[#00b894] font-black text-xs uppercase tracking-[0.2em] mt-2 mb-8">Senior Faculty • Mathematics</p>

                    <div className="w-full h-px bg-slate-50 mb-8"></div>

                    <div className="w-full space-y-6">
                        <div className="flex items-center gap-4 text-slate-500">
                            <Mail className="h-5 w-5 text-[#00b894]" />
                            <span className="font-bold text-sm">{user?.email || 'preveen.maths@oasis.edu'}</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-500">
                            <Phone className="h-5 w-5 text-[#00b894]" />
                            <span className="font-bold text-sm">+91 98765-43210</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-500">
                            <MapPin className="h-5 w-5 text-[#00b894]" />
                            <span className="font-bold text-sm">Main Campus, Block-C</span>
                        </div>
                    </div>
                </div>

                {/* Bio & Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <BookOpen className="h-6 w-6 text-[#00b894]" />
                            Professional Summary
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Experienced Mathematics faculty with over 12 years of expertise in coaching JEE aspirants. Specialized in Calculus and Coordinate Geometry. Committed to delivering high-quality education and mentoring students to achieve their academic goals at OASIS Classes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
                            <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                                <Award className="h-5 w-5 text-[#00ff9d]" />
                                Certifications
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="font-black text-sm">Certified JEE Advanced Mentor</p>
                                    <p className="text-white/40 text-[10px] uppercase font-bold mt-1">Issued by Academic Council • 2024</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="font-black text-sm">excellence in Teaching Award</p>
                                    <p className="text-white/40 text-[10px] uppercase font-bold mt-1">National Education Forum • 2023</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                <User className="h-5 w-5 text-[#00b894]" />
                                Academic Background
                            </h3>
                            <div className="space-y-4 text-slate-500">
                                <div className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-[#00b894] mt-2 shrink-0"></div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900">M.Sc in Applied Mathematics</p>
                                        <p className="text-xs font-bold uppercase tracking-widest">IIT Kharagpur • 2012</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="h-2 w-2 rounded-full bg-[#00b894] mt-2 shrink-0"></div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900">B.Sc in Mathematics (Hons)</p>
                                        <p className="text-xs font-bold uppercase tracking-widest">Delhi University • 2010</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyProfile;
