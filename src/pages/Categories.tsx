import { useState } from "react";
import { motion } from "framer-motion";
import { Film, Tv, Heart, Skull, Laugh, Rocket, Search, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";
import movie6 from "@/assets/movie-6.jpg";
import movie7 from "@/assets/movie-7.jpg";
import movie8 from "@/assets/movie-8.jpg";

const genres = [
  { id: "all", name: "همه", icon: Sparkles, color: "from-cinema-gold to-amber-600" },
  { id: "action", name: "اکشن", icon: Film, color: "from-red-500 to-orange-600" },
  { id: "drama", name: "درام", icon: Tv, color: "from-blue-500 to-indigo-600" },
  { id: "romance", name: "عاشقانه", icon: Heart, color: "from-pink-500 to-rose-600" },
  { id: "horror", name: "ترسناک", icon: Skull, color: "from-purple-500 to-violet-600" },
  { id: "comedy", name: "کمدی", icon: Laugh, color: "from-green-500 to-emerald-600" },
  { id: "scifi", name: "علمی-تخیلی", icon: Rocket, color: "from-cyan-500 to-teal-600" },
];

const allMovies = [
  { id: 1, title: "اوپنهایمر", year: "2023", rating: "8.9", genre: "action", image: movie1, quality: "BluRay" },
  { id: 2, title: "دون: بخش دوم", year: "2024", rating: "8.7", genre: "scifi", image: movie2, quality: "WEB-DL" },
  { id: 3, title: "بیچارگان", year: "2023", rating: "8.4", genre: "drama", image: movie3, quality: "BluRay" },
  { id: 4, title: "قاتلین ماه کامل", year: "2023", rating: "8.1", genre: "drama", image: movie4, quality: "WEB-DL" },
  { id: 5, title: "ناپلئون", year: "2023", rating: "7.5", genre: "action", image: movie5, quality: "BluRay" },
  { id: 6, title: "آکوامن ۲", year: "2023", rating: "6.8", genre: "action", image: movie6, quality: "HDCAM" },
  { id: 7, title: "ماجراجویی جنگل", year: "2024", rating: "7.9", genre: "comedy", image: movie7, quality: "WEB-DL" },
  { id: 8, title: "شب‌های تاریک", year: "2024", rating: "8.2", genre: "horror", image: movie8, quality: "BluRay" },
  { id: 9, title: "عشق در پاریس", year: "2023", rating: "7.3", genre: "romance", image: movie1, quality: "WEB-DL" },
  { id: 10, title: "فراتر از ستارگان", year: "2024", rating: "8.5", genre: "scifi", image: movie2, quality: "BluRay" },
  { id: 11, title: "خنده‌دار ترین روز", year: "2023", rating: "7.1", genre: "comedy", image: movie3, quality: "HDCAM" },
  { id: 12, title: "ترس در تاریکی", year: "2024", rating: "7.8", genre: "horror", image: movie4, quality: "WEB-DL" },
  { id: 13, title: "جنگجوی بی‌رحم", year: "2023", rating: "8.0", genre: "action", image: movie5, quality: "BluRay" },
  { id: 14, title: "داستان ما", year: "2024", rating: "7.6", genre: "romance", image: movie6, quality: "WEB-DL" },
  { id: 15, title: "آینده‌ای روشن", year: "2024", rating: "8.3", genre: "scifi", image: movie7, quality: "BluRay" },
  { id: 16, title: "زندگی در سایه", year: "2023", rating: "7.9", genre: "drama", image: movie8, quality: "WEB-DL" },
];

const ITEMS_PER_PAGE = 8;

const Categories = () => {
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = allMovies.filter((movie) => {
    const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
    const matchesSearch = movie.title.includes(searchQuery);
    return matchesGenre && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = filteredMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cinema-gold/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cinema-gold/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              دسته‌بندی <span className="text-cinema-gold">فیلم‌ها</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              فیلم‌های مورد علاقه‌ات رو بر اساس ژانر پیدا کن
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="جستجوی فیلم..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl py-4 pr-12 pl-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cinema-gold/50 focus:ring-2 focus:ring-cinema-gold/20 transition-all"
              />
            </div>
          </motion.div>

          {/* Genre Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {genres.map((genre, index) => {
              const Icon = genre.icon;
              const isActive = selectedGenre === genre.id;
              
              return (
                <motion.button
                  key={genre.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleGenreChange(genre.id)}
                  className={`
                    relative flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${genre.color} text-white shadow-lg shadow-cinema-gold/20` 
                      : "bg-card/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-cinema-gold/30"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{genre.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeGenre"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 to-transparent"
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {paginatedMovies.length > 0 ? (
            <>
              <motion.div
                key={`${selectedGenre}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
              >
                {paginatedMovies.map((movie, index) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating}
                    genre={genres.find(g => g.id === movie.genre)?.name || "اکشن"}
                    image={movie.image}
                    quality={movie.quality}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <Pagination>
                    <PaginationContent className="gap-2">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={`
                            bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-cinema-gold/10 hover:border-cinema-gold/30 cursor-pointer
                            ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                          `}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className={`
                              cursor-pointer transition-all duration-300
                              ${currentPage === page 
                                ? "bg-gradient-to-r from-cinema-gold to-amber-600 text-white border-cinema-gold shadow-lg shadow-cinema-gold/30" 
                                : "bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-cinema-gold/10 hover:border-cinema-gold/30"
                              }
                            `}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={`
                            bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-cinema-gold/10 hover:border-cinema-gold/30 cursor-pointer
                            ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                          `}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card/50 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">فیلمی پیدا نشد!</h3>
              <p className="text-muted-foreground">لطفاً فیلتر دیگری انتخاب کنید</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
