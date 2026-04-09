import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
    GraduationCap, 
    BookOpen, 
    ShieldCheck, 
    ArrowRight,
    ArrowLeft
} from 'lucide-react';

const Portals = () => {
    const navigate = useNavigate();

    const portals = [
        { title: "Student Portal", icon: GraduationCap, color: "bg-indigo-600", desc: "Manage enrollments, submit requests, and track your academic journey.", route: "/dashboard" },
        { title: "Faculty Portal", icon: BookOpen, color: "bg-indigo-500", desc: "Streamline class management, grading, and student mentorship.", route: "/faculty-dashboard" },
        { title: "Admin Portal", icon: ShieldCheck, color: "bg-slate-900", desc: "Centralized panel for user governance and institutional oversight.", route: "/admin-dashboard" }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
            <nav className="fixed w-full z-50 top-6 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-8 py-3.5 flex items-center justify-between shadow-2xl">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">CampusConnect</span>
                    </Link>
                    <div className="hidden md:flex gap-10">
                        {['Features', 'Portals', 'About', 'Contact'].map((item) => (
                            <Link key={item} to={`/${item.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors">{item}</Link>
                        ))}
                    </div>
                    <button onClick={() => navigate('/login')} className="bg-white text-slate-950 px-8 py-2 rounded-xl text-sm font-bold shadow-lg">
                        Login
                    </button>
                </div>
            </nav>

            <main className="relative z-10 pt-48 pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">Access Control</span>
                        <h1 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">Institutional <span className="text-indigo-500 italic">Portals.</span></h1>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {portals.map((portal, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -12 }}
                                className="bg-slate-900 p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-center text-center group transition-all hover:bg-slate-800/50"
                            >
                                <div className={`${portal.color} w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform`}>
                                    <portal.icon className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-5 tracking-tight">{portal.title}</h3>
                                <p className="text-slate-400 text-base mb-12 leading-relaxed font-light">{portal.desc}</p>
                                <button
                                    onClick={() => navigate(portal.route)}
                                    className="mt-auto flex items-center gap-3 text-indigo-400 font-bold text-sm uppercase tracking-widest group/btn"
                                >
                                    Access Portal <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-slate-950 text-white pt-20 pb-10 px-6 lg:px-8 border-t border-white/5 text-center">
                 <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight uppercase">CampusConnect</span>
                    </div>
                    <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">© 2026 Institutional Gateway Hub.</p>
                </div>
            </footer>
        </div>
    );
};

export default Portals;
