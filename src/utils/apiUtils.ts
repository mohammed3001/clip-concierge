
/**
 * Types for API requests and responses
 */

// PDF API Types
export interface PdfApiRequest {
  action: 'merge' | 'split' | 'convert' | 'rotate';
  files: string[]; // Base64 encoded PDF files
  options?: {
    quality?: number; // 0-100
    pages?: number[]; // For splitting PDFs, page numbers to extract
    rotation?: 90 | 180 | 270; // For rotation, degrees to rotate
    format?: string; // For conversion, target format
  };
}

// Link Shortener API Types
export interface LinkApiRequest {
  url: string;
  customSlug?: string; // Optional custom short code
  expiresAt?: string; // Optional expiration date
}

export interface LinkApiResponse {
  success: boolean;
  data?: {
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    expiresAt?: string;
    createdAt: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Image Converter API Types
export interface ImageApiRequest {
  image: string; // Base64 encoded image
  format: 'jpeg' | 'png' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'svg';
  quality?: number; // 0-100
  resize?: {
    width?: number;
    height?: number;
    fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  };
}

export interface ImageApiResponse {
  success: boolean;
  data?: {
    convertedImage: string; // Base64 encoded converted image
    format: string;
    size: number; // In bytes
  };
  error?: {
    code: string;
    message: string;
  };
}

// Notes API Types
export interface Note {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NotesApiResponse {
  success: boolean;
  data?: {
    notes?: Note[];
    note?: Note;
  };
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Mock API functions for client-side demonstration
 * In a real application, these would be replaced with actual API calls
 */

// Helper function to generate a response with random delay to simulate network latency
const simulateApiCall = <T>(data: T, error?: { code: string; message: string }): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    }, Math.random() * 500 + 200); // Random delay between 200-700ms
  });
};

// Generate a random short code
export const generateShortCode = (length: number = 6): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Mock API functions that would be implemented in a real backend
export const apiService = {
  // PDF API mock
  processPdf: async (request: PdfApiRequest): Promise<any> => {
    // Validate input
    if (!request.action) {
      return simulateApiCall({}, { code: 'invalid_input', message: 'Action is required' });
    }
    
    if (!request.files || request.files.length === 0) {
      return simulateApiCall({}, { code: 'invalid_input', message: 'At least one file is required' });
    }
    
    // Mock response based on action
    switch (request.action) {
      case 'merge':
        return simulateApiCall({
          success: true,
          data: {
            mergedFile: 'base64encodedpdf...',
            pageCount: request.files.length * 5, // Just a mock calculation
            fileSize: request.files.length * 500000 // Mock file size
          }
        });
      
      case 'split':
        return simulateApiCall({
          success: true,
          data: {
            splitFiles: Array(5).fill(0).map((_, i) => ({
              file: `base64encodedpdf_${i}...`,
              pageCount: 1,
              fileSize: 100000 + i * 10000
            }))
          }
        });
      
      default:
        return simulateApiCall({
          success: true,
          data: {
            processedFile: 'base64encodedpdf...',
            actionPerformed: request.action,
            fileSize: 500000
          }
        });
    }
  },
  
  // Link shortener API mock
  shortenLink: async (request: LinkApiRequest): Promise<LinkApiResponse> => {
    // Validate URL
    try {
      new URL(request.url);
    } catch (e) {
      return simulateApiCall({} as LinkApiResponse, { 
        code: 'invalid_url', 
        message: 'The provided URL is invalid' 
      });
    }
    
    const shortCode = request.customSlug || generateShortCode();
    
    return simulateApiCall({
      success: true,
      data: {
        originalUrl: request.url,
        shortUrl: `https://util.hub/${shortCode}`,
        shortCode,
        expiresAt: request.expiresAt,
        createdAt: new Date().toISOString()
      }
    });
  },
  
  // Image converter API mock
  convertImage: async (request: ImageApiRequest): Promise<ImageApiResponse> => {
    // Validate input
    if (!request.image) {
      return simulateApiCall({} as ImageApiResponse, { 
        code: 'invalid_input', 
        message: 'Image data is required' 
      });
    }
    
    if (!request.format) {
      return simulateApiCall({} as ImageApiResponse, { 
        code: 'invalid_input', 
        message: 'Target format is required' 
      });
    }
    
    // Mock successful conversion
    return simulateApiCall({
      success: true,
      data: {
        convertedImage: 'base64encodedimage...',
        format: request.format,
        size: 200000 // Mock file size
      }
    });
  },
  
  // Notes API mock
  getNotes: async (): Promise<NotesApiResponse> => {
    // Mock retrieval of notes
    return simulateApiCall({
      success: true,
      data: {
        notes: [
          {
            id: '1',
            title: 'Sample Note 1',
            content: 'This is a sample note content',
            tags: ['work', 'important'],
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Sample Note 2',
            content: 'Another sample note with different content',
            tags: ['personal'],
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString()
          }
        ]
      }
    });
  },
  
  createNote: async (note: Note): Promise<NotesApiResponse> => {
    // Validate input
    if (!note.title) {
      return simulateApiCall({} as NotesApiResponse, { 
        code: 'invalid_input', 
        message: 'Note title is required' 
      });
    }
    
    // Mock note creation
    return simulateApiCall({
      success: true,
      data: {
        note: {
          id: Date.now().toString(),
          title: note.title,
          content: note.content,
          tags: note.tags,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    });
  },
  
  updateNote: async (id: string, note: Note): Promise<NotesApiResponse> => {
    // Validate input
    if (!id) {
      return simulateApiCall({} as NotesApiResponse, { 
        code: 'invalid_input', 
        message: 'Note ID is required' 
      });
    }
    
    if (!note.title) {
      return simulateApiCall({} as NotesApiResponse, { 
        code: 'invalid_input', 
        message: 'Note title is required' 
      });
    }
    
    // Mock note update
    return simulateApiCall({
      success: true,
      data: {
        note: {
          id,
          title: note.title,
          content: note.content,
          tags: note.tags,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // mock created date as yesterday
          updatedAt: new Date().toISOString() // updated just now
        }
      }
    });
  },
  
  deleteNote: async (id: string): Promise<NotesApiResponse> => {
    // Validate input
    if (!id) {
      return simulateApiCall({} as NotesApiResponse, { 
        code: 'invalid_input', 
        message: 'Note ID is required' 
      });
    }
    
    // Mock note deletion
    return simulateApiCall({
      success: true,
      data: {}
    });
  }
};
