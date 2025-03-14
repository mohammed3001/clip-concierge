
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  format: 'banner' | 'square' | 'skyscraper' | 'leaderboard';
  className?: string;
}

export default function AdPlacement({ format, className = '' }: AdPlacementProps) {
  // Define dimensions based on standard ad formats
  const dimensions = {
    banner: { width: 468, height: 60, label: 'Banner Ad' },
    square: { width: 250, height: 250, label: 'Square Ad' },
    skyscraper: { width: 120, height: 600, label: 'Skyscraper Ad' },
    leaderboard: { width: 728, height: 90, label: 'Leaderboard Ad' },
  };
  
  const { width, height, label } = dimensions[format];
  
  // This is a placeholder component that would be replaced with actual ad code
  return (
    <div 
      className={`relative glass border border-dashed border-border rounded-lg flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        width: '100%', 
        height: format === 'skyscraper' ? '100%' : 'auto',
        aspectRatio: `${width} / ${height}`,
        maxWidth: `${width}px`,
        maxHeight: `${height}px`,
      }}
    >
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="text-center p-2 z-10">
        <p className="text-muted-foreground text-xs font-medium mb-1">{label}</p>
        <p className="text-muted-foreground/60 text-xs flex items-center justify-center">
          <ExternalLink size={10} className="mr-1" />
          Your Ad Here
        </p>
      </div>
    </div>
  );
}
