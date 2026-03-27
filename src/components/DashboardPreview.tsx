import React from 'react';
import {
    Home, ListTodo, FileText, BarChart3, Calendar,
    TrendingUp, Shield, Bell
} from 'lucide-react';

export function DashboardPreview() {
    return (
        <div className="select-none pointer-events-none text-[11px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#172008] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white tracking-wider">T</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">TRIBU</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Bell className="w-3.5 h-3.5 text-gray-300" />
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2a3a12] to-[#4a6a24] flex items-center justify-center text-[8px] font-bold text-white">
                        JB
                    </div>
                </div>
            </div>

            {/* Body with sidebar + content */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-36 border-r border-gray-50 py-3 px-3 space-y-1 bg-[#FAFBF8]">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#172008] text-white text-[10px] font-medium">
                        <Home className="w-3 h-3" /> Home
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 text-[10px]">
                        <ListTodo className="w-3 h-3" /> Tasks
                        <span className="ml-auto bg-amber-100 text-amber-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full">10</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 text-[10px]">
                        <FileText className="w-3 h-3" /> Documents
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 text-[10px]">
                        <BarChart3 className="w-3 h-3" /> Economics
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-gray-400 text-[10px]">
                        <Calendar className="w-3 h-3" /> Calendar
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4 space-y-3">
                    {/* Mission Card */}
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-gray-300 mb-2">Active Mission</div>
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <div className="text-[10px] text-gray-400">Mission with <span className="text-gray-900 font-semibold">Doctolib</span></div>
                                <div className="text-[11px] font-bold text-gray-900">Senior React Engineer</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[11px] font-bold text-[#172008]">127</div>
                                <div className="text-[8px] text-gray-300 uppercase">days</div>
                            </div>
                        </div>
                        <div className="h-1.5 bg-[#F2F4F0] rounded-full overflow-hidden">
                            <div className="h-full rounded-full w-[62%]" style={{ background: 'linear-gradient(90deg, #2a3a12, #4a6a24, #6a9a36)' }} />
                        </div>
                    </div>

                    {/* Economics mini */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-xl border border-gray-100 p-3">
                            <div className="text-[9px] font-bold uppercase tracking-wider text-gray-300 mb-1">Daily Rate</div>
                            <div className="text-lg font-bold text-gray-900">550€</div>
                        </div>
                        <div className="bg-[#F8FAF6] rounded-xl border border-gray-100 p-3">
                            <div className="flex items-center gap-1 mb-1">
                                <TrendingUp className="w-2.5 h-2.5 text-[#4a6a24]" />
                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-300">Monthly</span>
                            </div>
                            <div className="text-lg font-bold text-[#172008]">11 000€</div>
                        </div>
                    </div>

                    {/* Document row */}
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-gray-300 mb-2">Documents</div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center">
                                        <Shield className="w-2.5 h-2.5 text-emerald-500" />
                                    </div>
                                    <span className="text-[10px] text-gray-700">Service Agreement</span>
                                </div>
                                <span className="text-[8px] font-semibold text-emerald-500 uppercase">Signed</span>
                            </div>
                            <div className="flex items-center justify-between py-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center">
                                        <FileText className="w-2.5 h-2.5 text-blue-500" />
                                    </div>
                                    <span className="text-[10px] text-gray-700">NDA — Confidential</span>
                                </div>
                                <span className="text-[8px] font-semibold text-blue-500 uppercase">Available</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="bg-white rounded-xl border border-gray-100 p-3">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-gray-300 mb-2">Your TRIBU Contact</div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2a3a12] to-[#4a6a24] flex items-center justify-center text-[8px] font-bold text-white">RP</div>
                            <div>
                                <div className="text-[10px] font-semibold text-gray-900">Raphael Paya</div>
                                <div className="text-[9px] text-gray-400">Founder & Lead</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
