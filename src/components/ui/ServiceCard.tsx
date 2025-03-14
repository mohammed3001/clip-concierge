
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  isNew?: boolean;
  index?: number;
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  path, 
  isNew = false,
  index = 0 
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      <Link 
        to={path}
        className="block h-full"
      >
        <div className="glass rounded-2xl p-6 h-full border border-border/40 hover:border-border/60 shadow-glass-sm hover:shadow-glass transition-all duration-500 group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Icon size={24} />
            </div>
            
            {isNew && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                New
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
          <p className="text-muted-foreground text-sm mb-6">{description}</p>
          
          <div className="flex items-center text-sm font-medium text-primary opacity-80 group-hover:opacity-100 transition-opacity">
            Try Now
            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
