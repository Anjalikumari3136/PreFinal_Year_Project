import React, { useState, useEffect } from 'react';
import {
    Users, UserPlus, Shield, MessageSquare, BookOpen,
    Clock, Activity, Loader2, MoreVertical, CheckCircle2,
    AlertCircle, Search, Filter, Edit, Trash2, X, Plus,
    Mail, Briefcase, GraduationCap, ChevronRight, Hash
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { cn } from '../../utils/cn';

const FacultyManagement = () => {
    const { user } = useAuth();
    const [faculty, setFaculty] = useState([]);
    const [workload, setWorkload] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [view, setView] = useState('directory'); // 'directory', 'workload'

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        designation: '',
        facultyRoles: []
    });

    const rolesOptions = ['Course Instructor', 'Mentor', 'Counselor', 'Request Approver'];

    const fetchAll = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const [facRes, workloadRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/faculty', config),
                axios.get('http://localhost:5000/api/admin/faculty/workload', config)
            ]);
            setFaculty(facRes.data);
            setWorkload(workloadRes.data);
        } catch (error) {
            toast.error('Failed to load faculty data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleToggle = (role) => {
        setFormData(prev => {
            const roles = prev.facultyRoles.includes(role)
                ? prev.facultyRoles.filter(r => r !== role)
                : [...prev.facultyRoles, role];
            return { ...prev, facultyRoles: roles };
        });
    };

    const handleAddFaculty = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('http://localhost:5000/api/admin/faculty', formData, config);
            toast.success('Faculty added successfully');
            setIsAddModalOpen(false);
            resetForm();
            fetchAll();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add faculty');
        }
    };

    const handleUpdateFaculty = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`http://localhost:5000/api/admin/faculty/${selectedFaculty._id}`, formData, config);
            toast.success('Faculty updated successfully');
            setIsEditModalOpen(false);
            resetForm();
            fetchAll();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update faculty');
        }
    };

    const handleDeleteFaculty = async (id) => {
        if (!window.confirm('Are you sure you want to remove this faculty member?')) return;
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/admin/faculty/${id}`, config);
            toast.success('Faculty removed');
            fetchAll();
        } catch (error) {
            toast.error('Deletion failed');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            department: '',
            designation: '',
            facultyRoles: []
        });
        setSelectedFaculty(null);
    };

    const openEditModal = (member) => {
        setSelectedFaculty(member);
        setFormData({
            name: member.name,
            email: member.email,
            department: member.department,
            designation: member.designation,
            facultyRoles: member.facultyRoles || []
        });
        setIsEditModalOpen(true);
    };

    const filteredFaculty = faculty.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
            <p className="text-slate-500 font-medium animate-pulse">Syncing faculty records...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-8 rounded-[2.5rem] shadow-2xl border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                                <Shield className="h-6 w-6 text-indigo-400" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Administration Console</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Faculty Resources</h1>
                        <p className="text-slate-400 font-medium max-w-md">Manage academic intelligence, optimize workload distribution, and curate faculty roles.</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-3xl min-w-[120px]">
                            <p className="text-[10px] text-indigo-300 font-black uppercase tracking-widest mb-1">Total Assets</p>
                            <p className="text-3xl font-black text-white">{faculty.length}</p>
                        </div>
                        <Button
                            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white border-none h-auto py-4 px-6 rounded-3xl shadow-lg shadow-indigo-500/20 group"
                        >
                            <UserPlus className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                            <span className="font-bold">Onboard Faculty</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4">
                <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 self-start border border-slate-200">
                    <button
                        onClick={() => setView('directory')}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                            view === 'directory' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        <Users className="h-4 w-4" /> Directory
                    </button>
                    <button
                        onClick={() => setView('workload')}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
                            view === 'workload' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        <Activity className="h-4 w-4" /> Workload Matrix
                    </button>
                </div>

                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-800"
                    />
                </div>
            </div>

            {view === 'directory' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-2 duration-500">
                    {filteredFaculty.map((member, idx) => (
                        <div key={member._id} className="group relative bg-white rounded-[2rem] border border-slate-200 p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                          
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => openEditModal(member)}
                                            className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFaculty(member._id)}
                                            className="p-2 hover:bg-rose-50 rounded-xl text-rose-500 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{member.name}</h3>
                                    <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                                        <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
                                        {member.designation || 'Academic Staff'}
                                    </p>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                                        {member.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                        <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                                        {member.department || 'General Department'}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {member.facultyRoles && member.facultyRoles.length > 0 ? (
                                        member.facultyRoles.map(role => (
                                            <span key={role} className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-indigo-100 flex items-center gap-1">
                                                <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                                                {role}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-[10px] text-slate-400 uppercase font-black italic">No roles assigned</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                        className="group flex flex-col items-center justify-center p-8 rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300"
                    >
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors mb-4">
                            <Plus className="h-6 w-6" />
                        </div>
                        <p className="font-black text-slate-500 group-hover:text-indigo-600">Onboard New Faculty</p>
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm animate-in slide-in-from-bottom-2 duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                                <tr>
                                    <th className="px-8 py-5">Intellectual Asset</th>
                                    <th className="px-8 py-5">Mentorship Bound</th>
                                    <th className="px-8 py-5">Resource Status</th>
                                    <th className="px-8 py-5">Workload Matrix</th>
                                    <th className="px-8 py-5">Intensity</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {workload.map(f => (
                                    <tr key={f._id} className="hover:bg-indigo-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                    {f.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900">{f.name}</p>
                                                    <p className="text-xs font-bold text-slate-400">{f.dept}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-indigo-400" />
                                                <span className="font-black text-slate-700">{f.mentees} <span className="text-[10px] text-slate-400 uppercase ml-1">Students</span></span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest",
                                                f.score > 70
                                                    ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                    : f.score > 40
                                                        ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                        : 'bg-emerald-50 text-emerald-600 border-emerald-100')}>
                                                {f.score > 70 ? 'Saturation' : f.score > 40 ? 'High' : 'Optimal'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full transition-all duration-1000",
                                                        f.score > 70 ? 'bg-rose-500' : f.score > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                                                    )}
                                                    style={{ width: `${Math.min(f.score, 100)}%` }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-black text-slate-600">{f.score}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {(isAddModalOpen || isEditModalOpen) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-300">
                    
                        <div className="bg-slate-900 p-8 text-white relative">
                            <button
                                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
                                    <UserPlus className="h-6 w-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black">{isAddModalOpen ? 'Onboard New Faculty' : 'Update Faculty Record'}</h2>
                                    <p className="text-slate-400 text-sm font-medium">Please provide accurate academic and professional details.</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={isAddModalOpen ? handleAddFaculty : handleUpdateFaculty} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                            placeholder="Prof. John Doe"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                        placeholder="john.doe@university.edu"
                                    />
                                </div>
                                {isAddModalOpen && (
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Default Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required={isAddModalOpen}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                                    <input
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                        placeholder="Computer Science"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Designation</label>
                                    <input
                                        name="designation"
                                        value={formData.designation}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-bold text-slate-800"
                                        placeholder="Senior Professor"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Strategic Roles</label>
                                <div className="flex flex-wrap gap-2">
                                    {rolesOptions.map(role => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleRoleToggle(role)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all",
                                                formData.facultyRoles.includes(role)
                                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                                                    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                                            )}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="button"
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border-none h-auto py-4 rounded-2xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-[2] bg-indigo-600 hover:bg-indigo-500 text-white font-bold border-none h-auto py-4 rounded-2xl shadow-lg shadow-indigo-500/20"
                                >
                                    {isAddModalOpen ? 'Establish Record' : 'Sync Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyManagement;
