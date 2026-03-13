import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans p-8">
            <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 flex items-center gap-2 font-bold">
                <ArrowLeft className="h-5 w-5" /> Back to Home
            </Button>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 mb-4">Get in <span className="text-indigo-600">Touch</span></h1>
                    <p className="text-xl text-slate-600">We're here to help you with anything you need.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-6">
                            <div className="p-4 bg-indigo-50 rounded-2xl">
                                <Mail className="h-8 w-8 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-slate-900 mb-2">Email Us</h3>
                                <p className="text-slate-500 font-medium">support@campusconnect.edu</p>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-6">
                            <div className="p-4 bg-purple-50 rounded-2xl">
                                <Phone className="h-8 w-8 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-slate-900 mb-2">Call Us</h3>
                                <p className="text-slate-500 font-medium">+91 98765-43210</p>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 flex items-start gap-6">
                            <div className="p-4 bg-emerald-50 rounded-2xl">
                                <MapPin className="h-8 w-8 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-slate-900 mb-2">Our Office</h3>
                                <p className="text-slate-500 font-medium">University Campus, Tech Block A, India</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100">
                        <h3 className="font-black text-2xl mb-8">Send a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-black text-slate-700 mb-2">Full Name</label>
                                <input type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-slate-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-slate-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="How can we help?"></textarea>
                            </div>
                            <Button className="w-full py-5 rounded-2xl font-black bg-indigo-600 text-lg">Send Message</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
