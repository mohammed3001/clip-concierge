
import { Link } from 'react-router-dom';
import { 
  FileVideo, 
  Image, 
  FileText, 
  Briefcase, 
  Link as LinkIcon, 
  BookText,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const services = [
    { name: 'Video Tools', path: '/video-downloader', icon: FileVideo },
    { name: 'Image Converter', path: '/image-converter', icon: Image },
    { name: 'PDF Editor', path: '/pdf-editor', icon: FileText },
    { name: 'Resume Builder', path: '/resume-builder', icon: Briefcase },
    { name: 'Link Shortener', path: '/link-shortener', icon: LinkIcon },
    { name: 'Note Taking', path: '/notes', icon: BookText },
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ];
  
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: '#' },
    { name: 'Instagram', icon: Instagram, url: '#' },
    { name: 'Facebook', icon: Facebook, url: '#' },
    { name: 'GitHub', icon: Github, url: '#' },
  ];
  
  return (
    <footer className="border-t border-border/40 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">U</span>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">+</span>
                </div>
              </div>
              <span className="text-xl font-medium">UtilityHub</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              All-in-one productivity toolkit designed with precision and simplicity to enhance your digital workflow.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground/60 hover:text-primary transition-colors"
                    aria-label={link.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {services.slice(0, 3).map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={index}>
                    <Link 
                      to={service.path}
                      className="text-muted-foreground hover:text-primary text-sm flex items-center transition-colors"
                    >
                      <Icon size={14} className="mr-2" />
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">More Tools</h3>
            <ul className="space-y-3">
              {services.slice(3).map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={index}>
                    <Link 
                      to={service.path}
                      className="text-muted-foreground hover:text-primary text-sm flex items-center transition-colors"
                    >
                      <Icon size={14} className="mr-2" />
                      {service.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-xs">
              By using UtilityHub, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} UtilityHub. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> for productivity
          </p>
        </div>
      </div>
    </footer>
  );
}
