import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import {
    LayoutDashboard,
    FileText,
    Users,
    Bell,
    MessageSquare,
    User,
    LogOut,
    Menu,
    ChevronRight,
    ArrowRight,
    Shield,
    Backpack
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: FileText, label: 'My Requests', path: '/dashboard/requests' },
        { icon: Users, label: 'Mentorship', path: '/dashboard/mentorship' },
        { icon: MessageSquare, label: 'Feedback Desk', path: '/dashboard/feedback' },
        { icon: Bell, label: 'Updates', path: '/dashboard/notifications' },
        { icon: User, label: 'My Profile', path: '/dashboard/profile' },
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
                            <Backpack className="h-6 w-6 text-white" />
                        </div>
                        <div className="relative z-10 leading-none">
                            <p className="text-xl font-black text-white tracking-widest uppercase">Student</p>
                            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1 opacity-80">Universe Portal</p>
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
                        <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-4 relative z-10">Safe Exit</p>
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

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-slate-900">
            <StudentSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

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
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Student Portal</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">UniSupport • Academic Care</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group">
                             <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#171317] flex items-center justify-center text-white font-black text-base shadow-lg transition-transform group-hover:rotate-6">
                                {user?.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                                <p className="text-sm font-black text-slate-900 leading-none mb-1">{user?.name || 'Student Name'}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scholar • {user?.studentId || 'ID-2024'}</p>
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

export default DashboardLayout;
