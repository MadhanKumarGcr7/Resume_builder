'use client';

import { Button } from '@/components/ui/button';
import {
  Download,
  Share2,
  Save,
  ArrowLeft,
  CloudCheck,
  LayoutTemplate,
  Palette,
  Type,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';
import { RefObject } from 'react';

interface BuilderHeaderProps {
  previewRef: RefObject<HTMLDivElement | null>;
}

export default function BuilderHeader({ previewRef }: BuilderHeaderProps) {
  // react-to-print v3: use contentRef prop
  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: 'Resume',
  });

  const handleSave = () => {
    toast.success('Resume saved successfully!');
  };

  return (
    <header className="h-16 border-b border-border/50 bg-background flex items-center justify-between px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight">
            Resumify<span className="text-primary italic">AI</span>
          </span>
          <span className="text-border mx-2">|</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CloudCheck className="w-4 h-4 text-green-500" />
            <span>Autosaved</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-lg p-1 mr-4">
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <LayoutTemplate className="w-4 h-4" />
            Templates
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <Palette className="w-4 h-4" />
            Design
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-xs">
            <Type className="w-4 h-4" />
            Fonts
          </Button>
        </div>

        <Button variant="outline" size="sm" className="gap-2 px-4 rounded-lg">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button
          size="sm"
          className="gap-2 px-4 rounded-lg bg-primary hover:bg-primary/90"
          onClick={handleSave}
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="gap-2 px-4 rounded-lg"
          onClick={() => handlePrint()}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>
    </header>
  );
}
