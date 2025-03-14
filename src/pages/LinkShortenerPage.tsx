
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LinkShortener from "@/components/LinkShortener";

export default function LinkShortenerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Helmet>
        <title>Link Shortener | UtilityHub</title>
        <meta name="description" content="Shorten long URLs into compact links. Track clicks and manage your shortened links with our easy-to-use link shortener." />
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Link Shortener</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Shorten long URLs into compact links. Track clicks and manage 
              your shortened links with our easy-to-use tool.
            </p>
          </motion.div>
          
          <LinkShortener />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
