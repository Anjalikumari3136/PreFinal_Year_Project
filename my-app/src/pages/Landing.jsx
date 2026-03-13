import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    CheckCircle,
    Star,
    MessageSquare,
    Calendar,
    FileText,
    Target,
    Shield,
    Smartphone,
    Mail,
    Phone,
    MapPin,
    Menu,
    X
} from 'lucide-react';

const backgroundImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop", // Graduation
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", // Library
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop", // Campus
    "https://images.unsplash.com/photo-1524178232363-1fb28f74b671?q=80&w=2070&auto=format&fit=crop", // Classroom
];

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const features = [
        { icon: Zap, text: "Lightning Fast", color: "text-amber-500" },
        { icon: Award, text: "Award Winning", color: "text-indigo-500" },
        { icon: TrendingUp, text: "Performance Tracking", color: "text-emerald-500" }
    ];

    const steps = [
        { icon: Users, title: "Choose Your Role", desc: "Select from Student, Faculty, or Admin portals specialized for your needs." },
        { icon: ShieldCheck, title: "Secure Authentication", desc: "Log in with enterprise-grade security and personalized accessibility." },
        { icon: Target, title: "Achieve Excellence", desc: "Access all your academic resources and track your progress in real-time." }
    ];

    const keyFeatures = [
        { icon: Calendar, title: "Smart Scheduling", description: "AI-powered class and mentorship scheduling that adapts to your needs." },
        { icon: FileText, title: "Request Management", description: "Submit and track all academic requests in one centralized platform." },
        { icon: Target, title: "Goal Tracking", description: "Set academic goals and monitor your progress with detailed analytics." },
        { icon: MessageSquare, title: "Real-time Communication", description: "Instant notifications and updates for all stakeholders." },
        { icon: Shield, title: "Secure & Private", description: "Enterprise-grade security to protect your academic data." },
        { icon: Smartphone, title: "Mobile Ready", description: "Access your dashboard anywhere, anytime on any device." }
    ];

    const stats = [
        { number: "10K+", label: "Active Students" },
        { number: "500+", label: "Faculty Members" },
        { number: "98%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support Available" }
    ];

    const testimonials = [
        { name: "Priya Sharma", role: "Computer Science Student", image: "P", text: "CampusConnect made my academic journey so much smoother. Request tracking is a game-changer!" },
        { name: "Dr. Rajesh Kumar", role: "Associate Professor", image: "R", text: "Managing student evaluations and schedules has never been easier. Highly recommended!" },
        { name: "Admin Team", role: "University Administration", image: "A", text: "The analytics and reporting features help us make data-driven decisions effortlessly." }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden relative">

            {/* Animated Wallpaper Background */}
            <div className="fixed inset-0 z-0 bg-slate-100">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentBg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${backgroundImages[currentBg]})`,
                        }}
                    >
                        {/* Light Overlay for Visibility */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="relative z-10 w-full h-full overflow-y-auto">
                <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex justify-between h-20 items-center">
                            {/* Logo */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl blur-md opacity-50"></div>
                                    <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-2xl shadow-lg border border-white/20">
                                        <GraduationCap className="h-7 w-7 text-white" />
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-2xl font-black bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 bg-clip-text text-transparent">CampusConnect</span>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest -mt-1">Future of Learning</p>
                                </div>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-10 ml-8">
                                {[
                                    { label: 'HOME', path: '/' },
                                    { label: 'FEATURES', path: '/features' },
                                    { label: 'PORTALS', path: '#portals' },
                                    { label: 'ABOUT US', path: '/about' },
                                    { label: 'CONTACT', path: '/contact' }
                                ].map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => {
                                            if (link.path.startsWith('#')) {
                                                const el = document.getElementById(link.path.substring(1));
                                                el?.scrollIntoView({ behavior: 'smooth' });
                                            } else {
                                                navigate(link.path);
                                            }
                                        }}
                                        className="group relative py-2 text-[14px] font-black text-slate-700 hover:text-indigo-600 transition-all tracking-wide uppercase"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></span>
                                    </button>
                                ))}

                                <div className="flex items-center gap-4 ml-4">
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white px-8 py-2.5 rounded-full text-[11px] font-black shadow-xl hover:scale-105 transition-all shadow-indigo-200"
                                    >
                                        PORTAL LOGIN
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Toggle */}
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                                {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                            </button>
                        </div>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="md:hidden bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-6 mt-2 mb-4 overflow-hidden"
                                >
                                    <div className="flex flex-col gap-6">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Navigation</p>
                                            {[
                                                { label: 'HOME', path: '/' },
                                                { label: 'FEATURES', path: '/features' },
                                                { label: 'PORTALS', path: '#portals' },
                                                { label: 'ABOUT US', path: '/about' },
                                                { label: 'CONTACT', path: '/contact' }
                                            ].map((link) => (
                                                <button
                                                    key={link.label}
                                                    onClick={() => {
                                                        if (link.path.startsWith('#')) {
                                                            const el = document.getElementById(link.path.substring(1));
                                                            el?.scrollIntoView({ behavior: 'smooth' });
                                                        } else {
                                                            navigate(link.path);
                                                        }
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="block py-2 text-left text-lg font-black text-white hover:text-orange-400 transition-colors"
                                                >
                                                    {link.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                            <button
                                                className="flex-1 font-black bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl py-4 text-sm shadow-xl"
                                                onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                                            >
                                                PORTAL LOGIN
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Hero Section (Matched to Image Style) */}
                <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-20 max-w-7xl mx-auto">
                    <div className="max-w-4xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm"
                            >
                                <Sparkles className="h-3 w-3" />
                                Academic Management System
                            </motion.span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter leading-[0.95] mb-6">
                                <span className="text-slate-900 block drop-shadow-sm uppercase">Empowering Campus.</span>
                                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent block drop-shadow-sm uppercase">Fueling Success.</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed max-w-2xl font-medium drop-shadow-sm">
                                Experience the next generation of academic management.
                                A unified ecosystem designed to streamline administrative workflows and accelerate student growth.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-20">
                                <button
                                    onClick={() => navigate('/register')}
                                    className="bg-orange-600 hover:bg-orange-700 text-white font-black px-10 py-5 rounded-xl text-base shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('portals');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="bg-transparent hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-black px-10 py-5 rounded-xl text-base transition-all hover:scale-105 uppercase tracking-widest"
                                >
                                    Our Portals
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="portals" className="relative pb-24 px-6 lg:px-8 max-w-7xl mx-auto -mt-20">

                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
                        {[
                            { title: "Student Portal", desc: "Submit requests, track academic progress, and book mentorship sessions seamlessly.", icon: GraduationCap, gradient: "from-emerald-400 via-teal-500 to-cyan-500", bg: "from-emerald-100 to-teal-100", role: "student" },
                            { title: "Faculty Portal", desc: "Manage evaluations, view enrolled students, and schedule classes effortlessly.", icon: BookOpen, gradient: "from-violet-400 via-fuchsia-500 to-pink-500", bg: "from-violet-100 to-fuchsia-100", role: "faculty" },
                            { title: "Admin Portal", desc: "Complete user management, system configuration, and request oversight.", icon: ShieldCheck, gradient: "from-indigo-500 via-blue-600 to-cyan-600", bg: "from-indigo-100 to-blue-100", role: "admin" }
                        ].map((portal, i) => (
                            <motion.div key={i} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} className="group relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 hover:border-indigo-200 transition-all duration-500">
                                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${portal.gradient}`}></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative p-10">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${portal.bg} rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                        <portal.icon className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">{portal.title}</h3>
                                    <p className="text-slate-600 mb-8 leading-relaxed font-medium">{portal.desc}</p>
                                    <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 font-black text-base py-6 rounded-2xl shadow-lg" onClick={() => navigate('/login')}>
                                        <span className="flex items-center justify-center gap-2">Login as {portal.title.split(' ')[0]} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-20 text-center">
                        <p className="text-slate-700 text-base font-black drop-shadow-sm">
                            New to CampusConnect? <span className="text-indigo-600 font-black cursor-pointer hover:text-indigo-700 ml-2 underline decoration-2 underline-offset-4" onClick={() => navigate('/register')}>Register as Student →</span>
                        </p>
                    </motion.div>
                </section>

                <section id="stats" className="relative py-20 px-6 lg:px-8 bg-gradient-to-br from-indigo-600/90 via-violet-600/90 to-fuchsia-600/90 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                                    <h3 className="text-5xl font-black text-white mb-2">{stat.number}</h3>
                                    <p className="text-indigo-100 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="features" className="relative py-24 px-6 lg:px-8 bg-white/60 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Everything You Need, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">All in One Place</span></h2>
                            <p className="text-lg text-slate-700 max-w-2xl mx-auto">Powerful features designed to make campus management effortless and efficient.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {keyFeatures.map((feature, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <feature.icon className="h-7 w-7 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="relative py-24 px-6 lg:px-8 bg-slate-50/70 backdrop-blur-md">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">About <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">CampusConnect</span></h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-8">
                            CampusConnect is a comprehensive university support management system designed to streamline academic operations.
                            Built as a final year project, our platform bridges the gap between students, faculty, and administration,
                            making campus life more organized and efficient.
                        </p>
                    </div>
                </section>

                <section id="contact" className="relative py-24 px-6 lg:px-8 bg-white/60 backdrop-blur-md">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12">Get in <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Touch</span></h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <Mail className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
                                <p className="text-slate-900 font-bold">Email</p>
                                <p className="text-slate-600">support@campus.edu</p>
                            </div>
                            <div>
                                <Phone className="h-8 w-8 text-violet-600 mx-auto mb-4" />
                                <p className="text-slate-900 font-bold">Phone</p>
                                <p className="text-slate-600">+91 98765-43210</p>
                            </div>
                            <div>
                                <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
                                <p className="text-slate-900 font-bold">Location</p>
                                <p className="text-slate-600">University Campus, India</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="relative bg-slate-900 text-white py-16 text-center">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <GraduationCap className="h-8 w-8 text-indigo-400" />
                            <span className="text-2xl font-black">CampusConnect</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">© 2026 CampusConnect Platform. Final Year Project.</p>
                        <p className="text-slate-500 text-xs">Made with ❤️ for better education</p>
                    </div>
                </footer>
            </div>
        </div >
    );
};

export default Landing;
