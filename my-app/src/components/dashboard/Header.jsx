import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 relative z-50">
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
                        placeholder="Search dashboard..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Bell className="h-6 w-6" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 h-4 w-4 bg-red-500 rounded-full border-2 border-white text-[10px] text-white font-bold flex items-center justify-center">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                        <h3 className="font-bold text-slate-900">Notifications</h3>
                                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full uppercase tracking-wider">
                                            {unreadCount} New
                                        </span>
                                    </div>

                                    <div className="max-h-[400px] overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => (
                                                <div
                                                    key={notif._id}
                                                    onClick={() => markAsRead(notif._id)}
                                                    className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group"
                                                >
                                                    <div className="flex gap-4">
                                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${notif.title.toLowerCase().includes('update') ? 'bg-emerald-50 text-emerald-600' :
                                                                notif.title.toLowerCase().includes('alert') ? 'bg-amber-50 text-amber-600' :
                                                                    'bg-indigo-50 text-indigo-600'
                                                            }`}>
                                                            {notif.title.toLowerCase().includes('update') ? <CheckCircle2 className="h-5 w-5" /> :
                                                                notif.title.toLowerCase().includes('alert') ? <AlertCircle className="h-5 w-5" /> :
                                                                    <Clock className="h-5 w-5" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                                                                {notif.title}
                                                            </h4>
                                                            <p className="text-xs text-slate-500 leading-relaxed mb-2">
                                                                {notif.message}
                                                            </p>
                                                            <span className="text-[10px] text-slate-400 font-medium">
                                                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        {notif.recipients?.find(r => r.user === user._id)?.isRead === false && (
                                                            <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-12 text-center">
                                                <Bell className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                                <p className="text-sm text-slate-400 font-medium">All caught up!</p>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        to="/dashboard/notifications"
                                        className="block p-4 text-center text-xs font-bold text-slate-500 hover:text-indigo-600 bg-slate-50/50 transition-colors border-t border-slate-50"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        View All Notifications
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors hidden md:flex items-center gap-2"
                    title="Sign Out"
                >
                    <LogOut className="h-5 w-5" />
                </button>

                <Link to="/dashboard/profile">
                    <div className="h-10 w-10 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-100 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-indigo-700 transition-all hover:scale-105">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
