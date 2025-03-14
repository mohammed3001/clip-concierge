
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PdfEditor from "@/components/PdfEditor";

export default function PdfEditorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>PDF Editor | UtilityHub</title>
        <meta name="description" content="Edit, merge, split, and convert PDF files. Easy-to-use online PDF editor with no installation required." />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">PDF Editor</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Edit, merge, split, and convert PDF files with our easy-to-use online tools.
              No installation required.
            </p>
          </motion.div>
          
          <PdfEditor />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
