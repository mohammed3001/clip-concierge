
import { useState, useRef } from 'react';
import { File, Upload, Merge, Scissors, FileText, Download, X, Loader, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import AdPlacement from './ui/AdPlacement';
import { toast } from 'sonner';

const pdfActions = [
  { id: 'merge', name: 'Merge PDFs', icon: Merge, description: 'Combine multiple PDF files into one document' },
  { id: 'split', name: 'Split PDF', icon: Scissors, description: 'Extract pages or split a PDF into multiple files' },
  { id: 'convert', name: 'Convert PDF', icon: FileText, description: 'Convert PDFs to Word, Excel, PowerPoint or images' },
  { id: 'rotate', name: 'Rotate Pages', icon: RotateCw, description: 'Change the orientation of pages in your PDF' }
];

export default function PdfEditor() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
  
  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      toast.error('Please select valid PDF files');
      return;
    }
    
    setSelectedFiles([...selectedFiles, ...pdfFiles]);
  };
  
  const clearSelection = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSelectedAction(null);
  };
  
  const handleProcessPdf = async () => {
    if (!selectedAction || selectedFiles.length === 0) {
      toast.error('Please select files and an action to perform');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate PDF processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // This would be replaced with actual PDF processing logic
      toast.success(`${selectedAction} operation completed successfully`);
      
      // Reset after successful processing
      if (selectedAction !== 'merge') {
        clearSelection();
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast.error('An error occurred while processing your PDF');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getActionNameById = (id: string) => {
    const action = pdfActions.find(action => action.id === id);
    return action ? action.name : '';
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-10">
        {selectedFiles.length === 0 ? (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary/50 transition-colors duration-300 mb-8"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <File size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Upload PDF Files</h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop PDF files here or click to browse
                </p>
                
                <label
                  htmlFor="file-upload"
                  className="px-6 py-3 rounded-xl bg-primary text-white font-medium inline-flex items-center cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Upload size={18} className="mr-2" />
                  Select PDF Files
                </label>
              </div>
              
              <p className="text-muted-foreground text-sm">
                Maximum file size: 50MB per PDF
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {pdfActions.map((action) => {
                const Icon = action.icon;
                
                return (
                  <div 
                    key={action.id}
                    className="p-5 border border-border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedAction(action.id);
                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{action.name}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Selected Files</h3>
              <button
                onClick={clearSelection}
                className="text-muted-foreground hover:text-foreground text-sm flex items-center"
              >
                <X size={14} className="mr-1" />
                Clear selection
              </button>
            </div>
            
            <div className="border border-border rounded-xl overflow-hidden mb-6">
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium mr-2">
                      {selectedFiles.length} file(s)
                    </span>
                    {selectedAction && (
                      <span className="text-sm text-muted-foreground">
                        Action: {getActionNameById(selectedAction)}
                      </span>
                    )}
                  </div>
                  
                  {!selectedAction && (
                    <div className="text-sm text-muted-foreground">
                      Select an action below
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                      <div className="flex items-center">
                        <File size={16} className="text-primary mr-2" />
                        <span className="text-sm truncate max-w-[280px]" title={file.name}>
                          {file.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
                
                {!selectedAction ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pdfActions.map((action) => {
                      const Icon = action.icon;
                      
                      return (
                        <button
                          key={action.id}
                          className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-colors flex items-center"
                          onClick={() => setSelectedAction(action.id)}
                        >
                          <Icon size={16} className="text-primary mr-2" />
                          <span className="text-sm font-medium">{action.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Button
                      onClick={handleProcessPdf}
                      disabled={isProcessing}
                      className="flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <Loader size={16} className="mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download size={16} className="mr-2" />
                          Process & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <AdPlacement format="leaderboard" className="mx-auto mb-8" />
      </motion.div>
    </div>
  );
}
