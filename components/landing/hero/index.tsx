import React from "react";
import Image from "next/image";
import { isLogin } from "@/lib/isLogin";
import  Link  from "next/link";

const Hero = async () => {
  const user = await isLogin();
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">

      {/* TOP CONTENT */}
      <div className="max-w-4xl mx-auto text-center relative z-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="text-xs font-medium text-white">New</span>
          <span className="text-xs font-medium text-zinc-400">
            Version 1.0.0 is available now
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
          Human-friendly support,
          <br />
          <span className="text-zinc-500">powered by AI</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          PagePilot is an AI-powered support platform that helps you create
          a seamless experience for your customers.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          {user ? <Link href="/dashboard" className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-zinc-200 transition">
            Dashboard →
          </Link> : <Link href="/api/auth" className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm hover:bg-zinc-200 transition">
            Start for free →
          </Link>}

          {user ? <></>:<button className="border border-white/20 text-white px-6 py-3 rounded-full font-medium text-sm hover:bg-white/10 transition">
            View demo
          </button>}
        </div>
      </div>

      {/* CHAT PREVIEW AREA */}
      <div className="max-w-3xl mx-auto relative z-10">

        {/* Glow */}
        <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Chat Card */}
        <div className="rounded-2xl p-1 md:p-2 relative overflow-hidden ring-1 ring-white/10 bg-[#0a0a0e] shadow-2xl">
          <div className="flex flex-col h-[420px] md:h-[520px] w-full bg-[#0a0a0e] rounded-xl overflow-hidden">

            {/* Header */}
            <div className="h-12 border-b border-white/10 flex items-center gap-3 px-4 text-sm text-zinc-300">
              <Image
                src="https://avatars.githubusercontent.com/u/170118068?v=4&size=64"
                alt="AI Avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span>AI Assistant</span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 text-zinc-500 text-sm space-y-3">
              <div className="bg-white/5 px-3 py-2 rounded-lg w-fit">
                Hello 👋 How can I help you today?
              </div>
              <div className="bg-indigo-500/20 px-3 py-2 rounded-lg w-fit ml-auto">
                I want to add AI chat to my website.
              </div>
            </div>

            {/* INPUT BAR WITH SEND BUTTON */}
            <div className="h-14 border-t border-white/10 flex items-center gap-2 px-3">

              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-sm text-zinc-400 placeholder:text-zinc-600"
              />

              <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition">
                {/* Send Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.4 20.6l17.2-8.6a1 1 0 000-1.8L3.4 1.6a1 1 0 00-1.4 1.2l2.6 7.2a1 1 0 00.9.7h7.1l-7.1.7a1 1 0 00-.9.7l-2.6 7.2a1 1 0 001.4 1.3z" />
                </svg>
              </button>

            </div>

          </div>
        </div>

        {/* MESSAGE BUTTON ATTACHED TO CARD */}
        <div className="absolute -bottom-6 -right-6 z-30">
          <button className="w-14 h-14 rounded-full bg-white text-black shadow-lg flex items-center justify-center hover:scale-105 transition">
            💬
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;