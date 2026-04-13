import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
    Zap,
    Award,
    TrendingUp,
    Calendar,
    FileText,
    Target,
    MessageSquare,
    Shield,
    Smartphone,
    ArrowLeft,
    Sparkles,
    GraduationCap,
    Twitter,
    Linkedin,
    Github,
    Facebook,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const Features = () => {
    const navigate = useNavigate();

    const keyFeatures = [
        {
            icon: Calendar,
            title: "Smart Scheduling",
            description: "Institutional timetables that adapt in real-time to faculty availability and campus events.",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: FileText,
            title: "Digital Requests",
            description: "Paperless request tracking for certificates, leaves, and academic transcripts.",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: Target,
            title: "Metric Analytics",
            description: "Deep insights into academic performance and resource utilization across the campus.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: MessageSquare,
            title: "Instant Channels",
            description: "Secure, unified communication bridge for students, faculty, and administrative staff.",
            color: "from-indigo-600 to-purple-600"
        },
        {
            icon: Shield,
            title: "Data Sovereignty",
            description: "Military-grade encryption ensuring your institutional data remains under your control.",
            color: "from-slate-700 to-slate-900"
        },
        {
            icon: Smartphone,
            title: "Mobile Gateway",
            description: "Fully responsive institutional access from any device, anywhere in the world.",
            color: "from-cyan-500 to-indigo-500"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
            {/* Premium Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
            </div>

            <nav className="fixed w-full z-50 top-6 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">CampusConnect</span>
                    </Link>
                    <Link
                        to="/"
                        className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold transition-all"
                    >
                        <ArrowLeft className="h-4 w-4" /> Home
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 pt-40 pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
                        >
                            <Sparkles className="h-3 w-3" /> Core Infrastructure
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
                        >
                            Powerful <span className="text-indigo-400">Capabilities.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-xl font-light max-w-2xl mx-auto leading-relaxed"
                        >
                            Precision engineered tools designed to unify institutional operations and maximize academic efficiency.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {keyFeatures.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity blur-3xl`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                    <feature.icon className="h-7 w-7 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed font-light">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 p-12 rounded-[3.5rem] bg-indigo-600 relative overflow-hidden text-center group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-500" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to Upgrade?</h2>
                            <p className="text-indigo-100 text-lg mb-10 max-w-lg font-light">Join forward-thinking institutions already leveraging the power of CampusConnect.</p>
                            <Button
                                onClick={() => navigate('/register')}
                                className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl transition-all active:scale-95"
                            >
                                Get Started Now
                            </Button>
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

export default Features;
