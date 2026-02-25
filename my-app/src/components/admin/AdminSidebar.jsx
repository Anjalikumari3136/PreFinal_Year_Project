import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { LayoutDashboard, Users, GraduationCap, FileWarning, Settings, LogOut, FileText, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { logout, user } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin-dashboard' },
        { icon: GraduationCap, label: 'Students', path: '/admin-dashboard/students' },
        { icon: Users, label: 'Faculty', path: '/admin-dashboard/faculty' },
        { icon: FileText, label: 'Requests', path: '/admin-dashboard/requests' },
        { icon: Calendar, label: 'Mentorship', path: '/admin-dashboard/mentorship' },
        { icon: FileWarning, label: 'Feedback', path: '/admin-dashboard/feedback' },
    ];

    return (
        <>
            <div
                className={cn(
                    "fixed inset-0 bg-slate-900/50 z-40 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col text-white",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-16 flex items-center px-8 border-b border-slate-800">
                    <span className="text-xl font-black text-white">Campus<span className="text-indigo-500">Admin</span></span>
                </div>

                <div className="p-4">
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Current Role</p>
                        <p className="text-sm font-medium text-white">{user?.adminRole || 'System Admin'}</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/admin-dashboard' && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-indigo-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-500")} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
