
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FileVideo, 
  Award,
  Clock,
  CloudOff,
  Zap
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoDownloader from '@/components/VideoDownloader';
import AdPlacement from '@/components/ui/AdPlacement';

export default function VideoDownloaderPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>Video Downloader - UtilityHub</title>
        <meta name="description" content="Download videos from social media platforms in various formats and qualities with our free online tool." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow pt-28 pb-10">
        <section className="pb-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                <FileVideo size={32} />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Video Downloader</h1>
              <p className="text-xl text-muted-foreground">
                Download videos from YouTube, Instagram, TikTok, Facebook, Twitter, and more in your preferred format and quality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              {[
                {
                  icon: Zap,
                  title: 'Fast Downloads',
                  description: 'Quick processing and download speeds'
                },
                {
                  icon: Award,
                  title: 'High Quality',
                  description: 'Download in the highest available quality'
                },
                {
                  icon: CloudOff,
                  title: 'No Storage',
                  description: 'We don\'t store your videos'
                },
                {
                  icon: Clock,
                  title: 'Unlimited Usage',
                  description: 'No daily limits or restrictions'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="glass rounded-xl p-4 border border-border/40 text-center shadow-glass-sm">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="mb-10">
              <AdPlacement format="leaderboard" className="mx-auto" />
            </div>
            
            <VideoDownloader />
            
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: 'Is this service completely free?',
                    answer: 'Yes, our video downloader is completely free to use. We display ads to support our service and keep it free for users.'
                  },
                  {
                    question: 'Which websites are supported?',
                    answer: 'We support most major platforms including YouTube, Instagram, Facebook, Twitter, TikTok, Vimeo, Dailymotion, and more.'
                  },
                  {
                    question: 'Is it legal to download videos?',
                    answer: 'Downloading videos for personal use is generally acceptable, but redistributing copyrighted content is not. Please respect intellectual property rights and only download content you have permission to use.'
                  },
                  {
                    question: 'Do you store the videos I download?',
                    answer: 'No, we don\'t store any videos on our servers. The content is processed and delivered directly to you without being saved.'
                  },
                  {
                    question: 'What video formats are supported?',
                    answer: 'We support most common video formats including MP4, WebM, MOV, MKV, AVI, and audio extraction to MP3.'
                  }
                ].map((item, index) => (
                  <div key={index} className="glass rounded-xl p-6 border border-border/40 shadow-glass-sm">
                    <h3 className="text-lg font-medium mb-2">{item.question}</h3>
                    <p className="text-muted-foreground text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
