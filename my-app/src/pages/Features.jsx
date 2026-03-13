import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Zap, Award, TrendingUp, Calendar, FileText, Target, MessageSquare, Shield, Smartphone, ArrowLeft } from 'lucide-react';

const Features = () => {
    const navigate = useNavigate();

    const keyFeatures = [
        { icon: Calendar, title: "Smart Scheduling", description: "AI-powered class and mentorship scheduling that adapts to your needs." },
        { icon: FileText, title: "Request Management", description: "Submit and track all academic requests in one centralized platform." },
        { icon: Target, title: "Goal Tracking", description: "Set academic goals and monitor your progress with detailed analytics." },
        { icon: MessageSquare, title: "Real-time Communication", description: "Instant notifications and updates for all stakeholders." },
        { icon: Shield, title: "Secure & Private", description: "Enterprise-grade security to protect your academic data." },
        { icon: Smartphone, title: "Mobile Ready", description: "Access your dashboard anywhere, anytime on any device." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 font-bold">
                <ArrowLeft className="h-5 w-5" /> Back to Home
            </Button>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-4">Our <span className="text-indigo-600">Features</span></h1>
                    <p className="text-xl text-slate-600">Advanced tools designed for the modern university ecosystem.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {keyFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 hover:shadow-2xl transition-all group"
                        >
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <feature.icon className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
