import React from 'react';
import { Menu, Search, Bell, Shield, LogOut, Terminal, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ setSidebarOpen }) => {
    const { user } = useAuth();

    return (
        <header className="h-[96px] bg-white border-b border-slate-100 flex items-center justify-between px-8 lg:px-12 relative z-30 shadow-sm">
            <div className="flex items-center gap-6">
                <button
                    className="md:hidden p-3 text-slate-500 hover:bg-white rounded-2xl shadow-sm border border-slate-200"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>
                
                <div className="hidden md:block">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Governance Bureau</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 underline decoration-orange-600 decoration-2 underline-offset-4">Strategic Oversight Terminal</p>
                </div>
            </div>

            <div className="flex-1 max-w-xl mx-24 hidden xl:block">
                <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-orange-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Central Database..."
                        className="w-full pl-12 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 focus:bg-white transition-all text-sm font-bold shadow-inner"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 bg-white p-1.5 pr-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer group">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-[#171317] flex items-center justify-center text-white font-black text-base shadow-lg transition-transform group-hover:rotate-6">
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AD'}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{user?.name || 'Director'}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrative Core</p>
                    </div>
                    <div className="ml-4 h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 group-hover:text-orange-600 transition-colors">
                        <Bell className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
