
import Sidebar from "@/components/dashboard/Sidebar";
import { cookies } from "next/headers";
import React from "react";

export const metadata = {
    title: "PagePilot AI Dashboard",
    description:
        "Create your own customized AI assistant for any website. Instantly add smart chat, support, and automation to improve user experience.",
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const metadataCookie = cookieStore.get("webdata");

    return (
        <div className="bg-[#050509] min-h-screen font-sans antialiased text-white selection:bg-zinc-800 flex">
            {metadataCookie?.value ? (
                <>
                    <Sidebar />
                    <div className="flex-1 flex flex-col md:ml-64 relative min-h-screen transition-all duration-300">
                        {/*<Header/>*/}
                        <main className="flex-1">{children}</main>
                    </div>
                </>
            ) : children}
        </div>
    )
}