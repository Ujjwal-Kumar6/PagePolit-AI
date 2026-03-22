import { Button } from "@/components/ui/button";
import { Globe, Upload, FileText } from "lucide-react";
import React from "react";

const QuickActions = ({
    onModal,
}: {
    onModal: (tab: string) => void;
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button
                variant="outline"
                className="h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/20 hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal"
                onClick={() => onModal("website")}
            >
                <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                    <Globe className="w-6 h-6 text-indigo-400"/>
                </div>
                <div className="space-y-1.5 text-center w-full">
                    <span className="text-sm font-medium block whitespace-normal">
                        Add Website
                    </span>
                </div>
            </Button>
            
            <Button
                variant="outline"
                className="h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/20 hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal"
                onClick={() => onModal("upload")}
            >
                <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                    <Upload className="w-6 h-6 text-indigo-400"/>
                </div>
                <div className="space-y-1.5 text-center w-full">
                    <span className="text-sm font-medium block whitespace-normal">
                        Upload Files
                    </span>
                </div>
            </Button>

            <Button
                variant="outline"
                className="h-auto py-8 px-6 flex flex-col items-center justify-center gap-4 border-white/5 bg-[#0A0A0E] hover:bg-white/20 hover:border-indigo-500/30 transition-all hover:text-white group whitespace-normal"
                onClick={() => onModal("text")}
            >
                <div className="p-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                    <FileText className="w-6 h-6 text-indigo-400"/>
                </div>
                <div className="space-y-1.5 text-center w-full">
                    <span className="text-sm font-medium block whitespace-normal">
                        Add Text
                    </span>
                </div>
            </Button>
        </div>
    );
};

export default QuickActions;