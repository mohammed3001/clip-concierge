
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { 
  FileVideo, 
  Image, 
  FileText, 
  Briefcase, 
  Link as LinkIcon, 
  BookText,
  Download,
  Zap,
  Shield,
  Star,
  ChevronRight
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ui/ServiceCard';
import AdPlacement from '@/components/ui/AdPlacement';

const services = [
  {
    title: 'Video Downloader',
    description: 'Download videos from social media platforms in various formats and qualities.',
    icon: FileVideo,
    path: '/video-downloader',
    isNew: true,
  },
  {
    title: 'Image Converter',
    description: 'Convert images between different formats while preserving quality.',
    icon: Image,
    path: '/image-converter',
  },
  {
    title: 'PDF Editor',
    description: 'Edit, merge, and convert PDF files with our easy-to-use tools.',
    icon: FileText,
    path: '/pdf-editor',
  },
  {
    title: 'Resume Builder',
    description: 'Create professional resumes with customizable templates and sections.',
    icon: Briefcase,
    path: '/resume-builder',
  },
  {
    title: 'Link Shortener',
    description: 'Shorten long URLs for easier sharing and tracking.',
    icon: LinkIcon,
    path: '/link-shortener',
  },
  {
    title: 'Note Taking',
    description: 'Organize your thoughts with our feature-rich note-taking system.',
    icon: BookText,
    path: '/notes',
  },
];

const features = [
  {
    title: 'Fast Processing',
    description: 'All tools are optimized for speed and efficiency.',
    icon: Zap,
  },
  {
    title: 'Easy Downloads',
    description: 'Download your files with just a few clicks.',
    icon: Download,
  },
  {
    title: 'Secure & Private',
    description: 'Your data is never stored on our servers.',
    icon: Shield,
  },
  {
    title: 'High Quality',
    description: 'Maintain the highest possible quality in all conversions.',
    icon: Star,
  },
];

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow pt-28 pb-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-20">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-70 pointer-events-none" />
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Your All-in-One <span className="text-primary">Digital Utility</span> Toolkit
                </h1>
                <p className="text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
                  Simplify your workflow with our collection of powerful web-based tools designed for efficiency and ease of use.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href="/video-downloader" 
                    className="px-6 py-3 rounded-xl bg-primary text-white font-medium transition-all hover:bg-primary/90 flex items-center min-w-44 justify-center"
                  >
                    Get Started
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                  <a 
                    href="#services" 
                    className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/90 flex items-center min-w-44 justify-center"
                  >
                    Explore Tools
                  </a>
                </div>
              </motion.div>
            </div>
            
            {/* Ad placement */}
            <div className="mb-16">
              <AdPlacement format="leaderboard" className="mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.2 + (index * 0.1),
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="glass rounded-xl p-5 border border-border/40 shadow-glass-sm"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-medium">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-13">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our collection of powerful online utilities designed to boost your productivity and simplify digital tasks.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  path={service.path}
                  isNew={service.isNew}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">
                Our tools are designed to be simple and intuitive. Follow these easy steps:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: '01',
                  title: 'Choose a Tool',
                  description: 'Select the tool you need from our collection of digital utilities.',
                },
                {
                  step: '02',
                  title: 'Input Your Data',
                  description: 'Upload files or enter the required information based on the selected tool.',
                },
                {
                  step: '03',
                  title: 'Get Results',
                  description: 'Process your request and download or use the output immediately.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.2,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="relative"
                >
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 right-0 w-1/2 h-0.5 bg-border" />
                  )}
                  
                  <div className="glass rounded-xl p-6 border border-border/40 shadow-glass-sm relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="/video-downloader" 
                className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-white font-medium transition-all hover:bg-primary/90"
              >
                Try Our Tools
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Ad placement */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <AdPlacement format="leaderboard" className="mx-auto" />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
