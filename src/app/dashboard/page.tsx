'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Search, 
  Clock, 
  Trash2, 
  Edit2, 
  Copy,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<any[]>([]);

  useEffect(() => {
    // Fetch resumes from API
    // const fetchResumes = async () => { ... }
    // setResumes(...)
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Resumes</h1>
            <p className="text-muted-foreground mt-1">Manage and edit your professional profiles</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search resumes..." 
                className="pl-10 h-10 w-64 rounded-xl bg-secondary/20 border-none text-sm focus:ring-1 focus:ring-primary/20 outline-none"
              />
            </div>
            <Link href="/builder">
              <Button className="rounded-xl gap-2 h-10 shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4" />
                Create New
              </Button>
            </Link>
          </div>
        </header>

        {resumes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-secondary/30 flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No resumes found</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              You haven't created any resumes yet. Start building your professional profile today!
            </p>
            <Link href="/builder">
              <Button variant="outline" className="rounded-xl gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Resume
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Resume Cards would be mapped here */}
          </div>
        )}
      </main>
    </div>
  );
}
