'use client'
import logo from "@/app/favicon.ico";
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link";
import { BookOpen, Bot, Layers, LayoutDashboard, LogOut, LucideSettings2, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";


const SIDEBAR_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
    { label: "Sections", href: "/dashboard/sections", icon: Layers },
    { label: "Chatbot", href: "/dashboard/chatbot", icon: Bot },
    { label: "Conversation", href: "/dashboard/conversation", icon: MessageSquare },
    { label: "Settings", href: "/dashboard/settings", icon: LucideSettings2 }
]

function Sidebar() {
    const path = usePathname();
    const { email } = useUser();
    const [webdata, setWebdata] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWebData = async () => {
            try {
                const res = await fetch('/api/auth/data/fach');
                const data = await res.json();
                console.log('API Response:', data); // Debug: check what you're actually getting
                setWebdata(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        }
        fetchWebData();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/logout');
        window.location.href = '/';
    };

    return (
        <div className='w-64 border-r border-white/5 bg-[#050509] flex flex-col h-full fixed left-0 top-0 z-40 hidden md:flex'>
            <Link href="/" className="flex px-6 justify-center items-center gap-2">
                <Image src={logo} alt="Logo" width={50} height={50} />
                <span className="font-semibold text-white">PagePlot AI</span>
            </Link>
            <hr />

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {SIDEBAR_ITEMS.map((item) => {
                    const isActive = path === item.href;
                    return (
                        <Link
                            href={item.href}
                            key={item.href}
                            className={cn("flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive ? "bg-white/5 text-white"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Profile & Logout */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                        <span className="text-xs text-zinc-400 group-hover:text-white">
                            {isLoading ? ".." : (webdata?.date?.businessName?.slice(0, 2).toUpperCase() || "PA")}
                        </span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium text-zinc-300 truncate group-hover:text-white">
                            {isLoading ? "Loading..." : `${webdata?.date?.businessName || "PagePlot AI"}`}
                        </span>
                        <span className="text-xs text-zinc-500 truncate">{email}</span>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-3 py-2 rounded-md text-sm font-medium text-zinc-400 hover:text-red-400 bg-white/5 transition-colors"
                >
                    <p className="flex gap-3">LogOut  <LogOut className="w-5 h-5" /></p>
                </button>
            </div>
        </div>
    )
}

export default Sidebar;