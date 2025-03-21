
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import VideoDownloaderPage from "./pages/VideoDownloaderPage";
import ImageConverterPage from "./pages/ImageConverterPage";
import PdfEditorPage from "./pages/PdfEditorPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import LinkShortenerPage from "./pages/LinkShortenerPage";
import NotesPage from "./pages/NotesPage";
import ApiPage from "./pages/ApiPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/video-downloader" element={<VideoDownloaderPage />} />
              <Route path="/image-converter" element={<ImageConverterPage />} />
              <Route path="/pdf-editor" element={<PdfEditorPage />} />
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/link-shortener" element={<LinkShortenerPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/api" element={<ApiPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
