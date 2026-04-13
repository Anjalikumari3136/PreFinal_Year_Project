import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { 
    LayoutDashboard, 
    Users, 
    GraduationCap, 
    LogOut, 
    MessageSquare,
    Shield,
    ArrowRight,
    UserCheck,
    Briefcase,
    Activity,
    ClipboardCheck,
    Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Admin Dashboard', path: '/admin-dashboard' },
        { icon: GraduationCap, label: 'Student Directory', path: '/admin-dashboard/students' },
        { icon: Briefcase, label: 'Faculty Directory', path: '/admin-dashboard/faculty' },
        { icon: MessageSquare, label: 'Student Requests', path: '/admin-dashboard/requests' },
        { icon: Bell, label: 'Notice Center', path: '/admin-dashboard/notices' },
        { icon: UserCheck, label: 'Access Control', path: '/admin-dashboard/approvals' },
    ];

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-black/60 z-40 transition-opacity lg:hidden backdrop-blur-sm",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={cn(
                    "fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#171317] flex flex-col text-white shadow-2xl overflow-hidden transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent"></div>
                        <div className="h-12 w-12 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20 relative z-10">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <div className="relative z-10 leading-none">
                            <p className="text-xl font-bold text-white tracking-widest uppercase">Admin</p>
                            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1 opacity-80">Support Portal</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-5 py-8 space-y-3 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/admin-dashboard' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center justify-between px-5 py-4 rounded-[1.5rem] text-sm font-bold transition-all group relative overflow-hidden",
                                    isActive
                                        ? "bg-orange-600 text-white shadow-xl shadow-orange-950/40"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-4 relative z-10">
                                    <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-orange-600 group-hover:text-white")} />
                                    {item.label}
                                </div>
                                {isActive && <ArrowRight className="h-4 w-4 text-white relative z-10" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="px-6 pb-12 mt-auto">
                    <div className="bg-[#2d1b18] rounded-[2rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-4 relative z-10 italic">Terminal Logout</p>
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

export default AdminSidebar;
