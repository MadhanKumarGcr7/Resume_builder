'use client';

import { useResumeStore, Experience } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Briefcase, Calendar, Building2, ListChecks, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ExperienceSection() {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore();
  const experience = resume.experience;

  const handleAdd = () => {
    addExperience({
      id: uuidv4(),
      company: '',
      role: '',
      duration: '',
      achievements: [''],
    });
  };

  const handleChange = (id: string, field: keyof Experience, value: any) => {
    updateExperience(id, { [field]: value });
  };

  const handleAchievementChange = (id: string, index: number, value: string) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      const newAchievements = [...exp.achievements];
      newAchievements[index] = value;
      updateExperience(id, { achievements: newAchievements });
    }
  };

  const addAchievement = (id: string) => {
    const exp = experience.find(e => e.id === id);
    if (exp) {
      updateExperience(id, { achievements: [...exp.achievements, ''] });
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const exp = experience.find(e => e.id === id);
    if (exp && exp.achievements.length > 1) {
      const newAchievements = exp.achievements.filter((_, i) => i !== index);
      updateExperience(id, { achievements: newAchievements });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {experience.map((exp, index) => (
        <Card key={exp.id} className="border-none bg-secondary/10 overflow-hidden group">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Position #{index + 1}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <Briefcase className="w-3 h-3" /> Job Role
                </Label>
                <Input 
                  placeholder="Software Engineer" 
                  value={exp.role} 
                  onChange={(e) => handleChange(exp.id, 'role', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <Building2 className="w-3 h-3" /> Company Name
                </Label>
                <Input 
                  placeholder="Google Inc." 
                  value={exp.company} 
                  onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Duration (Role Period)
                </Label>
                <Input 
                  placeholder="Jan 2022 - Present" 
                  value={exp.duration} 
                  onChange={(e) => handleChange(exp.id, 'duration', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-xs flex items-center gap-2 font-semibold">
                    <ListChecks className="w-3 h-3" /> Achievements & Responsibilities
                  </Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-[10px] gap-1 text-primary hover:bg-primary/10"
                    onClick={async () => {
                      if (!exp.role || !exp.achievements[0]) {
                        toast.error("Please enter a role and at least one achievement to improve.");
                        return;
                      }
                      const toastId = toast.loading("Improving achievements with AI...");
                      try {
                        const res = await fetch('/api/ai/generate', {
                          method: 'POST',
                          body: JSON.stringify({
                            type: 'bullet-points',
                            data: { role: exp.role, text: exp.achievements.join('. ') }
                          })
                        });
                        
                        if (!res.ok) {
                          const errorText = await res.text();
                          throw new Error(errorText || "Failed to generate points");
                        }

                        const data = await res.json();
                        // Parse bullet points from text response (assumes AI returns "- point 1\n- point 2")
                        const parsedBullets = data.content
                          .split('\n')
                          .map((line: string) => line.replace(/^[-*•]\s*/, '').trim())
                          .filter((line: string) => line.length > 5);

                        if (parsedBullets.length > 0) {
                          updateExperience(exp.id, { achievements: parsedBullets });
                          toast.success("Achievements enhanced!", { id: toastId });
                        } else {
                          throw new Error("AI returned an empty response.");
                        }
                      } catch (err: any) {
                        toast.error(err.message || "Something went wrong", { id: toastId });
                      }
                    }}
                  >
                    <Sparkles className="w-3 h-3" /> AI Improve
                  </Button>
                </div>
                
                {exp.achievements.map((achievement, aIndex) => (
                  <div key={aIndex} className="flex gap-2">
                    <Textarea 
                      placeholder={`Achievement #${aIndex + 1}...`}
                      value={achievement}
                      onChange={(e) => handleAchievementChange(exp.id, aIndex, e.target.value)}
                      className="rounded-lg bg-background border-none min-h-[60px] text-xs resize-none"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="shrink-0 text-muted-foreground hover:text-destructive h-8 w-8 mt-1"
                      onClick={() => removeAchievement(exp.id, aIndex)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full h-8 border border-dashed border-border text-[10px] hover:bg-primary/5 rounded-lg"
                  onClick={() => addAchievement(exp.id)}
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Achievement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button 
        variant="outline" 
        className="w-full h-12 border-dashed border-2 hover:bg-primary/5 hover:border-primary/50 transition-all rounded-xl gap-2"
        onClick={handleAdd}
      >
        <Plus className="w-4 h-4" />
        Add Experience Position
      </Button>
    </div>
  );
}
