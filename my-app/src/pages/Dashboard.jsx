import React, { useState } from 'react';
import {
    Bell,
    Search,
    Menu,
    X,
    LayoutDashboard,
    FileText,
    Users,
    MessageSquare,
    LogOut,
    ChevronRight,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { cn } from '../utils/cn';

const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
            
            <div
                className={cn(
                    "fixed inset-0 bg-slate-900/50 z-40 transition-opacity lg:hidden",
                    isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setSidebarOpen(false)}
            />
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-16 flex items-center px-8 border-b border-slate-100">
                    <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">UniSupport</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {[
                        { icon: LayoutDashboard, label: 'Overview', active: true },
                        { icon: FileText, label: 'My Requests' },
                        { icon: Users, label: 'Mentorship' },
                        { icon: Bell, label: 'Notifications', badge: 3 },
                        { icon: MessageSquare, label: 'Feedback' },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href="#"
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                item.active
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", item.active ? "text-indigo-600" : "text-slate-400")} />
                            {item.label}
                            {item.badge && (
                                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
              
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
                                placeholder="Search requests, mentors..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                            <Bell className="h-6 w-6" />
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-sm">
                            JD
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                                <p className="text-slate-500">Welcome back, Anjali</p>
                            </div>
                            <Button>+ New Request</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-amber-50 rounded-xl">
                                        <Clock className="h-6 w-6 text-amber-600" />
                                    </div>
                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Ongoing</span>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">Pending Requests</h3>
                                <p className="text-3xl font-bold text-slate-900 mt-1">3</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-emerald-50 rounded-xl">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">Resolved Issues</h3>
                                <p className="text-3xl font-bold text-slate-900 mt-1">12</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-violet-50 rounded-xl">
                                        <Users className="h-6 w-6 text-violet-600" />
                                    </div>
                                </div>
                                <h3 className="text-slate-500 text-sm font-medium">Mentorship Sessions</h3>
                                <p className="text-3xl font-bold text-slate-900 mt-1">4</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-900">Recent Requests</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</a>
                                </div>
                                <div className="p-6 space-y-4">
                                    {[
                                        { title: 'Bonafide Certificate', date: 'Today, 10:23 AM', status: 'In Progress', statusColor: 'bg-indigo-50 text-indigo-700' },
                                        { title: 'Exam Re-evaluation', date: 'Yesterday', status: 'Pending', statusColor: 'bg-amber-50 text-amber-700' },
                                        { title: 'Hostel Fee Issue', date: '28 Dec 2024', status: 'Resolved', statusColor: 'bg-emerald-50 text-emerald-700' },
                                    ].map((req, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-slate-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{req.title}</h4>
                                                    <p className="text-sm text-slate-500">{req.date}</p>
                                                </div>
                                            </div>
                                            <span className={cn("px-3 py-1 rounded-full text-xs font-bold", req.statusColor)}>
                                                {req.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="font-bold text-slate-900">Notifications</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <div className="h-2 w-2 rounded-full bg-red-500 ring-4 ring-red-50"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Mid-Sem Results Out</p>
                                            <p className="text-xs text-slate-500 mt-1">Check your portal for detailed marksheet.</p>
                                            <span className="text-xs text-slate-400 mt-2 block">2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1">
                                            <div className="h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-indigo-50"></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Dr. Smith accepted session</p>
                                            <p className="text-xs text-slate-500 mt-1">Mentorship confirmed for Friday.</p>
                                            <span className="text-xs text-slate-400 mt-2 block">1 day ago</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-2 text-sm text-slate-500 font-medium hover:text-indigo-600 transition-colors">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
