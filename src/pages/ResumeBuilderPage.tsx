
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResumeBuilder from "@/components/ResumeBuilder";

export default function ResumeBuilderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>Resume Builder | UtilityHub</title>
        <meta name="description" content="Create professional, ATS-friendly resumes in minutes. Choose from multiple templates and export to PDF or Word formats." />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Resume Builder</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create professional, ATS-friendly resumes in minutes.
              Choose from multiple templates and export to PDF or Word formats.
            </p>
          </motion.div>
          
          <ResumeBuilder />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
