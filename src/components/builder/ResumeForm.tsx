'use client';

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import PersonalSection from './sections/PersonalSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import { User, GraduationCap, Briefcase, Code2, Award, Lightbulb } from 'lucide-react';

export default function ResumeForm() {
  return (
    <div className="pb-20">
      <Accordion type="single" collapsible defaultValue="personal" className="space-y-4">
        {/* Personal Details */}
        <AccordionItem value="personal" className="border-none bg-card rounded-2xl px-6 shadow-sm overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-6 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-base leading-none mb-1">Personal Details</h3>
                <p className="text-xs text-muted-foreground font-normal">Name, contact info, and summary</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 pt-2">
            <PersonalSection />
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education" className="border-none bg-card rounded-2xl px-6 shadow-sm overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-6 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-base leading-none mb-1">Education</h3>
                <p className="text-xs text-muted-foreground font-normal">Degree, institution, and years</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 pt-2">
            <EducationSection />
          </AccordionContent>
        </AccordionItem>

        {/* Experience */}
        <AccordionItem value="experience" className="border-none bg-card rounded-2xl px-6 shadow-sm overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-6 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-base leading-none mb-1">Work Experience</h3>
                <p className="text-xs text-muted-foreground font-normal">Roles, companies, and achievements</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 pt-2">
            <ExperienceSection />
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills" className="border-none bg-card rounded-2xl px-6 shadow-sm overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-6 group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-base leading-none mb-1">Skills</h3>
                <p className="text-xs text-muted-foreground font-normal">Technical and soft skills</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-8 pt-2">
            <SkillsSection />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
