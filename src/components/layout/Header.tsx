
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileVideo, 
  Image, 
  FileText, 
  Briefcase, 
  Link as LinkIcon, 
  BookText, 
  MenuIcon, 
  X,
  Moon,
  Sun
} from 'lucide-react';

const services = [
  { name: 'Video Tools', path: '/video-downloader', icon: FileVideo },
  { name: 'Image Converter', path: '/image-converter', icon: Image },
  { name: 'PDF Editor', path: '/pdf-editor', icon: FileText },
  { name: 'Resume Builder', path: '/resume-builder', icon: Briefcase },
  { name: 'Link Shortener', path: '/link-shortener', icon: LinkIcon },
  { name: 'Note Taking', path: '/notes', icon: BookText },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 glass shadow-glass-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          onClick={closeMobileMenu}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
          >
            <span className="text-2xl font-bold text-white">U</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">+</span>
            </div>
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-xl font-medium"
          >
            UtilityHub
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = location.pathname === service.path;
            
            return (
              <Link
                key={index}
                to={service.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                  isActive 
                    ? 'text-primary bg-primary/5' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon size={16} className="mr-1.5" />
                {service.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-2 p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden glass border-t border-border/40 shadow-lg"
        >
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-1">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = location.pathname === service.path;
              
              return (
                <Link
                  key={index}
                  to={service.path}
                  onClick={closeMobileMenu}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center ${
                    isActive 
                      ? 'text-primary bg-primary/5' 
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {service.name}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
