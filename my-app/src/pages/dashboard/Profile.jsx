import React, { useEffect, useState, useRef } from 'react';
import {
    User, Mail, Hash, Phone, MapPin, Calendar, Award,
    BookOpen, ShieldCheck, FileText, UserCheck, Camera,
    Edit2, Save, X, GraduationCap, TrendingUp, Star,
    Settings, Globe, Linkedin, Github, Twitter
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, updateUserData } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        cgpa: '',
        bio: '',
        avatar: ''
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.profileDetails?.contactNumber || user.phone || '',
                cgpa: user.profileDetails?.cgpa || '',
                bio: user.profileDetails?.bio || '',
                avatar: user.profileDetails?.avatar || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.onerror = (err) => {
                console.error('FileReader Error:', err);
                toast.error('Failed to read file');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const updatePayload = {
                name: formData.name,
                profileDetails: {
                    contactNumber: formData.phone,
                    cgpa: formData.cgpa ? parseFloat(formData.cgpa) : 0.0,
                    bio: formData.bio,
                    avatar: formData.avatar
                }
            };

            const { data } = await axios.put(
                'https://prefinal-year-project.onrender.com/api/users/profile',
                updatePayload,
                config
            );

            updateUserData(data);
            setIsEditing(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto pb-12 px-4 md:px-6"
        >
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
                
                <div className="h-40 md:h-56 relative overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(at_0%_0%,_#4f46e5_0px,_transparent_50%),radial-gradient(at_50%_0%,_#7c3aed_0px,_transparent_50%),radial-gradient(at_100%_0%,_#2563eb_0px,_transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="px-6 md:px-10 pb-8 relative">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-20">
                       
                        <div className="relative group">
                            <div className="h-32 w-32 md:h-44 md:w-44 rounded-[2.5rem] bg-white p-2 shadow-2xl ring-1 ring-slate-200">
                                <div className="h-full w-full rounded-[2rem] bg-slate-100 flex items-center justify-center overflow-hidden relative border-2 border-slate-50">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-16 w-16 text-slate-300" />
                                    )}

                                    <AnimatePresence>
                                        {isEditing && (
                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute inset-0 bg-indigo-600/60 backdrop-blur-sm flex items-center justify-center text-white transition-all"
                                            >
                                                <Camera className="h-8 w-8" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <div className="absolute bottom-4 right-2 h-6 w-6 bg-emerald-500 border-4 border-white rounded-full shadow-lg"></div>
                        </div>

                        <div className="flex-1 text-center md:text-left pt-2 pb-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border border-indigo-100">
                                <ShieldCheck className="h-3 w-3" />
                                Active Account
                            </div>

                            {isEditing ? (
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="block w-full text-3xl font-black text-slate-900 bg-slate-50 border-b-2 border-indigo-500 py-1 outline-none mb-2"
                                />
                            ) : (
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-1">
                                    {user?.name}
                                </h1>
                            )}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500">
                                <span className="flex items-center gap-1.5 text-sm font-medium">
                                    <GraduationCap className="h-4 w-4 text-indigo-500" />
                                    {user?.role} • {user?.department}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-slate-300 hidden md:block"></span>
                                <span className="text-sm font-medium">{user?.studentId}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-lg shadow-slate-200 transition-all font-bold text-sm"
                                >
                                    <Edit2 className="h-4 w-4" />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-sm transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg shadow-indigo-200 transition-all font-bold text-sm disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4" />
                                        {loading ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <div className="lg:col-span-4 space-y-8">
                    
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Biography</h3>
                            <Globe className="h-4 w-4 text-slate-400" />
                        </div>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="w-full text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[140px] focus:ring-2 focus:ring-indigo-500 outline-none text-sm leading-relaxed"
                                placeholder="Write something professional about yourself..."
                            />
                        ) : (
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {formData.bio || 'Professional summary not provided. Click edit to introduce yourself.'}
                            </p>
                        )}

                        <div className="mt-8 flex gap-4">
                            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"><Linkedin className="h-5 w-5" /></button>
                            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Github className="h-5 w-5" /></button>
                            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-500 transition-all"><Twitter className="h-5 w-5" /></button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 text-center">Contact Hub</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Email</p>
                                    <p className="text-sm font-bold text-slate-700">{user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-violet-50 group-hover:text-violet-600 transition-all">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Mobile</p>
                                    {isEditing ? (
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="text-sm font-bold text-slate-700 border-b border-indigo-500 bg-transparent outline-none w-full"
                                        />
                                    ) : (
                                        <p className="text-sm font-bold text-slate-700">{formData.phone || 'Not linked'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <TrendingUp className="h-32 w-32" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Academic Standing</span>
                                </div>
                                <h4 className="text-2xl font-bold mb-4">Cumulative GPA</h4>
                                <div className="flex items-baseline gap-2">
                                    {isEditing ? (
                                        <input
                                            name="cgpa"
                                            type="number"
                                            step="0.01"
                                            value={formData.cgpa}
                                            onChange={handleInputChange}
                                            className="text-6xl font-black bg-white/10 rounded-2xl px-4 py-2 w-36 outline-none border border-white/20 focus:bg-white/20"
                                        />
                                    ) : (
                                        <span className="text-7xl font-black">{formData.cgpa || '0.00'}</span>
                                    )}
                                    <span className="text-xl font-bold text-indigo-200">/ 10.0</span>
                                </div>
                                <div className="mt-8 py-2 px-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 inline-flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Top 15% of Branch</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Timeline</h3>
                                    <p className="text-3xl font-black text-slate-900">{user?.semester || '1st'} Semester</p>
                                </div>
                                <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <BookOpen className="h-8 w-8 text-indigo-500" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-slate-400 uppercase">Academic Journey Path</span>
                                    <span className="text-lg font-black text-indigo-600">{((parseInt(user?.semester || 1) / 8) * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(parseInt(user?.semester || 1) / 8) * 100}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full shadow-sm"
                                    ></motion.div>
                                </div>
                                <p className="text-[10px] text-slate-400 text-center font-medium italic">Estimated Graduation: May 2027</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2rem] p-1 shadow-xl overflow-hidden group">
                        <div className="bg-white rounded-[1.8rem] p-8 border border-white/10 shadow-inner">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="h-24 w-24 rounded-3xl bg-indigo-600 rotate-3 transition-transform group-hover:rotate-6 group-hover:scale-105 duration-500 flex items-center justify-center overflow-hidden">
                                        <UserCheck className="h-10 w-10 text-white" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-white shadow-lg rounded-2xl flex items-center justify-center border border-indigo-50">
                                        <Star className="h-5 w-5 text-indigo-500 fill-indigo-500" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Academic Advisor</h3>
                                    {user?.assignedMentor ? (
                                        <>
                                            <h4 className="text-2xl font-black text-slate-900 mb-1">{user.assignedMentor.name}</h4>
                                            <p className="text-sm text-slate-500 font-medium mb-4">Senior Faculty • {user.department}</p>
                                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                                <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                                                    <Mail className="h-3.5 w-3.5" /> Message Mentor
                                                </button>
                                                <button className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
                                                    Book Office Hours
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="text-2xl font-black text-slate-900 mb-1">Mentor Unassigned</h4>
                                            <p className="text-sm text-slate-400 font-medium mb-4 italic">Waiting for department allocation.</p>
                                            <button className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                                Inquire about status <X className="h-3 w-3 rotate-45" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Recent Achievements</h3>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { icon: Award, label: "Dean's List", color: "bg-amber-50 text-amber-600 border-amber-100" },
                                { icon: FileText, label: "Tech Lead", color: "bg-blue-50 text-blue-600 border-blue-100" },
                                { icon: Star, label: "9.0+ Club", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
                                { icon: ShieldCheck, label: "Verified", color: "bg-emerald-50 text-emerald-600 border-emerald-100" }
                            ].map((badge, i) => (
                                <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${badge.color} text-xs font-bold transition-all hover:scale-105 cursor-default`}>
                                    <badge.icon className="h-4 w-4" />
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
