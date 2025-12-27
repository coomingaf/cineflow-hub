import { motion } from "framer-motion";
import { Play, Info, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={heroBanner}
          alt="فیلم ویژه"
          className="w-full h-full object-cover"
        />
        {/* Overlays */}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Animated Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(16, 100%, 50%, 0.2), transparent)",
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Star className="w-4 h-4 text-cinema-gold fill-cinema-gold" />
            <span className="text-sm font-medium">فیلم ویژه هفته</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          >
            <span className="text-gradient">انتقام‌جویان:</span>
            <br />
            پایان بازی
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground"
          >
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-cinema-gold fill-cinema-gold" />
              <span className="font-semibold text-foreground">8.4</span>
              <span className="text-sm">/10</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>2019</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>3 ساعت و 1 دقیقه</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium">
              اکشن
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            پس از رویدادهای ویرانگر انتقام‌جویان: جنگ بی‌نهایت، انتقام‌جویان باقی‌مانده 
            باید یک بار دیگر گرد هم آیند تا کار تانوس را به پایان رسانند.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <Button variant="cinema" size="xl" className="group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              تماشا و دانلود
            </Button>
            <Button variant="cinema-outline" size="xl">
              <Info className="w-5 h-5" />
              اطلاعات بیشتر
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
