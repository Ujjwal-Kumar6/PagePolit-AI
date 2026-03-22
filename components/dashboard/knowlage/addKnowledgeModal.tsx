import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Globe, Loader2, Plus, Upload } from 'lucide-react';
import React, { useState } from 'react';

interface KnowledgeSource {
  type: string;
  source_url?: string;
  title?: string;
}

interface AddKnowledgeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultTab: string;
  setDefaultTab: (tab: string) => void;
  onImport: (data: any) => Promise<void>;
  isLoding: boolean;
  existingSources: KnowledgeSource[];
}

function AddKnowledgeModal({
  isOpen,
  setIsOpen,
  defaultTab,
  setDefaultTab,
  onImport,
  isLoding,
  existingSources
}: AddKnowledgeModalProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [docsTitle, setDocsTitle] = useState('');
  const [docsContent, setDocsContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return ["http:", "https:"].includes(parsed.protocol);
    } catch (e) {
      return false;
    }
  };

  const handle = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const data: any = { type: defaultTab };

      if (defaultTab === 'webdata') {
        if (!websiteUrl) {
          setError('Please enter a URL');
          setIsLoading(false);
          return;
        }
        if (!validateUrl(websiteUrl)) {
          setError('Please enter a valid URL which contain "https" or "http"');
          setIsLoading(false);
          return;
        }
        const normalizedInput = websiteUrl.replace(/\/$/, "");
        const exists = existingSources.some((source) => {
          if (source.type !== 'website' || !source.source_url) return false;
          const normalizedSourceUrl = source.source_url.replace(/\/$/, "");
          return normalizedSourceUrl === normalizedInput;
        });
        if (exists) {
          setError('This website already exists in your knowledge base');
          setIsLoading(false);
          return;
        }
        data.url = websiteUrl;
      } else if (defaultTab === 'text') {
        if (!docsTitle.trim()) {
          setError('Please enter a title');
          setIsLoading(false);
          return;
        }
        if (!docsContent.trim()) {
          setError('Please enter content');
          setIsLoading(false);
          return;
        }
        data.title = docsTitle;
        data.content = docsContent;
      } else if (defaultTab === 'upload') {
        if (!uploadFile) {
          setError('Please select a file to upload');
          setIsLoading(false);
          return;
        }
        data.file = uploadFile;
      }

      await onImport(data);

      // Reset form on success
      setWebsiteUrl('');
      setDocsTitle('');
      setDocsContent('');
      setUploadFile(null);
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setError(null);
      }}
    >
      <DialogContent className='sm:max-w-[600px] bg-[#0E0E12] border-white/10 text-zinc-100 p-0 overflow-hidden gap-0'>
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle>Add New Source</DialogTitle>
          <DialogDescription className='text-zinc-500'>
            Choose a content type to add to your knowledge base.
          </DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue='website'
          value={defaultTab}
          onValueChange={(value) => {
            setDefaultTab(value);
            setError(null);
          }}
          className='w-full'
        >
          <div className='px-6 border-b border-white/5'>
            <TabsList className='bg-transparent h-auto p-0 gap-6'>
              <TabsTrigger
                value='webdata'
                className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ring-0 outline-none border-t-0 border-x-0'
              >
                website
              </TabsTrigger>
              <TabsTrigger
                value='text'
                className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ring-0 outline-none border-t-0 border-x-0'
              >
                Text
              </TabsTrigger>
              <TabsTrigger
                value='upload'
                className='data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none px-0 py-3 text-xs uppercase tracking-wider text-zinc-500 data-[state=active]:text-white transition-all focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ring-0 outline-none border-t-0 border-x-0'
              >
                File Upload
              </TabsTrigger>
            </TabsList>
          </div>
          <div className='p-6 min-h-[200px] space-y-4'>
            {error && (
              <Alert variant='destructive' className='bg-red-500/10 border-red-500/20 text-red-400 '>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <TabsContent value='webdata' className='mt-0 space-y-4 animate-in fade-in duration-300'>
              <div className='p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex flex-col items-center gap-3'>
                <Globe className='w-5 h-5 shrink-0' />
                <p>Add a website URL to provide the knowlage of your website to the AI.</p>
                <p>To add a website, paste the URL below and click "Add".</p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='url'>Website URL</Label>
                <Input
                  id='url'
                  type='url'
                  placeholder='https://site.com'
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className='bg-zinc-800 border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500'
                />
              </div>
              <Button
                onClick={handle}
                disabled={isLoading}
                className='w-full bg-indigo-500 hover:bg-indigo-600'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Website
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value='text' className='mt-0 space-y-4 animate-in fade-in duration-300'>
              <div className='p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm flex flex-col items-center gap-3'>
                <FileText className='w-5 h-5 shrink-0' />
                <p>Add a text to provide the knowlage of your website to the AI.</p>
                <p>To add a text, paste the content below and click "Add".</p>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='text'
                  type='text'
                  placeholder='What is PagePilot AI?'
                  value={docsTitle}
                  onChange={(e) => setDocsTitle(e.target.value)}
                  className='bg-zinc-800 border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500'
                />
                <Label htmlFor='content'>Content</Label>
                <Textarea
                  placeholder='It is a website Which help you to create a AI chatbot for your website'
                  value={docsContent}
                  onChange={(e) => setDocsContent(e.target.value)}
                  className='bg-zinc-800 border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-indigo-500'
                />
              </div>
              <Button
                onClick={handle}
                disabled={isLoading}
                className='w-full bg-indigo-500 hover:bg-indigo-600'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className='w-4 h-4 mr-2' />
                    Add Text
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value='upload' className='mt-0 space-y-4 animate-in fade-in duration-300'>
              <input
                type="file"
                id="csv-file-input"
                accept='.csv,text/csv'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 10 * 1024 * 1024) {
                      setError("File size should be less than 10MB");
                      return;
                    }
                    //validate fiel type
                    if (
                      !file.name.endsWith('.csv') ||
                      file.type !== 'text/csv'
                    ) {
                      setError("Please upload a valid CSV file");
                      return;
                    }
                    setUploadFile(file);
                    setError(null);
                  }
                }}
              />
              <div
                className='boreder-2 border-dashed border-zinc-700 rounded-lg p-8 text-center cursor-pointer bg-zinc-800 hover:border-indigo-500'
                onClick={() => {
                  document.getElementById("csv-file-input")?.click();
                }}
              >
                <Upload className='w-8 h-8 mx-auto mb-2 text-zinc-400' />
                <p className='text-zinc-400'>Click to upload or drag and drop</p>
                <p className='text-sm text-zinc-500'>CSV (max. 10MB)</p>
              </div>
              <Button
                onClick={handle}
                disabled={isLoading}
                className='w-full bg-indigo-500 hover:bg-indigo-600'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Adding...
                  </>
                ) : (
                  <>
                    <Upload className='w-4 h-4 mr-2' />
                    Add File
                  </>
                )}
              </Button>
            </TabsContent>
          </div>

          <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className='text-zinc-400 hover:text-white hover:bg-white/5'>
              Cancel
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AddKnowledgeModal;