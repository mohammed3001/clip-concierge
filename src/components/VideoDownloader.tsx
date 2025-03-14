
import { useState, useRef } from 'react';
import { Check, Download, FileVideo, Upload, X, AlertCircle, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import AdPlacement from './ui/AdPlacement';
import { toast } from 'sonner';

const videoFormats = [
  { value: 'mp4', label: 'MP4', quality: ['1080p', '720p', '480p', '360p'] },
  { value: 'webm', label: 'WebM', quality: ['1080p', '720p', '480p'] },
  { value: 'mov', label: 'MOV', quality: ['1080p', '720p', '480p'] },
  { value: 'mkv', label: 'MKV', quality: ['1080p', '720p'] },
  { value: 'avi', label: 'AVI', quality: ['720p', '480p'] },
  { value: 'mp3', label: 'MP3 (Audio)', quality: ['320kbps', '192kbps', '128kbps'] },
];

const supportedSites = [
  'YouTube', 'Instagram', 'Facebook', 'Twitter', 'TikTok', 'Vimeo', 'Dailymotion', 'Twitch'
];

interface VideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
}

export default function VideoDownloader() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState(videoFormats[0]);
  const [selectedQuality, setSelectedQuality] = useState(videoFormats[0].quality[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  const fetchVideoInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }
    
    setIsLoading(true);
    setVideoInfo(null);
    
    try {
      // Simulate API call to fetch video info
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we're creating mock data
      // In a real app, this would be an API call to a backend service
      const mockVideoInfo = {
        title: "Sample Video from " + url.split('/').filter(Boolean).pop(),
        duration: "3:45",
        thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmlkZW8lMjB0aHVtYm5haWx8ZW58MHx8MHx8fDA%3D",
      };
      
      setVideoInfo(mockVideoInfo);
      toast.success('Video information retrieved successfully');
    } catch (error) {
      console.error('Error fetching video info:', error);
      toast.error('Failed to retrieve video information');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormatChange = (format: typeof videoFormats[0]) => {
    setSelectedFormat(format);
    setSelectedQuality(format.quality[0]);
  };
  
  const handleDownload = async () => {
    if (!videoInfo) return;
    
    setIsDownloading(true);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Downloaded "${videoInfo.title}" as ${selectedFormat.label} (${selectedQuality})`);
      // In a real app, this would trigger an actual download
    } catch (error) {
      console.error('Error downloading video:', error);
      toast.error('Failed to download video');
    } finally {
      setIsDownloading(false);
    }
  };
  
  const clearUrl = () => {
    setUrl('');
    setVideoInfo(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10">
        <form onSubmit={fetchVideoInfo} className="relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="url"
              placeholder="Paste video URL here (YouTube, Instagram, TikTok, etc.)"
              value={url}
              onChange={handleUrlChange}
              disabled={isLoading}
              className="w-full h-14 pl-5 pr-16 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary bg-background shadow-sm transition-all duration-300 outline-none glass-hover"
            />
            {url && (
              <button
                type="button"
                onClick={clearUrl}
                className="absolute right-14 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-2"
                aria-label="Clear input"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="absolute right-0 top-0 h-full px-4 flex items-center justify-center rounded-r-xl bg-primary text-white transition-opacity duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Upload size={20} />
              )}
            </button>
          </div>
          
          <div className="mt-3 flex items-center flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Supported sites:</span>
            {supportedSites.map((site, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {site}
              </span>
            ))}
          </div>
        </form>
      </div>
      
      {isLoading && (
        <div className="text-center py-20">
          <div className="inline-block p-3 rounded-full bg-muted mb-4">
            <Loader size={24} className="text-primary animate-spin" />
          </div>
          <h3 className="text-lg font-medium mb-2">Fetching video information...</h3>
          <p className="text-muted-foreground text-sm">
            This may take a moment depending on the source
          </p>
        </div>
      )}
      
      {!isLoading && !videoInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="col-span-3 md:col-span-2">
            <div className="border border-border/60 rounded-xl p-6 bg-muted/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileVideo size={20} />
                </div>
                <h3 className="text-lg font-medium">Download Any Video</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-5">
                Paste the URL of a video from YouTube, Instagram, Facebook, Twitter, TikTok, and many other platforms to download in your preferred format and quality.
              </p>
              
              <div className="space-y-4">
                {[
                  'Fast and easy video downloads',
                  'Support for multiple platforms',
                  'Various formats and quality options',
                  'No registration required',
                  'Unlimited downloads'
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
      )}
      
      {videoInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-xl border border-border overflow-hidden shadow-glass-sm mb-12"
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 relative rounded-lg overflow-hidden aspect-video">
                <img 
                  src={videoInfo.thumbnail} 
                  alt={videoInfo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                  {videoInfo.duration}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium mb-2 line-clamp-2">{videoInfo.title}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Format
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {videoFormats.map((format, index) => (
                        <button
                          key={index}
                          onClick={() => handleFormatChange(format)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            selectedFormat.value === format.value
                              ? 'bg-primary text-white'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {format.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Quality
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedFormat.quality.map((quality, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedQuality(quality)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            selectedQuality === quality
                              ? 'bg-primary text-white'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    Only for personal use
                  </p>
                  
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 disabled:opacity-70"
                  >
                    {isDownloading ? (
                      <>
                        <Loader size={16} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download size={16} className="mr-2" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border p-4 bg-muted/30">
            <p className="text-xs text-muted-foreground text-center">
              By downloading, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and confirm 
              this is for personal use only. We don't store any videos on our servers.
            </p>
          </div>
        </motion.div>
      )}
      
      <AdPlacement format="leaderboard" className="mx-auto" />
    </div>
  );
}
