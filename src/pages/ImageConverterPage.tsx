
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageConverter from "@/components/ImageConverter";

export default function ImageConverterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>Image Converter | UtilityHub</title>
        <meta name="description" content="Convert images between different formats while preserving quality. Support for JPEG, PNG, WebP, GIF, BMP, TIFF, and SVG formats." />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Image Converter</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Convert images between different formats while preserving quality. 
              Fast, secure, and free to use.
            </p>
          </motion.div>
          
          <ImageConverter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
