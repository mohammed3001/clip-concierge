
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Clipboard, CheckCircle2, Code, Copy } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Define the API endpoint examples
const apiEndpoints = [
  {
    name: "PDF Editor API",
    endpoint: "/api/pdf",
    method: "POST",
    description: "Convert, merge, split or rotate PDF files",
    example: `fetch('/api/pdf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'merge', // or 'split', 'convert', 'rotate'
    files: [/* array of file data */]
  })
})
.then(response => response.json())
.then(data => console.log(data));`
  },
  {
    name: "Link Shortener API",
    endpoint: "/api/links",
    method: "POST",
    description: "Shorten URLs and track click statistics",
    example: `fetch('/api/links', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com/very/long/url'
  })
})
.then(response => response.json())
.then(data => console.log(data));`
  },
  {
    name: "Image Converter API",
    endpoint: "/api/images",
    method: "POST",
    description: "Convert images between different formats",
    example: `fetch('/api/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    format: 'png', // target format: jpeg, png, webp, etc.
    quality: 90,
    image: /* base64 encoded image data */
  })
})
.then(response => response.json())
.then(data => console.log(data));`
  },
  {
    name: "Notes API",
    endpoint: "/api/notes",
    method: "GET/POST/PUT/DELETE",
    description: "Create, read, update and delete notes",
    example: `// Create a new note
fetch('/api/notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Note',
    content: 'Note content',
    tags: ['personal', 'work']
  })
})
.then(response => response.json())
.then(data => console.log(data));`
  }
];

export default function ApiPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>API Documentation | UtilityHub</title>
        <meta name="description" content="API documentation for UtilityHub services. Integrate our tools into your applications." />
      </Helmet>
      
      <Header />
      
      <main className="flex-grow pt-28 pb-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integrate our utility services into your applications.
              Below are the available APIs and their usage examples.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <div className="bg-muted/30 border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Code className="mr-2" size={20} />
                Getting Started
              </h2>
              <p className="mb-4">
                Our API allows you to access UtilityHub's services programmatically.
                All API requests require an API key for authentication.
              </p>
              <div className="bg-background border border-border rounded-lg p-4">
                <code className="text-sm">
                  <span className="text-blue-500">const</span> <span className="text-amber-500">apiKey</span> = <span className="text-green-500">'YOUR_API_KEY'</span>;
                </code>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">
                  To get an API key, please contact our support team or subscribe to a plan that includes API access.
                </p>
              </div>
            </div>
            
            {/* API Endpoints */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Available Endpoints</h2>
              
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="border border-border rounded-xl overflow-hidden">
                  <div className="p-4 bg-muted/30 border-b border-border">
                    <h3 className="font-medium text-lg">{endpoint.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">
                        {endpoint.method}
                      </span>
                      <span className="ml-2 font-mono text-sm text-muted-foreground">
                        {endpoint.endpoint}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {endpoint.description}
                    </p>
                    <div className="relative">
                      <div className="bg-background border border-border rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(endpoint.example, index)}
                      >
                        {copiedIndex === index ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Authentication Section */}
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="font-medium text-lg">Authentication</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  All API requests require authentication using an API key. Add your API key to the request headers:
                </p>
                <div className="bg-background border border-border rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`fetch('/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    // request data
  })
})`}</code>
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Error Handling */}
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="font-medium text-lg">Error Handling</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  The API returns standard HTTP status codes and a JSON response with error details:
                </p>
                <div className="bg-background border border-border rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`{
  "success": false,
  "error": {
    "code": "invalid_input",
    "message": "The provided URL is invalid"
  }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Rate Limiting */}
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="p-4 bg-muted/30 border-b border-border">
                <h3 className="font-medium text-lg">Rate Limiting</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  To ensure fair usage, API requests are subject to rate limiting. The current limits are:
                </p>
                <ul className="list-disc list-inside text-sm space-y-2 mb-4">
                  <li>Free tier: 100 requests per day</li>
                  <li>Basic tier: 1,000 requests per day</li>
                  <li>Premium tier: 10,000 requests per day</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  Rate limit headers are included in the response:
                </p>
                <div className="bg-background border border-border rounded-lg p-4 mt-2 overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1698685200`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
