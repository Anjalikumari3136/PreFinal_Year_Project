import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Clock,
    Globe,
    ArrowLeft,
    GraduationCap,
    Send,
    Search,
    Twitter,
    Linkedin,
    Github,
    Facebook
} from 'lucide-react';

const Contact = () => {
    const navigate = useNavigate();

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Support",
            value: "support@campus.edu",
            desc: "Response time: < 2 Hours",
            color: "text-indigo-400"
        },
        {
            icon: Phone,
            title: "Phone Support",
            value: "+91 98765-43210",
            desc: "Mon - Sat: 9am to 6pm",
            color: "text-blue-400"
        },
        {
            icon: MessageCircle,
            title: "Direct Chat",
            value: "Instant Help",
            desc: "Available for Pro Partners",
            color: "text-purple-400"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 overflow-hidden relative">
            {/* Background Grain/Blur */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-indigo-600/5 blur-[120px] rounded-full" />
                <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-indigo-600/5 blur-[120px] rounded-full" />
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
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
                        >
                            <Globe className="h-3 w-3" /> 24/7 Support Desk
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
                        >
                            How can we <span className="text-indigo-400">help?</span>
                        </motion.h1>
                        <p className="text-slate-400 text-xl font-light max-w-2xl mx-auto">Our dedicated institutional team is ready to assist you in optimizing your campus experience.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-32">
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-white/5 backdrop-blur-xl p-12 rounded-[3.5rem] border border-white/10"
                            >
                                <h3 className="text-3xl font-bold text-white mb-10 tracking-tight">Send a Priority Message</h3>
                                <form className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indigo-600 transition-all text-white font-medium" placeholder="Campus Administrator" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
                                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indigo-600 transition-all text-white font-medium" placeholder="admin@university.edu" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-indigo-600 transition-all text-white font-medium appearance-none">
                                            <option className="bg-slate-900">Technical Support</option>
                                            <option className="bg-slate-900">Institutional Onboarding</option>
                                            <option className="bg-slate-900">Feature Request</option>
                                            <option className="bg-slate-900">Partnership Inquiry</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Message Detail</label>
                                        <textarea className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 px-6 outline-none focus:border-indigo-600 transition-all text-white font-medium h-48 resize-none" placeholder="How can we help your institution today?"></textarea>
                                    </div>
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-2xl shadow-indigo-500/20 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3">
                                        <Send className="h-4 w-4" /> Dispatch Message
                                    </button>
                                </form>
                            </motion.div>
                        </div>

                        <div className="space-y-8">
                            {contactMethods.map((method, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all duration-500"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <method.icon className={`h-6 w-6 ${method.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{method.title}</p>
                                            <p className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{method.value}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                                        <Clock className="h-4 w-4 text-slate-600" />
                                        <span className="text-xs text-slate-500 font-medium">{method.desc}</span>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-indigo-600/20 p-8 rounded-[2.5rem] border border-indigo-500/30 text-center"
                            >
                                <h4 className="text-white font-bold mb-2">Location Hub</h4>
                                <p className="text-indigo-200 text-sm font-light mb-6">Explore our physical campuses and research centers.</p>
                                <div className="flex items-center justify-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                                    <MapPin className="h-4 w-4" /> View Map Overview
                                </div>
                            </motion.div>
                        </div>
                    </div>
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

export default Contact;
