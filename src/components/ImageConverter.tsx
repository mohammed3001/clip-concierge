
import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Check, Download, X, Loader, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import AdPlacement from './ui/AdPlacement';
import { toast } from 'sonner';

const imageFormats = [
  { value: 'jpeg', label: 'JPEG', description: 'Best for photos' },
  { value: 'png', label: 'PNG', description: 'Supports transparency' },
  { value: 'webp', label: 'WebP', description: 'Optimized for web' },
  { value: 'gif', label: 'GIF', description: 'Supports animation' },
  { value: 'bmp', label: 'BMP', description: 'Uncompressed format' },
  { value: 'tiff', label: 'TIFF', description: 'High quality images' },
  { value: 'svg', label: 'SVG', description: 'Vector format' },
];

const compressionLevels = [
  { value: 'low', label: 'Low - Smaller Size', quality: 30 },
  { value: 'medium', label: 'Medium - Balanced', quality: 70 },
  { value: 'high', label: 'High - Better Quality', quality: 90 },
  { value: 'best', label: 'Best - Maximum Quality', quality: 100 },
];

interface ImageInfo {
  name: string;
  size: string;
  dimensions: string;
  previewUrl: string;
}

export default function ImageConverter() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState(imageFormats[0]);
  const [compressionLevel, setCompressionLevel] = useState(compressionLevels[1]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error('Please select valid image files');
      return;
    }
    
    setSelectedFiles(imageFiles);
    setIsLoading(true);
    
    try {
      // Process the first image for preview
      const file = imageFiles[0];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        if (e.target?.result) {
          const image = new Image();
          image.src = e.target.result as string;
          
          image.onload = () => {
            const fileSizeInKB = Math.round(file.size / 1024);
            const fileSizeFormatted = fileSizeInKB < 1024 
              ? `${fileSizeInKB} KB` 
              : `${(fileSizeInKB / 1024).toFixed(2)} MB`;
            
            setImageInfo({
              name: file.name,
              size: fileSizeFormatted,
              dimensions: `${image.width} x ${image.height}`,
              previewUrl: e.target?.result as string,
            });
            
            setIsLoading(false);
          };
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error reading image:', error);
      toast.error('Failed to process image');
      setIsLoading(false);
    }
  };
  
  const handleConvert = async () => {
    if (selectedFiles.length === 0 || !imageInfo) return;
    
    setIsConverting(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would be an actual conversion
      // using a library like sharp on the backend or a Web Worker
      
      const suffix = selectedFiles.length > 1 ? 
        ` and ${selectedFiles.length - 1} other files` : '';
      
      toast.success(`Converted "${selectedFiles[0].name}"${suffix} to ${selectedFormat.label} format`);
      
      // In a real app, this would trigger an actual download
    } catch (error) {
      console.error('Error converting image:', error);
      toast.error('Failed to convert image');
    } finally {
      setIsConverting(false);
    }
  };
  
  const clearSelection = () => {
    setSelectedFiles([]);
    setImageInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10">
        {!imageInfo ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors duration-300"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ImageIcon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Upload Images to Convert</h3>
              <p className="text-muted-foreground mb-6">
                Drag and drop files here or click to browse
              </p>
              
              <label
                htmlFor="file-upload"
                className="px-6 py-3 rounded-xl bg-primary text-white font-medium inline-flex items-center cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Upload size={18} className="mr-2" />
                Select Images
              </label>
            </div>
            
            <div className="text-muted-foreground text-sm space-y-2">
              <p>Supported formats: JPG, PNG, WebP, GIF, BMP, TIFF, SVG</p>
              <p>Maximum file size: 50MB</p>
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Selected Images</h3>
              <button
                onClick={clearSelection}
                className="text-muted-foreground hover:text-foreground text-sm flex items-center"
              >
                <X size={14} className="mr-1" />
                Clear selection
              </button>
            </div>
            
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">{selectedFiles.length} file(s)</span>
                  {selectedFiles.length > 1 && (
                    <span className="text-sm text-muted-foreground">First file shown in preview</span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image preview */}
                  <div className="aspect-square relative rounded-lg overflow-hidden border border-border">
                    {isLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                        <Loader size={24} className="animate-spin text-primary" />
                      </div>
                    ) : (
                      <img 
                        src={imageInfo.previewUrl} 
                        alt={imageInfo.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  
                  {/* Image info and settings */}
                  <div className="md:col-span-2">
                    <h4 className="font-medium mb-2 truncate" title={imageInfo.name}>
                      {imageInfo.name}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-muted/30 rounded-md p-2 text-sm">
                        <span className="text-muted-foreground">Size:</span> {imageInfo.size}
                      </div>
                      <div className="bg-muted/30 rounded-md p-2 text-sm">
                        <span className="text-muted-foreground">Dimensions:</span> {imageInfo.dimensions}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Convert to
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {imageFormats.map((format, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedFormat(format)}
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedFormat.description}
                      </p>
                    </div>
                    
                    <div>
                      <button 
                        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
                        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                      >
                        <Settings size={14} className="mr-1" />
                        {showAdvancedOptions ? 'Hide' : 'Show'} advanced options
                      </button>
                      
                      {showAdvancedOptions && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Quality/Compression
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {compressionLevels.map((level, index) => (
                              <button
                                key={index}
                                onClick={() => setCompressionLevel(level)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                  compressionLevel.value === level.value
                                    ? 'bg-primary text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                              >
                                {level.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={handleConvert}
                        disabled={isConverting || isLoading}
                        className="flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white font-medium transition-all hover:bg-primary/90 disabled:opacity-70"
                      >
                        {isConverting ? (
                          <>
                            <Loader size={16} className="mr-2 animate-spin" />
                            Converting...
                          </>
                        ) : (
                          <>
                            <Download size={16} className="mr-2" />
                            Convert & Download
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!imageInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="col-span-3 md:col-span-2">
            <div className="border border-border/60 rounded-xl p-6 bg-muted/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <ImageIcon size={20} />
                </div>
                <h3 className="text-lg font-medium">Convert Images Easily</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-5">
                Upload any image format and convert it to JPEG, PNG, WebP, GIF, BMP, TIFF, or SVG. 
                Adjust quality settings for optimal results.
              </p>
              
              <div className="space-y-4">
                {[
                  'Convert between multiple image formats',
                  'Batch conversion for multiple files',
                  'Preserve image quality with adjustable settings',
                  'Fast and secure processing',
                  'Free to use with no registration required'
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
