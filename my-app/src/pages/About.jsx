import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    ShieldCheck,
    Globe,
    Users,
    Target,
    ArrowLeft,
    GraduationCap,
    Sparkles,
    Cpu,
    Lock,
    Twitter,
    Linkedin,
    Github,
    Facebook,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const About = () => {
    const navigate = useNavigate();

    const sections = [
        {
            icon: Target,
            title: "Our Mission",
            desc: "To provide campuses with a unified digital ecosystem that reduces administrative overhead and empowers academic focus.",
            bg: "bg-indigo-600/10"
        },
        {
            icon: ShieldCheck,
            title: "Security Core",
            desc: "Every byte of data is protected by enterprise-grade encryption and regional sovereignty protocols.",
            bg: "bg-purple-600/10"
        },
        {
            icon: Users,
            title: "Community Driven",
            desc: "Designed by educators and for educators, ensuring that the platform evolves with real-world institutional needs.",
            bg: "bg-blue-600/10"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-indigo-600/5 blur-[120px] rounded-full" />
            </div>

            <nav className="fixed w-full z-50 top-6 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">CampusConnect</span>
                    </Link>
                    <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold transition-all">
                        <ArrowLeft className="h-4 w-4" /> Home
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 pt-40 pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-32">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="flex-1">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
                                >
                                    <Globe className="h-3 w-3" /> Global Vision 2026
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-none"
                                >
                                    The Future of <br /> <span className="text-indigo-400">Education Tech.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="text-slate-400 text-xl font-light leading-relaxed mb-10"
                                >
                                    CampusConnect was founded on a simple premise: technology should simplify university life, not complicate it. Since 2022, we've been building the digital bridge between students and achievement.
                                </motion.p>
                            </div>
                            <div className="flex-1 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="aspect-square bg-white/5 rounded-[4rem] border border-white/10 relative overflow-hidden group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center p-12">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-indigo-600/20 blur-[60px] animate-pulse" />
                                            <Cpu className="h-40 w-40 text-indigo-400 relative z-10 group-hover:rotate-12 transition-transform duration-700" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                                        <p className="text-white font-bold mb-1">Scale: Unlimited</p>
                                        <p className="text-slate-400 text-xs uppercase tracking-widest font-black">Infrastructure Readiness: 100%</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Stats/Philosophy Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {sections.map((section, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all duration-500"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${section.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    <section.icon className="h-7 w-7 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    {section.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Security Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-32 p-12 rounded-[3rem] border border-white/5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 relative overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <Lock className="h-6 w-6 text-indigo-400" />
                                    <span className="text-white font-bold tracking-widest uppercase text-xs">Security Sovereignty</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Institutional Grade <br /> Protection.</h2>
                                <p className="text-slate-400 text-lg font-light leading-relaxed max-w-lg">Our multi-tenant architecture ensures that every institution's data is isolated, encrypted, and governed by strict privacy laws.</p>
                            </div>
                            <div className="flex-shrink-0 grid grid-cols-2 gap-4">
                                {[
                                    { text: "AES-256", sub: "Encryption" },
                                    { text: "SOC2", sub: "Compliance" },
                                    { text: "2FA", sub: "Mandatory" },
                                    { text: "Cloud", sub: "Storage" }
                                ].map((badge, i) => (
                                    <div key={i} className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                                        <p className="text-white font-bold">{badge.text}</p>
                                        <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest">{badge.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <footer className="bg-slate-950 text-white pt-24 pb-12 px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                        {/* Column 1: Identity */}
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-600 p-2 rounded-xl">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <span className="text-2xl font-bold tracking-tighter text-white">CampusConnect</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                Advanced institutional infrastructure designed to unify students, faculty, and administration through seamless digital operations.
                            </p>
                            <div className="flex gap-4">
                                {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all group">
                                        <Icon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Platform Column */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Platform</h4>
                            <ul className="space-y-4">
                                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Student Portal</Link></li>
                                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Faculty Dashboard</Link></li>
                                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Admin Command Center</Link></li>
                                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Request Management</Link></li>
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h4>
                            <ul className="space-y-4">
                                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Documentation</Link></li>
                                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Help Center</Link></li>
                                <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Community Forum</Link></li>
                                <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">API Reference</Link></li>
                            </ul>
                        </div>

                        {/* Get In Touch Column */}
                        <div>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Get In Touch</h4>
                            <ul className="space-y-6">
                                <li className="flex items-center gap-3 group">
                                    <Mail className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-slate-400 text-sm font-light">support@campus.edu</span>
                                </li>
                                <li className="flex items-center gap-3 group">
                                    <Phone className="h-4 w-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-slate-400 text-sm font-light">+91 98765-43210</span>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <MapPin className="h-4 w-4 text-indigo-400 mt-1 shadow-indigo-500/20" />
                                    <span className="text-slate-400 text-sm font-light leading-relaxed">University Campus Road,<br />Institutional Area, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">© 2026 CampusConnect Platform. Optimized for Modern Learning.</p>
                        <div className="flex gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/about" className="hover:text-white transition-colors">Terms Of Service</Link>
                            <Link to="/about" className="hover:text-white transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
