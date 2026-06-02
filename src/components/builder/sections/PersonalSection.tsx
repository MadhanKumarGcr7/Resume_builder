'use client';

import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Mail, Phone, ExternalLink, GitBranch, Globe, MapPin, Briefcase, Sparkles } from 'lucide-react';

export default function PersonalSection() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const info = resume.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Full Name
          </Label>
          <Input 
            name="fullName" 
            placeholder="John Doe" 
            value={info.fullName} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" /> Professional Title
          </Label>
          <Input 
            name="role" 
            placeholder="Cloud Solution Architect" 
            value={info.role} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" /> Email
          </Label>
          <Input 
            name="email" 
            type="email" 
            placeholder="john@example.com" 
            value={info.email} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" /> Phone
          </Label>
          <Input 
            name="phone" 
            placeholder="+1 (555) 000-0000" 
            value={info.phone} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary" /> LinkedIn
          </Label>
          <Input 
            name="linkedin" 
            placeholder="linkedin.com/in/johndoe" 
            value={info.linkedin} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-primary" /> GitHub
          </Label>
          <Input 
            name="github" 
            placeholder="github.com/johndoe" 
            value={info.github} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" /> Portfolio
          </Label>
          <Input 
            name="portfolio" 
            placeholder="johndoe.com" 
            value={info.portfolio} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Location
          </Label>
          <Input 
            name="address" 
            placeholder="New York, NY" 
            value={info.address} 
            onChange={handleChange}
            className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Professional Summary
          </Label>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs gap-1 text-primary hover:bg-primary/10"
            onClick={async () => {
              if (!info.role) {
                toast.error("Please enter a job title first!");
                return;
              }
              const toastId = toast.loading("Generating professional summary...");
              try {
                const res = await fetch('/api/ai/generate', {
                  method: 'POST',
                  body: JSON.stringify({
                    type: 'summary',
                    data: { role: info.role, skills: resume.skills.map(s => s.name).join(', ') }
                  })
                });

                if (!res.ok) {
                  const errorText = await res.text();
                  throw new Error(errorText || "Failed to generate summary");
                }

                const data = await res.json();
                updatePersonalInfo({ summary: data.content });
                toast.success("Summary generated!", { id: toastId });
              } catch (err: any) {
                toast.error(err.message || "Something went wrong", { id: toastId });
              }
            }}
          >
            <Sparkles className="w-3 h-3" />
            AI Generate
          </Button>
        </div>
        <Textarea 
          name="summary" 
          placeholder="Write a brief overview of your professional background and key achievements..." 
          value={info.summary} 
          onChange={handleChange}
          rows={5}
          className="rounded-lg bg-secondary/20 border-none focus-visible:ring-primary/20 resize-none"
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Tip: Keep it concise (3-4 sentences) and highlight your core value proposition.
        </p>
      </div>
    </div>
  );
}
