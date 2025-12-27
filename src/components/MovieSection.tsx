import { motion } from "framer-motion";
import { ChevronLeft, Film, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./MovieCard";

import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";
import movie6 from "@/assets/movie-6.jpg";

const movies = [
  { title: "سایه تاریک", year: "2024", rating: "8.2", genre: "هیجان‌انگیز", image: movie1, quality: "BluRay" },
  { title: "ماموریت آینده", year: "2024", rating: "7.9", genre: "علمی-تخیلی", image: movie2, quality: "WEB-DL" },
  { title: "عشق بی‌پایان", year: "2023", rating: "7.5", genre: "عاشقانه", image: movie3, quality: "1080p" },
  { title: "شب ترسناک", year: "2024", rating: "6.8", genre: "ترسناک", image: movie4, quality: "720p" },
  { title: "جزیره رنگین", year: "2024", rating: "8.6", genre: "انیمیشن", image: movie5, quality: "4K" },
  { title: "سربازان دلیر", year: "2023", rating: "8.1", genre: "جنگی", image: movie6, quality: "BluRay" },
];

const series = [
  { title: "قلمرو تاریکی", year: "فصل ۳", rating: "9.1", genre: "فانتزی", image: movie4, quality: "WEB-DL" },
  { title: "آینده نئون", year: "فصل ۱", rating: "8.7", genre: "علمی-تخیلی", image: movie2, quality: "1080p" },
  { title: "قلب‌های شکسته", year: "فصل ۲", rating: "7.8", genre: "درام", image: movie3, quality: "720p" },
  { title: "ماجراجویان کوچک", year: "فصل ۴", rating: "8.9", genre: "انیمیشن", image: movie5, quality: "1080p" },
  { title: "مرز جنگ", year: "فصل ۱", rating: "8.4", genre: "اکشن", image: movie6, quality: "BluRay" },
  { title: "رازهای پنهان", year: "فصل ۲", rating: "7.6", genre: "معمایی", image: movie1, quality: "WEB-DL" },
];

interface SectionProps {
  title: string;
  icon: typeof Film;
  items: typeof movies;
  id: string;
}

const Section = ({ title, icon: Icon, items, id }: SectionProps) => (
  <section id={id} className="py-16">
    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-sm">جدیدترین و بهترین‌ها</p>
          </div>
        </div>
        <Button variant="cinema-outline" className="group">
          مشاهده همه
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </Button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {items.map((item, index) => (
          <MovieCard key={item.title} {...item} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export const MovieSection = () => (
  <>
    <Section title="فیلم‌های جدید" icon={Film} items={movies} id="movies" />
    <Section title="سریال‌های محبوب" icon={Tv} items={series} id="series" />
  </>
);
