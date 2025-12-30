import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Search, ArrowRight, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <main className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* 404 Illustration */}
            <div className="relative mb-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="text-[180px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-cinema-gold to-accent leading-none">
                  404
                </div>
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
                    <Film className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-cinema-gold animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-primary animate-pulse delay-300" />
              <div className="absolute top-1/4 right-1/3 w-4 h-4 rounded-full bg-accent/50 animate-pulse delay-500" />
            </div>

            {/* Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              صفحه مورد نظر یافت نشد!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
              <br />
              می‌توانید به صفحه اصلی برگردید یا فیلم مورد نظرتان را جستجو کنید.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="cinema" size="lg" className="gap-2">
                <Link to="/">
                  <Home className="w-5 h-5" />
                  بازگشت به صفحه اصلی
                </Link>
              </Button>
              <Button asChild variant="cinema-outline" size="lg" className="gap-2">
                <Link to="/search">
                  <Search className="w-5 h-5" />
                  جستجوی فیلم
                </Link>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-16 pt-8 border-t border-border/50"
            >
              <p className="text-muted-foreground mb-4">یا از لینک‌های زیر استفاده کنید:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/categories" className="flex items-center gap-1 text-primary hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  دسته‌بندی فیلم‌ها
                </Link>
                <Link to="/series" className="flex items-center gap-1 text-primary hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  سریال‌ها
                </Link>
                <Link to="/request" className="flex items-center gap-1 text-primary hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  درخواست فیلم
                </Link>
                <Link to="/contact" className="flex items-center gap-1 text-primary hover:underline">
                  <ArrowRight className="w-4 h-4" />
                  تماس با ما
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;