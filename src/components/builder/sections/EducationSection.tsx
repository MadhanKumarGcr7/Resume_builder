'use client';

import { useResumeStore, Education } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap, Calendar, School } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function EducationSection() {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const education = resume.education;

  const handleAdd = () => {
    addEducation({
      id: uuidv4(),
      degree: '',
      institution: '',
      cgpa: '',
      startYear: '',
      endYear: '',
    });
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {education.map((edu, index) => (
        <Card key={edu.id} className="border-none bg-secondary/10 overflow-hidden group">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Entry #{index + 1}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <GraduationCap className="w-3 h-3" /> Degree / Field of Study
                </Label>
                <Input 
                  placeholder="B.Tech Computer Science" 
                  value={edu.degree} 
                  onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <School className="w-3 h-3" /> Institution
                </Label>
                <Input 
                  placeholder="MIT University" 
                  value={edu.institution} 
                  onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Start Year
                </Label>
                <Input 
                  placeholder="2020" 
                  value={edu.startYear} 
                  onChange={(e) => handleChange(edu.id, 'startYear', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> End Year (or Expected)
                </Label>
                <Input 
                  placeholder="2024" 
                  value={edu.endYear} 
                  onChange={(e) => handleChange(edu.id, 'endYear', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs">CGPA / Percentage</Label>
                <Input 
                  placeholder="3.8/4.0 or 85%" 
                  value={edu.cgpa} 
                  onChange={(e) => handleChange(edu.id, 'cgpa', e.target.value)}
                  className="rounded-lg bg-background border-none h-9 text-sm"
                />
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
        Add Education Entry
      </Button>
    </div>
  );
}
