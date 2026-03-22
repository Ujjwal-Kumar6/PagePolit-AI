import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import React from 'react';

interface SectionTableProps {
    sections: Section[];
    isLoading: boolean;
    onPreview: (section: Section) => void;
    onCreateSection: () => void;
}

const STATUS_STYLES: Record<Section['status'], string> = {
    draft:    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    active:   'bg-green-500/10 text-green-400 border border-green-500/20',   // ✅ Fixed: was 'published'
    disabled: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
};

function SectionTable({ sections, isLoading, onPreview, onCreateSection }: SectionTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Name
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Sources
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Tone
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500">
                        Status
                    </TableHead>
                    <TableHead className="text-xs uppercase font-medium text-zinc-500 text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-48 text-center">
                            <div className="flex items-center justify-center gap-2 text-zinc-400">
                                <svg
                                    className="animate-spin h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12" cy="12" r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                <span className="text-sm">Loading sections...</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : sections.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-48 text-center">
                            <div className="flex flex-col items-center justify-center gap-3">
                                <p className="text-sm text-zinc-500">No sections yet</p>
                                <button
                                    onClick={onCreateSection}
                                    className="text-xs px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/10 transition-colors"
                                >
                                    + Create your first section
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : (
                    sections.map((section) => (
                        <TableRow
                            key={section.id}
                            className="border-white/5 hover:bg-white/[0.02] transition-colors"
                        >
                            <TableCell className="font-medium text-zinc-100 text-sm">
                                {section.name}
                            </TableCell>
                            <TableCell className="text-zinc-400 text-sm">
                                {section.sourceCount} {/* ✅ Fixed: was section.sources */}
                            </TableCell>
                            <TableCell className="text-zinc-400 text-sm capitalize">
                                {section.tone}
                            </TableCell>
                            <TableCell>
                                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[section.status]}`}>
                                    {section.status}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <button
                                    onClick={() => onPreview(section)}
                                    className="text-xs px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-white/10 transition-colors"
                                >
                                    Preview
                                </button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}

export default SectionTable;