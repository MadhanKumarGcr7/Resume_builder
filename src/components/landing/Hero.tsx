'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse transition-all duration-1000" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      
      {/* Dot grid subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent dark:from-black/10 -z-20 opacity-40 bg-[length:20px_20px]" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', color: 'rgba(150, 150, 150, 0.15)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md shadow-sm text-primary text-sm font-semibold mb-8 hover:bg-primary/5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Resume Builder 2.0</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 drop-shadow-sm leading-[1.1]">
          Build a Resume <br className="hidden md:block" /> That Lands Your <br />
          <span className="text-primary italic font-serif relative">
            Dream Job.
            {/* Swoosh Underline SVG */}
            <svg className="absolute w-full h-[0.3em] left-0 -bottom-[0.1em] text-primary opacity-60" viewBox="0 0 200 20" preserveAspectRatio="none">
              <path d="M0 15 Q 100 0 200 15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          The ultimate ATS-friendly resume builder. Real-time preview, highly-crafted elegant templates, and blazing fast AI intelligence.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/builder">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold gap-2 rounded-2xl shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] transition-all hover:scale-105 active:scale-95 group overflow-hidden relative">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:animate-[shimmer_1.5s_infinite]" />
              <Zap className="w-5 h-5 fill-current" />
              Start Building Now
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium rounded-2xl backdrop-blur-md bg-background/50 transition-all hover:bg-primary/5 hover:border-primary/50 relative overflow-hidden group">
            <span className="relative z-10 transition-colors group-hover:text-primary">View Templates</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Feature Glass Cards */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl z-10 relative"
      >
        {[
          { icon: ShieldCheck, title: "ATS-Approved", desc: "Designed explicitly to guarantee high parsing scores through applicant tracking systems." },
          { icon: Sparkles, title: "Gemini AI Core", desc: "Instantly draft expert-level professional summaries and dynamic job responsibilities." },
          { icon: FileText, title: "Premium Typography", desc: "Curated typography limits ensuring perfectly aligned, aesthetically stunning physical prints." }
        ].map((feature, i) => (
          <div key={i} className="group flex flex-col items-center p-8 rounded-3xl bg-background/40 backdrop-blur-xl border border-border md:hover:border-primary/50 shadow-lg shadow-black/5 transition-all duration-300 md:hover:-translate-y-2 md:hover:shadow-2xl md:hover:shadow-primary/10">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground shadow-inner">
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
            <p className="text-sm text-center text-muted-foreground leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
