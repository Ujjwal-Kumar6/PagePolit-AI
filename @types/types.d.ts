type SourceType = "website" | "docs" | "upload" | "text";
type SourceStatus = "active" | "traning" | "error" | "excluded";
type SectionStatus = "active" | "draft" | "disabled";
type Tone = "strict" | "neutral" | "friendly" | "empathetic"

interface KnowledgeSource {
    id: string;
    user_email:string;
    type: string;
    name: string;
    status: string;
    source_url: string | null;
    content: string | null;
    web_data: string | null;
    last_updated: string | null;
    created_at: string | null;
}


interface Section {
    id: string;
    name: string;
    description: string;
    sourceCount: number;       // ✅ Fixed: was "sources"
    source_ids?: string[];
    tone: Tone;
    scopeLabel?: string;
    status:SectionStatus; // ✅ Fixed: added 'active', replaced 'published'
}