'use client';

import { useState } from 'react';
import { useResumeStore, Skill } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Plus, X, Code2, BrainCircuit, Languages, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function SkillsSection() {
  const { resume, addSkill, removeSkill } = useResumeStore();
  const [inputValue, setInputValue] = useState('');
  const [activeType, setActiveType] = useState<Skill['type']>('technical');
  const role = resume.personalInfo.role;

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      addSkill({
        id: uuidv4(),
        name: inputValue.trim(),
        type: activeType,
      });
      setInputValue('');
    }
  };

  const skillsForType = (type: Skill['type']) => 
    resume.skills.filter(s => s.type === type);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex bg-secondary/20 p-1 rounded-xl">
        {[
          { id: 'technical', icon: Code2, label: 'Technical' },
          { id: 'soft', icon: BrainCircuit, label: 'Soft' },
          { id: 'language', icon: Languages, label: 'Languages' },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id as Skill['type'])}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all ${
              activeType === type.id 
                ? 'bg-background shadow-sm text-primary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <type.icon className="w-3.5 h-3.5" />
            {type.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleAddSkill} className="flex gap-2">
        <div className="relative flex-1">
          <Input 
            placeholder={`Add ${activeType} skill (e.g. ${activeType === 'technical' ? 'React' : activeType === 'soft' ? 'Leadership' : 'English'})...`} 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded-lg bg-secondary/10 border-none h-11 pr-12 focus-visible:ring-primary/20"
          />
          <Button 
            type="submit"
            size="icon" 
            className="absolute right-1 top-1 h-9 w-9 rounded-lg"
            disabled={!inputValue.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button 
          type="button"
          variant="outline"
          className="h-11 px-4 gap-2 text-primary border-primary/20 hover:bg-primary/10 rounded-lg"
          onClick={async () => {
            if (!role) {
              toast.error("Please set a Professional Title in the Personal section first!");
              return;
            }
            const toastId = toast.loading("Suggesting skills...");
            try {
              const res = await fetch('/api/ai/generate', {
                method: 'POST',
                body: JSON.stringify({
                  type: 'skills-suggestion',
                  data: { role }
                })
              });
              
              if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Failed to generate skills");
              }

              const data = await res.json();
              const suggestedSkills = data.content.split(',').map((s: string) => s.trim()).filter(Boolean);
              
              suggestedSkills.forEach((skillName: string) => {
                if (!resume.skills.find(s => s.name.toLowerCase() === skillName.toLowerCase())) {
                  addSkill({ id: uuidv4(), name: skillName, type: activeType });
                }
              });
              
              toast.success("Skills appended!", { id: toastId });
            } catch (err: any) {
              toast.error(err.message || "Failed to suggest skills", { id: toastId });
            }
          }}
        >
          <Sparkles className="w-4 h-4" /> Suggest
        </Button>
      </form>

      <div className="space-y-4">
        {['technical', 'soft', 'language'].map((type) => {
          const typeSkills = skillsForType(type as Skill['type']);
          if (typeSkills.length === 0) return null;
          
          return (
            <div key={type} className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-1">
                {type} Skills
              </Label>
              <div className="flex flex-wrap gap-2">
                {typeSkills.map((skill) => (
                  <Badge 
                    key={skill.id} 
                    variant="secondary" 
                    className="pl-3 pr-1 py-1 rounded-full bg-primary/5 hover:bg-primary/10 border-primary/10 text-foreground transition-all group"
                  >
                    {skill.name}
                    <button 
                      onClick={() => removeSkill(skill.id)}
                      className="ml-2 hover:bg-destructive hover:text-white rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
