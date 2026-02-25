import React from 'react';
import { Menu, Search, Bell, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
            <button
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                onClick={() => setSidebarOpen(true)}
            >
                <Menu className="h-6 w-6" />
            </button>

            <div className="flex-1 max-w-xl mx-4 lg:mx-0 hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search students, faculty, requests..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
                    <Shield className="h-3 w-3" />
                    ADMIN MODE
                </div>
                <button
                    onClick={logout}
                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                    title="Sign Out"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden md:inline text-sm font-medium">Logout</span>
                </button>
                <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-bold text-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
