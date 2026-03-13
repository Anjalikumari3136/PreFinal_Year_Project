import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowLeft, Target, Heart, Shield } from 'lucide-react';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 font-bold">
                <ArrowLeft className="h-5 w-5" /> Back to Home
            </Button>

            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-black text-slate-900 mb-8">About <span className="text-indigo-600">CampusConnect</span></h1>

                <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 mb-12">
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                        CampusConnect is a groundbreaking university management ecosystem designed as a state-of-the-art final year project.
                        We bridge the communication gap between students, educators, and administrators through sophisticated technology.
                    </p>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We believe education should be powered by intuitive tools that maximize efficiency and foster success for everyone
                        in the institutional circle.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <Target className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
                        <h3 className="font-black text-lg mb-2">Our Mission</h3>
                        <p className="text-slate-500 text-sm">Empowering education through tech.</p>
                    </div>
                    <div className="p-6">
                        <Heart className="h-10 w-10 text-pink-500 mx-auto mb-4" />
                        <h3 className="font-black text-lg mb-2">Our Vision</h3>
                        <p className="text-slate-500 text-sm">Future of campus management.</p>
                    </div>
                    <div className="p-6">
                        <Shield className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
                        <h3 className="font-black text-lg mb-2">Our Values</h3>
                        <p className="text-slate-500 text-sm">Trust, Security, Excellence.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
