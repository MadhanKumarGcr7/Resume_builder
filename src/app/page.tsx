import Hero from '@/components/landing/Hero';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      <Hero />
      
      {/* Social Proof / Trusted By (Optional) */}
      <section className="py-20 border-y border-border/10 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10">
            Trusted by candidates landing offers at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Stripe'].map((company) => (
              <span key={company} className="text-2xl font-black tracking-tighter mix-blend-luminosity hover:mix-blend-normal transition-all hover:scale-110 hover:text-foreground cursor-default">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer-like area */}
      <footer className="py-20 text-center text-muted-foreground text-sm">
        <p>© 2026 Resumify AI. Built for the next generation of talent.</p>
      </footer>
    </main>
  );
}
