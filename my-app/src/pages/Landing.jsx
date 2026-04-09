import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import {
    GraduationCap,
    Users,
    ShieldCheck,
    ArrowRight,
    BookOpen,
    Sparkles,
    Zap,
    Award,
    TrendingUp,
    MessageSquare,
    Calendar,
    Mail,
    Phone,
    MapPin,
    Menu,
    X,
    Star,
    CheckCircle,
    Shield,
    Target,
    Twitter,
    Linkedin,
    Github,
    Facebook,
    Globe
} from 'lucide-react';

const backgroundImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
];

const AnimatedCounter = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const numericPart = parseInt(value.replace(/[^0-9]/g, ''));
            if (isNaN(numericPart)) return;

            const duration = 2000;
            const increment = numericPart / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= numericPart) {
                    setCount(numericPart);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    const suffix = value.replace(/[0-9]/g, '');
    return <span ref={ref}>{count}{suffix}</span>;
};

const Landing = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { number: "15k+", label: "Happy Students" },
        { number: "450+", label: "Expert Faculty" },
        { number: "120+", label: "Colleges" },
        { number: "24/7", label: "Global Support" }
    ];

    const keyFeatures = [
        { icon: Calendar, title: "Smart Scheduling", description: "Automated timetables and event management for seamless operations." },
        { icon: ShieldCheck, title: "Secure Portal", description: "Encrypted data protection ensuring student and faculty privacy." },
        { icon: TrendingUp, title: "Live Analytics", description: "Real-time performance tracking and academic reporting." },
        { icon: MessageSquare, title: "Direct Connect", description: "Instant communication bridge between students and administration." },
        { icon: Award, title: "Recognition", description: "Managed certificate issuance and achievement tracking." },
        { icon: Zap, title: "Fast Processing", description: "Quick request handling and automated workflow execution." }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 bg-[#020617] overflow-x-hidden">

            {/* Premium Dynamic Background */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <AnimatePresence>
                    <motion.div
                        key={currentBg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            <nav className="fixed w-full z-50 top-0 left-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-6">
                    <div className="bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
                        <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate('/')}>
                            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                                <GraduationCap className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">CampusConnect</span>
                        </div>

                        <div className="hidden lg:flex items-center gap-8">
                            <Link to="/features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</Link>
                            <Link to="/portals" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Portals</Link>
                            <Link to="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</Link>
                            <Link to="/contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</Link>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-white text-slate-950 px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-all active:scale-95 shadow-lg"
                            >
                                Login
                            </button>
                        </div>

                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white bg-white/10 rounded-xl">
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[60] lg:hidden bg-slate-950/98 backdrop-blur-3xl p-8"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-xl font-bold text-white">Menu</span>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white/70"><X className="h-6 w-6" /></button>
                        </div>
                        <div className="flex flex-col gap-6">
                            <Link to="/features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white/80 hover:text-white">Features</Link>
                            <Link to="/portals" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white/80 hover:text-white">Portals</Link>
                            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white/80 hover:text-white">About</Link>
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white/80 hover:text-white">Contact</Link>
                            <button
                                onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                                className="w-full bg-indigo-600 text-white py-4 rounded-xl text-xl font-bold mt-4 shadow-xl shadow-indigo-500/20 text-center"
                            >
                                Portal Login
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex items-center px-6 lg:px-8 pt-10">
                    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
                                <Sparkles className="h-3 w-3" /> Latest Infrastructure V2.4
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
                                Empowering <span className="text-indigo-400">Campus.</span><br />Fueling Success.
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg font-light">
                                A comprehensive institutional ecosystem designed to unify digital operations and accelerate student success through intelligent automation.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                                >
                                    Get Started Free
                                </button>
                                <button
                                    onClick={() => document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl text-base font-bold backdrop-blur-md transition-all active:scale-95"
                                >
                                    Explore Portals
                                </button>
                            </div>

                            <div className="mt-16 flex items-center gap-8">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden shadow-xl">
                                            <img src={`https://i.pravatar.cc/100?u=acc${i}`} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg tracking-tight">15,000+ Active Users</p>
                                    <p className="text-slate-400 text-sm font-medium">Trusted by leading educational institutions</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="hidden lg:block relative"
                        >
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                    alt="Platform Preview"
                                    className="w-full h-auto opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                            </div>

                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-8 -right-8 bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-xl border border-white/20 max-w-[180px]"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Sync</span>
                                </div>
                                <p className="text-slate-900 text-sm font-bold leading-tight uppercase">Sync Mode: Active</p>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-8 -left-8 bg-indigo-600 p-5 rounded-2xl shadow-xl max-w-[200px]"
                            >
                                <div className="p-1.5 bg-white/20 rounded-lg inline-block mb-2">
                                    <Award className="h-5 w-5 text-white" />
                                </div>
                                <p className="text-white text-sm font-bold">Award Winning Platform 2026</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Portals Section */}
                <section id="portals" className="py-24 px-6 lg:px-8 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <span className="text-indigo-600 font-bold uppercase tracking-[0.15em] text-[10px]">Access Control</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 mb-5 tracking-tight">Dedicated Dashboards</h2>
                            <p className="text-slate-500 text-lg max-w-xl mx-auto font-light leading-relaxed">Custom-built interfaces focused on the unique needs of every stakeholder.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Student Portal", icon: GraduationCap, color: "bg-indigo-600", desc: "Manage enrollments, submit requests, and track your academic journey.", route: "/dashboard" },
                                { title: "Faculty Portal", icon: BookOpen, color: "bg-indigo-500", desc: "Streamline class management, grading, and student mentorship.", route: "/faculty-dashboard" },
                                { title: "Admin Portal", icon: ShieldCheck, color: "bg-slate-900", desc: "Centralized panel for user governance and institutional oversight.", route: "/admin-dashboard" }
                            ].map((portal, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center group transition-all duration-300"
                                >
                                    <div className={`${portal.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                                        <portal.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{portal.title}</h3>
                                    <p className="text-slate-500 text-sm mb-8 leading-relaxed font-light">{portal.desc}</p>
                                    <button
                                        onClick={() => navigate(portal.route)}
                                        className="mt-auto flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider group/btn"
                                    >
                                        Access Portal <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section - EXACTLY AS PER SCREENSHOT */}
                <section id="features" className="py-24 px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
                            <div className="max-w-2xl text-left">
                                <span className="text-indigo-600 font-bold uppercase tracking-widest text-[10px]">Capabilities</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 tracking-tight leading-tight">Everything You Need To <br /><span className="text-indigo-600 font-extrabold italic">Succeed.</span></h2>
                            </div>
                            <p className="text-slate-500 text-lg max-w-sm pb-2 font-light">Powerful tools integrated into a single platform for ultimate efficiency.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {keyFeatures.map((feature, i) => (
                                <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100 group">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:bg-indigo-600 transition-colors duration-500">
                                        <feature.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-light text-base">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-slate-950 text-white pt-20 pb-10 px-6 lg:px-8 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-600 p-2 rounded-xl">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-2xl font-bold tracking-tight">CampusConnect</span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed font-light max-w-xs">
                                    The ultimate academic management ecosystem designed to empower students, faculty, and administration through innovation and automation.
                                </p>
                                <div className="flex gap-4">
                                    {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all duration-300">
                                            <Icon className="h-4 w-4 text-white" />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Platform</h4>
                                <ul className="space-y-4">
                                    <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Student Portal</Link></li>
                                    <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Faculty Dashboard</Link></li>
                                    <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Admin Command Center</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h4>
                                <ul className="space-y-4">
                                    <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Documentation</Link></li>
                                    <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Help Center</Link></li>
                                </ul>
                            </div>

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
                                </ul>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">© 2026 CampusConnect Platform. Optimized for Modern Learning.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default Landing;
