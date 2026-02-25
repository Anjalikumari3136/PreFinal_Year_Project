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
    BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'My Requests', path: '/dashboard/requests' },
        { icon: Users, label: 'Mentorship', path: '/dashboard/mentorship' },
        { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
        { icon: MessageSquare, label: 'Feedback', path: '/dashboard/feedback' },
        { icon: User, label: 'My Profile', path: '/dashboard/profile' },
    ];

    return (
        <aside
            className={cn(
                "fixed md:static inset-y-0 left-0 z-50 w-[230px] bg-[#0d5446] transform transition-transform duration-200 ease-in-out md:transform-none flex flex-col shadow-2xl",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}
        >
            <div className="p-5 mb-2">
                <div className="bg-white rounded-xl p-2.5 flex items-center gap-2 shadow-lg border-2 border-[#1abc9c]">
                    <div className="h-9 w-9 bg-white rounded-full border-2 border-[#1abc9c] flex items-center justify-center shrink-0">
                        <span className="text-[#1abc9c] font-black text-xl">C</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-slate-900 font-black text-sm tracking-tight">CampusConnect</span>
                        <div className="flex items-center gap-1 mt-0.5">
                            <span className="bg-[#1abc9c] text-white text-[7px] font-black px-1 py-0.5 rounded-sm">STUDENT</span>
                            <span className="text-slate-500 font-bold text-[7px]">PORTAL</span>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-3 space-y-0.5">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-[13px] relative",
                                isActive
                                    ? "bg-[#1abc9c] text-white shadow-lg"
                                    : "text-white/80 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-[18px] w-[18px]", isActive ? "text-white" : "text-white/70")} />
                            <span>{item.label}</span>
                            {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-3 pb-5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-[13px] font-black text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white transition-all uppercase tracking-wide"
                >
                    <LogOut className="h-[18px] w-[18px]" />
                    Terminate Session
                </button>
            </div>
        </aside>
    );
};

const DashboardLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#f5f7fa] flex font-sans text-slate-900">
            <StudentSidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 flex flex-col min-w-0 h-screen">
                {/* Header - Premium Style */}
                <header className="h-[72px] flex items-center justify-between px-10 shrink-0 bg-white/50 backdrop-blur-sm border-b border-slate-100">
                    <button
                        className="lg:hidden p-2 text-[#0d5446] hover:bg-slate-50 rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <h2 className="text-2xl font-black text-slate-900">My Dashboard</h2>

             
                    <div className="flex items-center gap-4">
                        <div className="bg-white px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-slate-200 shadow-sm">
                            <div className="w-9 h-9 rounded-full bg-[#1abc9c]/20 text-[#1abc9c] flex items-center justify-center font-black text-base border-2 border-[#1abc9c]/30">
                                {user?.name?.charAt(0) || 'S'}
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black text-slate-900 leading-none">{user?.name || 'Student'}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Academic Scholar</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto px-10 py-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
