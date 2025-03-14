
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import AdPlacement from './ui/AdPlacement';
import { Link, Copy, Check, ExternalLink, Trash2, BarChart, Clock, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export default function LinkShortener() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL to shorten');
      return;
    }
    
    if (!isValidUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to shorten the URL
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random short code (in a real app this would come from the backend)
      const shortCode = generateRandomCode(6);
      
      const newLink: ShortenedLink = {
        id: Date.now().toString(),
        originalUrl: url,
        shortCode,
        createdAt: new Date(),
        clicks: 0
      };
      
      setShortenedLinks([newLink, ...shortenedLinks]);
      setUrl('');
      toast.success('URL shortened successfully');
    } catch (error) {
      console.error('Error shortening URL:', error);
      toast.error('Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  const generateRandomCode = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  
  const copyToClipboard = (shortCode: string, id: string) => {
    const shortUrl = `https://util.hub/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
    
    toast.success('Copied to clipboard');
  };
  
  const deleteLink = (id: string) => {
    setShortenedLinks(shortenedLinks.filter(link => link.id !== id));
    toast.success('Link deleted');
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="border border-border rounded-xl overflow-hidden mb-8">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <div className="mr-3 bg-primary/10 text-primary p-2 rounded-lg">
                  <Link size={24} />
                </div>
                <div className="text-lg font-medium">Shorten a long URL</div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter a long URL to shorten (e.g. https://example.com/very/long/url)"
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="shrink-0"
                >
                  {isLoading ? 'Shortening...' : 'Shorten URL'}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {shortenedLinks.length > 0 && (
          <div className="border border-border rounded-xl overflow-hidden mb-8">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-medium">Your shortened links</h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {shortenedLinks.map((link) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-border rounded-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                      <div className="font-medium mb-2 sm:mb-0">
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-primary transition-colors"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          <span className="truncate max-w-[250px]" title={link.originalUrl}>
                            {truncateUrl(link.originalUrl)}
                          </span>
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <div className="flex items-center mr-2">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(link.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {formatTime(link.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg flex items-center mr-2">
                          <span className="text-sm font-medium">https://util.hub/{link.shortCode}</span>
                        </div>
                        
                        <button 
                          onClick={() => copyToClipboard(link.shortCode, link.id)}
                          className="p-1.5 hover:bg-muted rounded-md transition-colors"
                          aria-label="Copy link"
                        >
                          {copiedId === link.id ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} className="text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BarChart size={14} className="mr-1" />
                          <span>{link.clicks} clicks</span>
                        </div>
                        
                        <button
                          onClick={() => deleteLink(link.id)}
                          className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
                          aria-label="Delete link"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="col-span-3 md:col-span-2">
            <div className="border border-border/60 rounded-xl p-6 bg-muted/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Link size={20} />
                </div>
                <h3 className="text-lg font-medium">Why use our link shortener?</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-5">
                Long URLs can be unwieldy and difficult to share. Our link shortener creates 
                compact, easy-to-share links while providing tracking and management features.
              </p>
              
              <div className="space-y-4">
                {[
                  'Create short, easy-to-share links',
                  'Track clicks and monitor link performance',
                  'Manage all your shortened links in one place',
                  'No registration required for basic usage',
                  'Works with any valid URL'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <AdPlacement format="square" className="mx-auto" />
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AdPlacement format="leaderboard" className="mx-auto" />
      </motion.div>
    </div>
  );
}
