import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

const Landing = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-sans selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden">
            
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                       
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl blur-md opacity-50"></div>
                                <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-2xl">
                                    <GraduationCap className="h-7 w-7 text-white" />
                                </div>
                            </div>
                            <div>
                                <span className="text-2xl font-black bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 bg-clip-text text-transparent">CampusConnect</span>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">UniSupport Platform</p>
                            </div>
                        </motion.div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
                            <a href="#about" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">About</a>
                            <a href="#contact" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                                <div className="relative">
                                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <div className="absolute inset-0 h-2 w-2 bg-emerald-500 rounded-full animate-ping"></div>
                                </div>
                                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">Live</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="font-bold hover:bg-indigo-50 hidden sm:flex">Sign In</Button>
                            <Button size="sm" onClick={() => navigate('/register')} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 font-black shadow-lg shadow-indigo-500/30">
                                <span className="hidden sm:inline">Get Started </span>
                                <span className="sm:hidden">Start</span>
                            </Button>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 space-y-2">
                            <a href="#features" className="block py-2 text-sm font-bold text-slate-600 hover:text-indigo-600">Features</a>
                            <a href="#about" className="block py-2 text-sm font-bold text-slate-600 hover:text-indigo-600">About</a>
                            <a href="#contact" className="block py-2 text-sm font-bold text-slate-600 hover:text-indigo-600">Contact</a>
                        </div>
                    )}
                </div>
            </nav>

            <section className="relative pt-36 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <motion.span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 text-indigo-700 text-sm font-black mb-8 border border-indigo-100 shadow-sm" whileHover={{ scale: 1.05 }}>
                            <Sparkles className="h-4 w-4" />
                            CampusConnect v2.0 - Now Live
                        </motion.span>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                            Campus Management<br />
                            <span className="relative inline-block">
                                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 blur-2xl opacity-30"></span>
                                <span className="relative bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Reimagined.</span>
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                            The most powerful platform for students, faculty, and administrators.
                            <span className="text-indigo-600 font-bold"> Streamline everything</span> in one beautiful place.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {features.map((feature, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100">
                                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                                    <span className="text-sm font-bold text-slate-700">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
                    {[
                        { title: "Student Portal", desc: "Submit requests, track academic progress, and book mentorship sessions seamlessly.", icon: GraduationCap, gradient: "from-emerald-400 via-teal-500 to-cyan-500", bg: "from-emerald-100 to-teal-100", role: "student" },
                        { title: "Faculty Portal", desc: "Manage evaluations, view enrolled students, and schedule classes effortlessly.", icon: BookOpen, gradient: "from-violet-400 via-fuchsia-500 to-pink-500", bg: "from-violet-100 to-fuchsia-100", role: "faculty" },
                        { title: "Admin Portal", desc: "Complete user management, system configuration, and request oversight.", icon: ShieldCheck, gradient: "from-indigo-500 via-blue-600 to-cyan-600", bg: "from-indigo-100 to-blue-100", role: "admin" }
                    ].map((portal, i) => (
                        <motion.div key={i} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} className="group relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 hover:border-indigo-200 transition-all duration-500">
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${portal.gradient}`}></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative p-10">
                                <div className={`w-16 h-16 bg-gradient-to-br ${portal.bg} rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                    <portal.icon className="h-8 w-8 text-indigo-600" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3">{portal.title}</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed font-medium">{portal.desc}</p>
                                <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 font-black text-base py-6 rounded-2xl shadow-lg" onClick={() => navigate('/login', { state: { role: portal.role } })}>
                                    <span className="flex items-center justify-center gap-2">Login as {portal.title.split(' ')[0]} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-20 text-center">
                    <p className="text-slate-500 text-base font-medium">
                        New to CampusConnect? <span className="text-indigo-600 font-black cursor-pointer hover:text-indigo-700 ml-2 underline decoration-2 underline-offset-4" onClick={() => navigate('/register')}>Register as Student →</span>
                    </p>
                </motion.div>
            </section>
            <section id="stats" className="relative py-20 px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600">
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

            <section id="features" className="relative py-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Everything You Need, <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">All in One Place</span></h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Powerful features designed to make campus management effortless and efficient.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {keyFeatures.map((feature, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group">
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

            <section id="about" className="relative py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">About <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">CampusConnect</span></h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        CampusConnect is a comprehensive university support management system designed to streamline academic operations.
                        Built as a final year project, our platform bridges the gap between students, faculty, and administration,
                        making campus life more organized and efficient.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We believe in leveraging technology to create better educational experiences. Our mission is to empower
                        educational institutions with tools that save time, improve communication, and enhance overall productivity.
                    </p>
                </div>
            </section>

            <section id="testimonials" className="relative py-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Loved by <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Thousands</span></h2>
                        <p className="text-lg text-slate-600">See what our users have to say about CampusConnect</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                                </div>
                                <p className="text-slate-600 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-lg">{testimonial.image}</div>
                                    <div>
                                        <p className="font-black text-slate-900">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="relative py-24 px-6 lg:px-8 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Get in <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Touch</span></h2>
                        <p className="text-lg text-slate-600">Have questions? We'd love to hear from you.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-7 w-7 text-indigo-600" />
                            </div>
                            <h3 className="font-black text-slate-900 mb-2">Email</h3>
                            <p className="text-slate-600 text-sm">support@campusconnect.edu</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                            <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Phone className="h-7 w-7 text-violet-600" />
                            </div>
                            <h3 className="font-black text-slate-900 mb-2">Phone</h3>
                            <p className="text-slate-600 text-sm">+91 98765-43210</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-7 w-7 text-emerald-600" />
                            </div>
                            <h3 className="font-black text-slate-900 mb-2">Location</h3>
                            <p className="text-slate-600 text-sm">University Campus, India</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 border-t border-white/10 py-16">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl">
                                    <GraduationCap className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-white">CampusConnect</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">Empowering education through technology. The most comprehensive campus management platform for modern universities.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-black mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="#features" className="block text-slate-400 hover:text-white text-sm transition-colors">Features</a>
                                <a href="#about" className="block text-slate-400 hover:text-white text-sm transition-colors">About Us</a>
                                <a href="#contact" className="block text-slate-400 hover:text-white text-sm transition-colors">Contact</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-black mb-4">Legal</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                                <a href="#" className="block text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span>© 2025 CampusConnect UniSupport. Final Year Project.</span>
                        </div>
                        <p className="text-slate-500 text-xs">Made with ❤️ for better education</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
