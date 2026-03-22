'use client'
import AddKnowledgeModal from '@/components/dashboard/knowlage/addKnowledgeModal';
import QuickAction from '@/components/dashboard/knowlage/quickAction';
import { Button } from '@/components/ui/button';
import { FileText, Globe, Plus, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface KnowledgeSource {
    id: number;
    type: string;
    name: string;
    status: string;
    content: string;
    userEmail: string;
    createdAt: string;
}

function Page() {
    const [defaultTab, setDefaultTab] = useState("webdata");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [knowledgeSource, setKnowledgeSource] = useState<KnowledgeSource[]>([]);
    const [knowledgeStoringLoader, setKnowledgeStoringLoader] = useState(false);
    const [knowlageSourceLoader, setKnowlageSourceLoader] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null); // ✅ track open item

    useEffect(() => {
        const fetchSources = async () => {
            try {
                const res = await fetch('/api/knowledge/fetch');
                const data = await res.json();
                setKnowledgeSource(data.source || []);
            } catch (error) {
                console.error("Error fetching sources:", error);
            } finally {
                setKnowlageSourceLoader(false);
            }
        };
        fetchSources();
    }, []);

    const Modal = (tab: string) => {
        setDefaultTab(tab);
        setIsAddOpen(true);
    }

    // ✅ Toggle: open clicked, close if already open
    const handleExpand = (id: number) => {
        setExpandedId(prev => prev === id ? null : id);
    }

    const handleImportSource = async (data: any) => {
        setKnowledgeStoringLoader(true);

        try {
            let response;
            if (data.type === "upload" && data.file) {
                const formData = new FormData();
                formData.append('type', "upload");
                formData.append('file', data.file);
                response = await fetch('/api/knowledge/store', {
                    method: 'POST',
                    body: formData,
                });
            } else {
                response = await fetch('/api/knowledge/store', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
            }

            if (!response.ok) {
                const errorBody = await response.json();
                console.error("API Error:", response.status, errorBody);
                throw new Error(`Failed to import source: ${errorBody.error}`);
            }

            const res = await fetch('/api/knowledge/fetch');
            const newData = await res.json();
            setKnowledgeSource(newData.source || []);
            setIsAddOpen(false);
        } catch (error) {
            console.error("Error importing source:", error);
        } finally {
            setKnowledgeStoringLoader(false);
            setKnowlageSourceLoader(false);
        }
    }

    return (
        <div className='p-6 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                        Knowledge Base
                    </h1>
                    <p className='text-sm text-zinc-400 mt-1'>
                        Manage your website sources, documents, and uploads here.
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Button
                        onClick={() => Modal("webdata")}
                        className="bg-white text-black hover:bg-zinc-200"
                    >
                        <Plus className='w-4 h-4 mr-2' />
                        Add Knowledge
                    </Button>
                </div>
            </div>

            {/* Quick Actions */}
            <QuickAction onModal={Modal} />

            {/* Knowledge Sources List */}
            {knowlageSourceLoader ? (
                <div className="text-zinc-400 text-sm">Loading sources...</div>
            ) : knowledgeSource.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 border border-white/5 rounded-lg bg-[#0A0A0E]">
                    <p className="text-sm">No knowledge sources yet.</p>
                    <p className="text-xs mt-1">Add a website, upload a file, or paste text above.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3">
                    {[...knowledgeSource]
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((source) => (
                        <div
                            key={source.id}
                            className="rounded-lg bg-[#0A0A0E] border border-white/5 overflow-hidden"
                        >
                            {/* ── Header Row (always visible) ── */}
                            <div
                                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() => handleExpand(source.id)}
                            >
                                <div className="p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                                    {source.type === 'website' && <Globe className="w-4 h-4 text-indigo-400" />}
                                    {source.type === 'upload' && <Upload className="w-4 h-4 text-indigo-400" />}
                                    {source.type === 'text' && <FileText className="w-4 h-4 text-indigo-400" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">
                                        {source.name || "Untitled"}
                                    </p>
                                    <p className="text-xs text-zinc-500 capitalize">{source.type}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-xs text-zinc-400">
                                        {new Date(source.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <p className="text-xs text-zinc-600">
                                        {new Date(source.createdAt).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                {/* ✅ Chevron icon */}
                                <div className="ml-2 text-zinc-500">
                                    {expandedId === source.id
                                        ? <ChevronUp className="w-4 h-4" />
                                        : <ChevronDown className="w-4 h-4" />
                                    }
                                </div>
                            </div>

                            {/* ── Expanded Content ── */}
                            {expandedId === source.id && (
                                <div className="px-4 pb-4 border-t border-white/5">
                                    <p className="text-xs text-zinc-400 mt-3 leading-relaxed whitespace-pre-wrap">
                                        {source.content || "No content available."}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <AddKnowledgeModal
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                defaultTab={defaultTab}
                setDefaultTab={setDefaultTab}
                onImport={handleImportSource}
                isLoding={knowledgeStoringLoader}
                existingSources={knowledgeSource}
            />
        </div>
    )
}

export default Page