import React from 'react';
import { Link } from 'react-router-dom';
import {
    GraduationCap,
    Twitter,
    Linkedin,
    Github,
    Facebook,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-white pt-24 pb-12 px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Column 1: Identity */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-600 p-2 rounded-xl">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <span className="text-2xl font-bold tracking-tighter">CampusConnect</span>
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

                    {/* Column 2: Platform */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Student Portal</Link></li>
                            <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Faculty Dashboard</Link></li>
                            <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Admin Command Center</Link></li>
                            <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Request Management</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Documentation</Link></li>
                            <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Help Center</Link></li>
                            <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-light">Community Forum</Link></li>
                            <li><Link to="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-light">API Reference</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Get In Touch */}
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
                                <MapPin className="h-4 w-4 text-indigo-400 mt-1" />
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
    );
};

export default Footer;
