import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import { isLogin } from "@/lib/isLogin";
import LogoutButton from "./LogoutButton";

const NavBar = async () => {
    const user = await isLogin();

    console.log(user);
    return (
        <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-sm border-b border-white/5 bg-[#050509]/50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="Logo" width={32} height={32} />
                    <span className="font-semibold text-white">PagePlot AI</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-light text-zinc-400">
                    <Link href="#features" className="hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="#integration" className="hover:text-white transition-colors">
                        Integration
                    </Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">
                        Pricing
                    </Link>
                </div>

                {user ?
                    <div className="flex items-center gap-4">
                        <LogoutButton />
                        <Link href="/dashboard" className="bg-white text-black text-sm px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">
                            Dashboard
                        </Link>
                    </div>
                    :
                    <div className="flex items-center gap-4">
                        <Link href="/api/auth" className="text-sm text-zinc-400 hover:text-white transition-colors">
                            LogIn
                        </Link>
                        <Link href="/api/auth" className="bg-white text-black text-sm px-4 py-2 rounded-full font-medium hover:bg-zinc-200 transition-colors">
                            Get Started
                        </Link>
                    </div>}
            </div>
        </nav>
    );
}

export default NavBar;