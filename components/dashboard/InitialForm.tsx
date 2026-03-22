'use client'
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Building2, ChevronLeft, Command, Globe, LinkIcon, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Textarea } from '../ui/textarea';
import { Input } from '@base-ui/react';

interface InitialData {
    businessName: string;
    websiteUrl: string;
    externalLinks: string;
}

const STEPS = [
    {
        id: "name",
        label: "Business Name",
        question: "What is the name of your business?",
        description: "Your business name helps personalize your AI assistant and build trust with visitors.",
        icon: Building2,
        placeholder: "e.g Vybe",
        type: "text",
        field: "businessName" as keyof InitialData,
    },
    {
        id: "website",
        label: "Website",
        question: "What is the URL of your website?",
        description: "We will scrape data from your website to train your AI assistant. To answer the questions of the users",
        icon: Globe,
        placeholder: "eg. vybe-ev36.onrender.com",
        type: "url",
        field: "websiteUrl" as keyof InitialData,
    },
    {
        id: "link",
        label: "Extra Context",
        question: "Do you have any extra context or links you want to add?",
        description: "This will help your AI assistant provide more accurate responses And help him understand your business better and make a best.",
        icon: LinkIcon,
        placeholder: "eg. vybe-ev36.onrender.com/singup",
        type: "textarea",
        badge: "Optional",
        field: "externalLinks" as keyof InitialData,
    }
];

function InitialForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState<InitialData>({
        businessName: "",
        websiteUrl: "",
        externalLinks: "",
    });

    const progress = ((currentStep + 1) / STEPS.length) * 100;
    const stepData = STEPS[currentStep];
    const Icon = stepData.icon;
    const body = {
        type: "webdata",
        url:formData.websiteUrl
    }
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    const isStepValid =
        currentStep >= 2 ||
        (formData[stepData.field] && formData[stepData.field].trim() !== "");

    const handleNext = () => {
        if (isSubmitting) return;

        const currentField = STEPS[currentStep].field;
        const value = formData[currentField];

        if (currentStep < 2 && (!value || value.trim() === "")) return;

        if (currentStep < STEPS.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
                setIsAnimating(false);
            }, 300);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep((prev) => prev - 1);
                setIsAnimating(false);
            }, 300);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (STEPS[currentStep].type === 'textarea') {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                handleNext();
            }
            return;
        }

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const res = await fetch("/api/auth/data/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const response = await fetch('/api/knowledge/store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        await res.json();
        await response.json();
        setIsSubmitting(false);
        window.location.reload();
    };

    useEffect(() => {
        const t = setTimeout(() => {
            inputRef.current?.focus();
        }, 300);
        return () => clearTimeout(t);
    }, [currentStep]);

    return (
        <div className="w-full max-w-xl mx-auto min-h-[400px] flex flex-col justify-center relative">

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-white/5">
                <div
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className='fixed top-6 right-6 md:top-8 md:right-8 text-xs font-medium text-zinc-600 uppercase tracking-wide pointer-events-none'>
                setup your account
            </div>

            {isSubmitting ? (
                <div className='flex flex-col items-center justify-center text-center animate-in fade-in duration-700'>
                    <div className='relative mb-8'>
                        <div className='absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse' />
                        <div className='relative w-[64px] h-[64px] bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20'>
                            <Sparkles className='w-[32px] h-[32px] text-white animate-bounce' />
                        </div>
                    </div>
                    <h2 className='text-2xl font-medium text-white mb-2'>
                        Storing your organization information!
                    </h2>
                    <p className='text-zinc-500'>
                        Scanning {formData.websiteUrl}… It will take a few minutes.
                    </p>
                </div>
            ) : (
                <div
                    className={cn(
                        "transition-all duration-300 ease-in-out transform",
                        isAnimating
                            ? "opacity-0 translate-y-4 scale-95"
                            : "opacity-100 translate-y-0 scale-100"
                    )}
                >
                    <div className='flex items-center justify-between mb-8'>
                        <div className='flex items-center gap-2'>
                            {currentStep > 0 && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleBack}
                                    className="text-zinc-500 hover:text-zinc-300 hover:bg-white/5 rounded-full -ml-2 w-8 h-8"
                                >
                                    <ChevronLeft className='w-5 h-5' />
                                </Button>
                            )}

                            <span className='text-xs font-medium text-indigo-400 uppercase tracking-wide'>
                                Step {currentStep + 1} of {STEPS.length}
                            </span>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div className='space-y-2'>
                            <h1 className='text-3xl md:text-4xl font -medium text-white leading-tight'>
                                {stepData.question}
                            </h1>
                            <p className='text-lg text-zinc-500 font-light'>
                                {stepData.description}
                            </p>
                        </div>
                        <div className='relative group'>
                            {stepData.type === "textarea" ? (
                                <Textarea
                                    ref={inputRef as any}
                                    value={formData[stepData.field] as string}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [stepData.field]: e.target.value,
                                    })
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder={stepData.placeholder}
                                    className='w-full bg-transparent text-white placeholder:text-zinc-600 border border-zinc-800 rounded-xl px-4 py-3 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                                />
                            ) : (
                                <Input
                                    ref={inputRef as any}
                                    value={formData[stepData.field] as string}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [stepData.field]: e.target.value,
                                    })
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder={stepData.placeholder}
                                    className="w-full bg-transparent text-white placeholder:text-zinc-600 border border-zinc-800 rounded-xl px-4 py-3 outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                />
                            )}
                            <div className='absolute right-3 top-1/2 -translate-y-1/2 text-zin-600 pointer-events-none'>
                                <Icon className='w-6 h-6' />
                            </div>
                        </div>
                        <div className='flex items-center justify-between pt-8'>
                            <div className='hidden sm:flex items-center gap-2 text-xs text-gray-600'>
                                {stepData.type === "textarea" ? (
                                    <>
                                        <Command className='w-3 h-3' />
                                        <span>+ Enter</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Press Enter ↲</span>
                                    </>
                                )}
                                <span className='ml-1'>to continue</span>
                            </div>
                            <Button
                                onClick={handleNext}
                                disabled={!isStepValid}
                                className={cn("rounded-full px-5 py-6 text-base font-medium transition-all duration-300",
                                    !isStepValid ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                        : "bg-white text-black hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
                                )}>
                                {currentStep === STEPS.length - 1 ? "Finish" : "Continue"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default InitialForm;