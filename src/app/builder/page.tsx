'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import ResumeForm from '@/components/builder/ResumeForm';
import ResumePreview from '@/components/builder/ResumePreview';
import TemplateSelector from '@/components/builder/TemplateSelector';
import BuilderHeader from '@/components/builder/BuilderHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const A4_PX = 794; // 210mm at 96 dpi

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState('editor');
  const previewRef = useRef<HTMLDivElement>(null);
  const previewPanelRef = useRef<HTMLDivElement>(null);

  /** Recalculate --resume-scale whenever the panel resizes */
  const updateScale = useCallback(() => {
    const panel = previewPanelRef.current;
    if (!panel) return;
    const availableWidth = panel.clientWidth - 48; // 24px padding each side
    const scale = Math.min(1, availableWidth / A4_PX);
    panel.style.setProperty('--resume-scale', String(scale.toFixed(4)));
  }, []);

  useEffect(() => {
    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (previewPanelRef.current) ro.observe(previewPanelRef.current);
    return () => ro.disconnect();
  }, [updateScale]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-secondary/20">
      <BuilderHeader previewRef={previewRef} />

      <main className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
        {/* ── Left panel: editor / templates ── */}
        <div className="w-full md:w-[420px] lg:w-[460px] xl:w-[500px] shrink-0 h-full flex flex-col bg-background border-r border-border/50">
          <Tabs
            defaultValue="editor"
            className="flex-1 flex flex-col pt-2 min-h-0"
            onValueChange={setActiveTab}
          >
            <div className="px-4 pb-2 shrink-0">
              <TabsList className="grid w-full grid-cols-2 rounded-xl h-11 bg-secondary/50">
                <TabsTrigger value="editor" className="rounded-lg text-sm font-medium">
                  Editor
                </TabsTrigger>
                <TabsTrigger value="templates" className="rounded-lg text-sm font-medium">
                  Templates
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="editor" className="flex-1 overflow-hidden mt-0 min-h-0">
              <ScrollArea className="h-full px-4 py-3">
                <ResumeForm />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="templates" className="flex-1 overflow-hidden mt-0 min-h-0">
              <ScrollArea className="h-full px-4 py-3">
                <TemplateSelector />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* ── Right panel: live preview ── */}
        <div
          ref={previewPanelRef}
          className="hidden md:flex flex-1 h-full min-w-0 overflow-hidden"
        >
          <ResumePreview ref={previewRef} />
        </div>
      </main>
    </div>
  );
}
