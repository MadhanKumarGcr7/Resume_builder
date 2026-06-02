'use client';

import { forwardRef } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

/** Inline GitHub brand icon (lucide-react v1+ removed brand icons) */
const Github = ({ size = 9 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

/** Inline LinkedIn brand icon */
const Linkedin = ({ size = 9 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─────────────────────────────────────────────
   MINIMAL TEMPLATE  (clean, ATS-friendly)
───────────────────────────────────────────── */
const MinimalTemplate = ({ resume }: { resume: ReturnType<typeof useResumeStore>['resume'] }) => {
  const { personalInfo, education, experience, projects, skills, metadata } = resume;
  const accent = metadata.color || '#2563eb';

  return (
    <div style={{ padding: '36px 44px', fontFamily: 'inherit', color: '#111' }}>
      {/* Header */}
      <div style={{ borderBottom: `2.5px solid ${accent}`, paddingBottom: '14px', marginBottom: '18px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', textTransform: 'uppercase', marginBottom: '3px' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '12px', fontWeight: 600, color: accent, marginBottom: '10px' }}>
          {personalInfo.role || 'Professional Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
          {personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#555' }}>
              <Mail size={9} />{personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#555' }}>
              <Phone size={9} />{personalInfo.phone}
            </span>
          )}
          {personalInfo.address && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#555' }}>
              <MapPin size={9} />{personalInfo.address}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#555' }}>
              <Linkedin size={9} />{personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#555' }}>
              <Github size={9} />{personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#555' }}>
              <Globe size={9} />{personalInfo.portfolio}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <Section title="Professional Summary" accent={accent}>
          <p style={{ fontSize: '10px', lineHeight: 1.7, color: '#333' }}>{personalInfo.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience" accent={accent}>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{exp.role || 'Role'}</span>
                <span style={{ fontSize: '9px', color: '#666' }}>{exp.duration}</span>
              </div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: accent, marginBottom: '4px' }}>{exp.company || 'Company'}</div>
              <ul style={{ paddingLeft: '14px', margin: 0 }}>
                {exp.achievements.map((a, i) => (
                  <li key={i} style={{ fontSize: '9.5px', color: '#333', lineHeight: 1.6, marginBottom: '1px' }}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects" accent={accent}>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{proj.title || 'Project'}</span>
                <span style={{ fontSize: '9px', color: '#666', fontStyle: 'italic' }}>{proj.techStack}</span>
              </div>
              <p style={{ fontSize: '9.5px', color: '#333', lineHeight: 1.6, margin: '3px 0' }}>{proj.description}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {proj.githubLink && <a href={proj.githubLink} style={{ fontSize: '9px', color: accent }}>GitHub ↗</a>}
                {proj.liveLink && <a href={proj.liveLink} style={{ fontSize: '9px', color: accent }}>Live Demo ↗</a>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" accent={accent}>
          {education.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{edu.degree || 'Degree'}</div>
                <div style={{ fontSize: '10px', color: '#444' }}>{edu.institution || 'Institution'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '9px', color: '#666' }}>{edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}</div>
                {edu.cgpa && <div style={{ fontSize: '9px', color: '#888', fontStyle: 'italic' }}>CGPA: {edu.cgpa}</div>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills" accent={accent}>
          {(['technical', 'soft', 'language'] as const).map((type) => {
            const list = skills.filter((s) => s.type === type);
            if (!list.length) return null;
            return (
              <div key={type} style={{ display: 'flex', gap: '6px', marginBottom: '4px', fontSize: '10px' }}>
                <span style={{ fontWeight: 700, minWidth: '72px', textTransform: 'capitalize', color: '#111' }}>{type}:</span>
                <span style={{ color: '#333' }}>{list.map((s) => s.name).join(' • ')}</span>
              </div>
            );
          })}
        </Section>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROFESSIONAL TEMPLATE  (classic two-column header)
───────────────────────────────────────────── */
const ProfessionalTemplate = ({ resume }: { resume: ReturnType<typeof useResumeStore>['resume'] }) => {
  const { personalInfo, education, experience, projects, skills, metadata } = resume;
  const accent = metadata.color || '#1e40af';

  return (
    <div style={{ padding: '40px 48px', fontFamily: 'inherit', color: '#111' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '16px', borderBottom: `3px solid ${accent}`, marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '13px', fontWeight: 500, color: accent }}>{personalInfo.role || 'Professional Title'}</p>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {personalInfo.email && <span style={{ fontSize: '9px', color: '#555' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ fontSize: '9px', color: '#555' }}>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span style={{ fontSize: '9px', color: '#555' }}>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span style={{ fontSize: '9px', color: '#555' }}>{personalInfo.github}</span>}
          {personalInfo.address && <span style={{ fontSize: '9px', color: '#555' }}>{personalInfo.address}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '10px', lineHeight: 1.75, color: '#444', borderLeft: `3px solid ${accent}`, paddingLeft: '10px' }}>{personalInfo.summary}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '28px' }}>
        {/* Left column */}
        <div style={{ flex: '0 0 58%' }}>
          {experience.length > 0 && (
            <ProSection title="Experience" accent={accent}>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{exp.role || 'Role'}</span>
                    <span style={{ fontSize: '9px', color: '#666' }}>{exp.duration}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: accent, fontWeight: 600, marginBottom: '4px' }}>{exp.company}</div>
                  <ul style={{ paddingLeft: '13px', margin: 0 }}>
                    {exp.achievements.map((a, i) => (
                      <li key={i} style={{ fontSize: '9.5px', color: '#333', lineHeight: 1.6 }}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ProSection>
          )}

          {projects.length > 0 && (
            <ProSection title="Projects" accent={accent}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{proj.title}</span>
                    <span style={{ fontSize: '9px', fontStyle: 'italic', color: '#666' }}>{proj.techStack}</span>
                  </div>
                  <p style={{ fontSize: '9.5px', color: '#333', lineHeight: 1.6, margin: '3px 0' }}>{proj.description}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {proj.githubLink && <a href={proj.githubLink} style={{ fontSize: '9px', color: accent }}>GitHub ↗</a>}
                    {proj.liveLink && <a href={proj.liveLink} style={{ fontSize: '9px', color: accent }}>Live Demo ↗</a>}
                  </div>
                </div>
              ))}
            </ProSection>
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: 1 }}>
          {education.length > 0 && (
            <ProSection title="Education" accent={accent}>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{edu.degree || 'Degree'}</div>
                  <div style={{ fontSize: '10px', color: '#444' }}>{edu.institution}</div>
                  <div style={{ fontSize: '9px', color: '#666' }}>{edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}</div>
                  {edu.cgpa && <div style={{ fontSize: '9px', color: '#888', fontStyle: 'italic' }}>CGPA: {edu.cgpa}</div>}
                </div>
              ))}
            </ProSection>
          )}

          {skills.length > 0 && (
            <ProSection title="Skills" accent={accent}>
              {(['technical', 'soft', 'language'] as const).map((type) => {
                const list = skills.filter((s) => s.type === type);
                if (!list.length) return null;
                return (
                  <div key={type} style={{ marginBottom: '6px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'capitalize', color: '#333', marginBottom: '3px' }}>{type}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {list.map((s) => (
                        <span key={s.id} style={{ fontSize: '8.5px', padding: '2px 6px', border: `1px solid ${accent}30`, borderRadius: '4px', color: '#444', backgroundColor: `${accent}08` }}>
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </ProSection>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CREATIVE TEMPLATE  (colored sidebar)
───────────────────────────────────────────── */
const CreativeTemplate = ({ resume }: { resume: ReturnType<typeof useResumeStore>['resume'] }) => {
  const { personalInfo, education, experience, projects, skills, metadata } = resume;
  const accent = metadata.color || '#7c3aed';

  return (
    <div style={{ display: 'flex', minHeight: '297mm', fontFamily: 'inherit' }}>
      {/* Sidebar */}
      <div style={{ width: '32%', backgroundColor: accent, padding: '36px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Name block */}
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: '6px' }}>
            {(personalInfo.fullName || 'Your Name').split(' ').map((n, i) => <div key={i}>{n}</div>)}
          </h1>
          <p style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{personalInfo.role || 'Professional Title'}</p>
        </div>

        {/* Contact */}
        <div>
          <SidebarSectionTitle>Contact</SidebarSectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {personalInfo.email && <SidebarItem icon={<Mail size={9} />}>{personalInfo.email}</SidebarItem>}
            {personalInfo.phone && <SidebarItem icon={<Phone size={9} />}>{personalInfo.phone}</SidebarItem>}
            {personalInfo.address && <SidebarItem icon={<MapPin size={9} />}>{personalInfo.address}</SidebarItem>}
            {personalInfo.linkedin && <SidebarItem icon={<Linkedin size={9} />}>{personalInfo.linkedin}</SidebarItem>}
            {personalInfo.github && <SidebarItem icon={<Github size={9} />}>{personalInfo.github}</SidebarItem>}
            {personalInfo.portfolio && <SidebarItem icon={<Globe size={9} />}>{personalInfo.portfolio}</SidebarItem>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SidebarSectionTitle>Skills</SidebarSectionTitle>
            {(['technical', 'soft', 'language'] as const).map((type) => {
              const list = skills.filter((s) => s.type === type);
              if (!list.length) return null;
              return (
                <div key={type} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px', marginBottom: '4px' }}>{type}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {list.map((s) => (
                      <span key={s.id} style={{ fontSize: '8.5px', padding: '2px 6px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>{s.name}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <SidebarSectionTitle>Education</SidebarSectionTitle>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>{edu.degree || 'Degree'}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.75)' }}>{edu.institution}</div>
                <div style={{ fontSize: '8.5px', color: 'rgba(255,255,255,0.55)', marginTop: '1px' }}>
                  {edu.startYear}{edu.startYear && edu.endYear ? ' – ' : ''}{edu.endYear}
                  {edu.cgpa ? ` | CGPA: ${edu.cgpa}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main body */}
      <div style={{ flex: 1, padding: '36px 28px', backgroundColor: '#fff' }}>
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px' }}>
            <CreativeSectionTitle accent={accent}>Profile</CreativeSectionTitle>
            <p style={{ fontSize: '10px', lineHeight: 1.75, color: '#444' }}>{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <CreativeSectionTitle accent={accent}>Experience</CreativeSectionTitle>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px', paddingLeft: '12px', borderLeft: `2px solid ${accent}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{exp.role || 'Role'}</span>
                  <span style={{ fontSize: '9px', color: '#666' }}>{exp.duration}</span>
                </div>
                <div style={{ fontSize: '10px', color: accent, fontWeight: 600, marginBottom: '4px' }}>{exp.company}</div>
                <ul style={{ paddingLeft: '13px', margin: 0 }}>
                  {exp.achievements.map((a, i) => (
                    <li key={i} style={{ fontSize: '9.5px', color: '#333', lineHeight: 1.65 }}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <CreativeSectionTitle accent={accent}>Projects</CreativeSectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ padding: '10px', border: `1px solid ${accent}25`, borderRadius: '6px', backgroundColor: `${accent}05` }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#111', marginBottom: '3px' }}>{proj.title}</div>
                  <p style={{ fontSize: '9.5px', color: '#444', lineHeight: 1.6, marginBottom: '4px' }}>{proj.description}</p>
                  <div style={{ fontSize: '8.5px', color: '#666', fontStyle: 'italic', marginBottom: '4px' }}>{proj.techStack}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {proj.githubLink && <a href={proj.githubLink} style={{ fontSize: '8.5px', color: accent }}>GitHub ↗</a>}
                    {proj.liveLink && <a href={proj.liveLink} style={{ fontSize: '8.5px', color: accent }}>Live ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Shared helper sub-components
───────────────────────────────────────────── */
const Section = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '14px' }}>
    <h2 style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: accent, borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '8px' }}>
      {title}
    </h2>
    {children}
  </div>
);

const ProSection = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '16px' }}>
    <h2 style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: '3px', marginBottom: '8px' }}>
      {title}
    </h2>
    {children}
  </div>
);

const SidebarSectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: '8.5px', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '3px', marginBottom: '8px' }}>
    {children}
  </div>
);

const SidebarItem = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px', color: 'rgba(255,255,255,0.85)', fontSize: '9px', lineHeight: 1.4 }}>
    <span style={{ marginTop: '1px', flexShrink: 0 }}>{icon}</span>
    <span style={{ wordBreak: 'break-all' }}>{children}</span>
  </div>
);

const CreativeSectionTitle = ({ accent, children }: { accent: string; children: React.ReactNode }) => (
  <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#111', borderBottom: `2px solid ${accent}`, paddingBottom: '4px', marginBottom: '10px', display: 'inline-block' }}>
    {children}
  </h2>
);

/* ─────────────────────────────────────────────
   Main exported component with proper A4 scaling
───────────────────────────────────────────── */
const ResumePreview = forwardRef<HTMLDivElement, object>((props, ref) => {
  const { resume } = useResumeStore();
  const { metadata } = resume;

  const fontFamily =
    metadata.font === 'inter'
      ? 'Inter, system-ui, sans-serif'
      : 'Outfit, system-ui, sans-serif';

  return (
    /* Scrollable container that fills the right panel */
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px 48px',
        backgroundColor: 'hsl(var(--secondary) / 0.1)',
        boxSizing: 'border-box',
      }}
    >
      {/*
        Scale-wrapper trick:
        - The A4 sheet is 794px (210mm @ 96dpi).
        - We render it at full size then use CSS scale() so it
          visually fits the available panel width without clipping.
        - transform-origin: top center keeps it centred.
      */}
      <div
        style={{
          /* reserve layout space equal to the scaled visual size */
          width: '794px',
          transformOrigin: 'top center',
          /* We rely on a CSS custom property set on the parent via JS.
             Fallback = 0.72 which fits nicely at 1280px viewport. */
          transform: 'scale(var(--resume-scale, 0.78))',
          /* Push content down so the scaled sheet doesn't overlap header */
          marginBottom: 'calc((var(--resume-scale, 0.78) - 1) * 297mm)',
        }}
      >
        <div
          id="resume-content"
          ref={ref}
          style={{
            backgroundColor: '#ffffff',
            width: '794px',       /* 210mm @ 96 dpi */
            minHeight: '1123px',  /* 297mm @ 96 dpi */
            boxShadow: '0 8px 40px -8px rgba(0,0,0,0.28)',
            fontFamily,
            color: '#1a1a1a',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {metadata.template === 'professional'
            ? <ProfessionalTemplate resume={resume} />
            : metadata.template === 'creative'
            ? <CreativeTemplate resume={resume} />
            : <MinimalTemplate resume={resume} />}
        </div>
      </div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
