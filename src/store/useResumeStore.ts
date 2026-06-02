import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Education {
  id: string;
  degree: string;
  institution: string;
  cgpa: string;
  startYear: string;
  endYear: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
}

export interface Skill {
  id: string;
  name: string;
  type: 'technical' | 'soft' | 'language';
}

export interface ResumeData {
  id?: string;
  title: string;
  personalInfo: {
    fullName: string;
    role: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
    address: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: string[];
  achievements: string[];
  metadata: {
    template: string;
    color: string;
    font: string;
    spacing: number;
  };
}

interface ResumeStore {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  updateMetadata: (metadata: Partial<ResumeData['metadata']>) => void;
}

const initialResume: ResumeData = {
  title: 'My Resume',
  personalInfo: {
    fullName: '',
    role: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    address: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  achievements: [],
  metadata: {
    template: 'minimal',
    color: '#3b82f6',
    font: 'inter',
    spacing: 1.0,
  },
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      setResume: (resume) => set({ resume }),
      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),
      addEducation: (edu) =>
        set((state) => ({
          resume: { ...state.resume, education: [...state.resume.education, edu] },
        })),
      updateEducation: (id, edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...edu } : e
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
          },
        })),
      addExperience: (exp) =>
        set((state) => ({
          resume: { ...state.resume, experience: [...state.resume.experience, exp] },
        })),
      updateExperience: (id, exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...exp } : e
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
          },
        })),
      addProject: (project) =>
        set((state) => ({
          resume: { ...state.resume, projects: [...state.resume.projects, project] },
        })),
      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? { ...p, ...project } : p
            ),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
          },
        })),
      addSkill: (skill) =>
        set((state) => ({
          resume: { ...state.resume, skills: [...state.resume.skills, skill] },
        })),
      removeSkill: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((s) => s.id !== id),
          },
        })),
      updateMetadata: (metadata) =>
        set((state) => ({
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, ...metadata },
          },
        })),
    }),
    {
      name: 'resume-storage',
    }
  )
);
