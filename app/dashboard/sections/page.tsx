"use client"

import SectionFormField from '@/components/dashboard/sections/SectionFormField';
import SectionTable from '@/components/dashboard/sections/SectionTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2, Plus, Save } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface KnowledgeSource {
    id: string;
    name: string;
    type: string;
    status: string;
}

interface FormData {
    name: string;
    description: string;
    tone: Tone;
    fallbackBehavior: string;
}

const INITIAL_FORM_DATA: FormData = {
    name: "",
    description: "",
    tone: "neutral",
    fallbackBehavior: "escalate",
}

function Page() {

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Section | null>(null);
    const [knowledgeSource, setKnowledgeSource] = useState<KnowledgeSource[]>([]);
    const [selectedSource, setSelectedSource] = useState<string[]>([]);
    const [isLoadingSource, setIsLoadingSource] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [sections, setSections] = useState<Section[]>([]);
    const [isLoadingSection, setIsLoadingSection] = useState(true);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

    const isPreviewMode = selectedSection?.id !== "new";

    useEffect(() => {
        const fetchSources = async () => {
            try {
                const res = await fetch('/api/knowledge/fetch');
                const data = await res.json();
                setKnowledgeSource(data.source || []);
            } catch (error) {
                console.error("Error fetching sources:", error);
            } finally {
                setIsLoadingSource(false);
            }
        };

        fetchSources();
    }, []);

    const fetchSections = useCallback(async () => {
        try {
            setIsLoadingSection(true);
            const res = await fetch('/api/section/fetch');
            const data = await res.json();

            const transformedSections: Section[] = data.map((section: any) => ({
                id: section.id,
                name: section.name,
                description: section.description,
                sourceCount: section.sourceIds?.length || 0,
                source_ids: section.sourceIds || [],
                tone: section.tone as Tone,
                status: section.status as SectionStatus, // ✅ Fixed: was "staus"
            }));

            setSections(transformedSections);
        } catch (error) {
            console.error('Failed to fetch sections:', error);
        } finally {
            setIsLoadingSection(false); // ✅ Fixed: was missing
        }
    }, []);

    useEffect(() => {
        fetchSections();
    }, [fetchSections]);

    const handleCreateSection = () => {
        setSelectedSection({
            id: "new",
            name: "",
            description: "",
            sourceCount: 0,
            tone: "neutral",
            scopeLabel: "",
            status: "draft",
        });
        setSelectedSource([]);
        setFormData(INITIAL_FORM_DATA);
        setIsSheetOpen(true);
    }

    const handleSaveSection = async () => {
        if (!formData.name.trim()) {
            alert("Please enter a section name.");
            return;
        }
        if (!formData.description.trim()) {
            alert("Please enter a description.");
            return;
        }
        if (selectedSource.length === 0) {
            alert("Please select at least one knowledge source.");
            return;
        }

        setIsSaving(true);

        try {
            const sectionData = {
                ...formData,
                sourceIds: selectedSource,
                status: 'active',
            };

            const res = await fetch('/api/section/create', {
                method: 'POST',
                headers: { "Content-Type": "application/json" }, // ✅ Fixed: was "content-Type"
                body: JSON.stringify(sectionData),
            });

            if (!res.ok) {
                throw new Error('Failed to create section');
            }

            await fetchSections();
            setIsSheetOpen(false);
        } catch (error) {
            console.error('Failed to save section:', error);
        } finally {
            setIsSaving(false);
        }
    }

    const handleDeleteSection = async () => {
        if (!selectedSection || selectedSection.id === 'new') return;

        if (!confirm(`Are you sure you want to delete "${selectedSection.name}"? Tis action cannot be undone.`)){
            return;
        }
        
        try {
            setIsSaving(true);
            const res = await fetch('/api/section/delete',{
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedSection.id }),
            });
            if (!res.ok) {
                throw new Error('Failed to delete section');
            }
            await fetchSections();
            setIsSheetOpen(false);
        } catch (error) {
            console.error('Failed to delete section:', error);
        } finally {
            setIsSaving(false);
        }
    }

    const handlePreview = (section: Section) => { // ✅ Fixed: removed unnecessary async
        setSelectedSection(section);
        setFormData({
            name: section.name,
            description: section.description,
            tone: section.tone,
            fallbackBehavior: "escalate",
        });
        setSelectedSource(section.source_ids || []);
        setIsSheetOpen(true);
    }

    return (
        <div className='p-8 space-y-6'>

            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div>
                    <h1 className='text-2xl font-semibold text-white tracking-tight'>
                        Section
                    </h1>
                    <p className='text-sm text-zinc-400 mt-1'>
                        Define behavior of your AI assistant.
                    </p>
                </div>

                <Button
                    onClick={handleCreateSection}
                    className="bg-white text-black hover:bg-zinc-200"
                >
                    <Plus className='w-4 h-4 mr-2' />
                    Add Section
                </Button>
            </div>

            <Card className='border-white/5 bg-[#0A0A0E]'>
                <CardContent className='p-0'>
                    <SectionTable
                        sections={sections}
                        isLoading={isLoadingSection}
                        onPreview={handlePreview}
                        onCreateSection={handleCreateSection}
                    />
                </CardContent>
            </Card>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className='w-full sm:max-w-lg border-l border-white/10 bg-[#0A0A0E] p-0 shadow-2xl flex flex-col h-full'>
                    {selectedSection && (
                        <>
                            <SheetHeader className='p-6 border-b border-white/5'>
                                <SheetTitle className='text-xl text-white'>
                                    {isPreviewMode ? "View Section" : "Create Section"}
                                </SheetTitle>
                                <SheetDescription className='text-zinc-500'>
                                    {isPreviewMode
                                        ? "Review section configuration and data sources."
                                        : "Configure how your AI behaves."
                                    }
                                </SheetDescription>
                            </SheetHeader>

                            <div className='flex-1 overflow-y-auto p-6 space-y-8'>
                                <SectionFormField
                                    formData={formData}
                                    setFormData={setFormData}
                                    selectedSource={selectedSource}
                                    setSelectedSource={setSelectedSource}
                                    knowledgeSource={knowledgeSource}
                                    isLodingSource={isLoadingSource}
                                    isDisabled={isPreviewMode}
                                />
                            </div>

                            {!isPreviewMode && (
                                <div className='p-6 border-t border-white/5'>
                                    <Button
                                        className='w-full bg-white text-black hover:bg-zinc-200'
                                        onClick={handleSaveSection}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className='w-4 h-4 mr-2' />
                                                Save Section
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}

                            {isPreviewMode && (
                                <div className='p-6 bg-red-500/5 border-t border-red-500/10'>
                                    <h5 className='text-sm font-medium text-red-400 mb-1'>
                                        Danger Zone
                                    </h5>
                                    <p className='text-xs text-red-500/70 mb-3'>
                                        Deleting this section will remove all associated routing rules.
                                    </p>
                                    <Button
                                        variant='destructive'
                                        size='sm'
                                        className='w-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 shadow-none'
                                        onClick={handleDeleteSection}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Deleting...' : 'Delete Section'}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Page;