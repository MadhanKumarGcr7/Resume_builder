'use client';

import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const templates = [
  { id: 'minimal', name: 'Minimal' },
  { id: 'professional', name: 'Professional' },
  { id: 'creative', name: 'Creative' },
];

const colors = [
  { id: '#3b82f6', name: 'Blue', value: '#3b82f6' },
  { id: '#10b981', name: 'Green', value: '#10b981' },
  { id: '#8b5cf6', name: 'Purple', value: '#8b5cf6' },
  { id: '#ef4444', name: 'Red', value: '#ef4444' },
  { id: '#1f2937', name: 'Dark', value: '#1f2937' },
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'outfit', name: 'Outfit' },
];

export default function TemplateSelector() {
  const { resume: { metadata }, updateMetadata } = useResumeStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Templates Section */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Templates</h3>
          <p className="text-sm text-muted-foreground">Choose a layout style for your resume.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              onClick={() => updateMetadata({ template: tpl.id })}
              className={cn(
                "cursor-pointer rounded-xl border-2 p-4 text-center transition-all hover:bg-secondary/50",
                metadata.template === tpl.id ? "border-primary bg-primary/5" : "border-border/50 bg-card"
              )}
            >
              <div className="w-full aspect-[1/1.4] bg-secondary/30 rounded-lg mb-3 shadow-inner flex flex-col p-2 gap-1 overflow-hidden relative">
                {/* Simulated mini layout */}
                <div className="w-full h-3 bg-secondary rounded" />
                <div className="w-3/4 h-2 bg-secondary rounded" />
                <div className="w-full flex-1 flex gap-2 mt-2">
                  <div className="w-1/3 h-full bg-secondary/50 rounded flex flex-col gap-1 p-1">
                    <div className="w-full h-1 bg-secondary rounded" />
                    <div className="w-4/5 h-1 bg-secondary rounded" />
                  </div>
                  <div className="flex-1 h-full bg-secondary/50 rounded flex flex-col gap-1 p-1">
                    <div className="w-full h-2 bg-secondary rounded" />
                    <div className="w-full h-1 bg-secondary rounded" />
                    <div className="w-full h-1 bg-secondary rounded" />
                  </div>
                </div>
                {metadata.template === tpl.id && (
                  <div className="absolute top-2 right-2 p-1 bg-primary text-white rounded-full">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <span className="font-medium text-sm">{tpl.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Theme Color Section */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Theme Color</h3>
          <p className="text-sm text-muted-foreground">Select an accent color.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => updateMetadata({ color: color.value })}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm",
                metadata.color === color.value ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:scale-110"
              )}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {metadata.color === color.value && <Check className="w-5 h-5 text-white" />}
            </button>
          ))}
        </div>
      </section>

      {/* Fonts Section */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Typography</h3>
          <p className="text-sm text-muted-foreground">Select the font family.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {fonts.map((font) => (
            <Button
              key={font.id}
              variant={metadata.font === font.id ? "default" : "outline"}
              className="h-12 w-full font-medium"
              onClick={() => updateMetadata({ font: font.id })}
              style={{ fontFamily: `var(--font-${font.id})` }}
            >
              {font.name}
            </Button>
          ))}
        </div>
      </section>
      
    </div>
  );
}
