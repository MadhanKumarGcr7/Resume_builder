'use client';

import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Zap, PenLine } from 'lucide-react';
import Link from 'next/link';

export default function AIFeaturesPage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24 px-4 overflow-x-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md shadow-sm text-primary text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Powered by Google Gemini AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
            Write Less. <br />
            <span className="text-primary italic font-serif">Impress More.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Our AI engine instantly drafts your professional summaries, refines your job bullets into high-impact achievements, and optimizes your layout for ATS systems.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl z-10"
        >
          {[
            {
              icon: Brain,
              title: "Contextual AI Parsing",
              desc: "Provide your basic job title and let the AI generate perfect bullet points mapped to industry buzzwords."
            },
            {
              icon: PenLine,
              title: "Summary Generation",
              desc: "Don't know what to write in your bio? Get 3 professional options instantly based on your experience."
            },
            {
              icon: Sparkles,
              title: "Smart Phrasing",
              desc: "We analyze your written points and convert 'did stuff' into 'Spearheaded key initiatives yielding 20% ROI'."
            },
            {
              icon: Zap,
              title: "Real-time Processing",
              desc: "Changes happen in milliseconds natively in the browser without ruining your format."
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-background/50 backdrop-blur-xl border border-border transition-all hover:-translate-y-2 hover:border-primary/50 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/10">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-6 w-max transition-transform group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="mt-16 text-center"
        >
          <Link href="/builder">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold gap-2 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              <Zap className="w-5 h-5 fill-current" />
              Try the AI Assistant Now
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
