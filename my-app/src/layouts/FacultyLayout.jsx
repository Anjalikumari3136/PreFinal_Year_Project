import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import {
    LayoutDashboard,
    CalendarCheck,
    LineChart,
    BookOpen,
    UserCheck,
    Bell,
    User,
    LogOut,
    Menu,
    ChevronRight,
    ArrowRight,
    Users,
    MessageSquare,
    GraduationCap,
    Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FacultySidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/faculty-dashboard' },
        { icon: Users, label: 'Mentee List', path: '/faculty-dashboard/mentorship' },
        { icon: MessageSquare, label: 'Grievance Desk', path: '/faculty-dashboard/grievances' },
        { icon: Bell, label: 'Notices', path: '/faculty-dashboard/notice' },
        { icon: User, label: 'My Profile', path: '/faculty-dashboard/profile' },
    ];

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 z-40 transition-opacity md:hidden backdrop-blur-sm",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={cn(
                    "fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#171317] flex flex-col text-white shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out font-sans",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent"></div>
                        <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20 relative z-10">
                            <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <div className="relative z-10 leading-none">
                            <p className="text-xl font-black text-white tracking-widest uppercase">Faculty</p>
                            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1 opacity-80">Mentor Console</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-5 py-8 space-y-3 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={cn(
                                    "flex items-center justify-between px-5 py-4 rounded-[1.5rem] text-sm font-bold transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-[#f4511e] text-white ring-2 ring-white/10 shadow-xl shadow-orange-900/40"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-orange-600 group-hover:text-white")} />
                                    {item.label}
                                </div>
                                {isActive && <ArrowRight className="h-4 w-4 text-white relative z-10" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-6 pb-10 mt-auto">
                    <div className="bg-[#2d1b18] rounded-[2rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-4 relative z-10">End Session</p>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm font-black text-white bg-[#ef5350] hover:bg-[#d32f2f] transition-all shadow-lg active:scale-95 relative z-10"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

const FacultyLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-slate-900">
            <FacultySidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-[96px] flex items-center justify-between px-8 lg:px-12 bg-white/50 backdrop-blur-md border-b border-slate-100 relative z-30">
                    <div className="flex items-center gap-6">
                        <button
                            className="md:hidden p-3 text-slate-500 hover:bg-white rounded-2xl shadow-sm border border-slate-200"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">Academic Bureau</h2>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 opacity-80">Faculty Management Terminal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 bg-white p-1.5 pr-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer group">
                            <div className="h-10 w-10 rounded-xl bg-[#171317] flex items-center justify-center text-white font-bold text-sm shadow-lg transition-transform group-hover:rotate-3">
                                {user?.name?.charAt(0) || 'F'}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user?.name || 'Professor'}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Faculty Member</p>
                            </div>
                            <div className="ml-4 h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-orange-600 transition-colors">
                                <Bell className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-8 lg:px-12 py-10 custom-scrollbar bg-[#f8f9fa]">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FacultyLayout;
