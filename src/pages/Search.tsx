import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, X, Star, Calendar, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieCard } from '@/components/MovieCard';

import movie1 from '@/assets/movie-1.jpg';
import movie2 from '@/assets/movie-2.jpg';
import movie3 from '@/assets/movie-3.jpg';
import movie4 from '@/assets/movie-4.jpg';
import movie5 from '@/assets/movie-5.jpg';
import movie6 from '@/assets/movie-6.jpg';
import movie7 from '@/assets/movie-7.jpg';
import movie8 from '@/assets/movie-8.jpg';

const allMovies = [
  { id: '1', title: 'تلقین', year: '2010', rating: 8.8, genre: 'علمی-تخیلی', quality: '4K', image: movie1 },
  { id: '2', title: 'شوالیه تاریکی', year: '2008', rating: 9.0, genre: 'اکشن', quality: '1080p', image: movie2 },
  { id: '3', title: 'میان‌ستاره‌ای', year: '2014', rating: 8.6, genre: 'علمی-تخیلی', quality: '4K', image: movie3 },
  { id: '4', title: 'ماتریکس', year: '1999', rating: 8.7, genre: 'علمی-تخیلی', quality: '1080p', image: movie4 },
  { id: '5', title: 'پدرخوانده', year: '1972', rating: 9.2, genre: 'درام', quality: '720p', image: movie5 },
  { id: '6', title: 'جنگ ستارگان', year: '1977', rating: 8.6, genre: 'علمی-تخیلی', quality: '4K', image: movie6 },
  { id: '7', title: 'آواتار', year: '2009', rating: 7.9, genre: 'علمی-تخیلی', quality: '4K', image: movie7 },
  { id: '8', title: 'گلادیاتور', year: '2000', rating: 8.5, genre: 'اکشن', quality: '1080p', image: movie8 },
];

const genres = ['همه', 'اکشن', 'درام', 'کمدی', 'علمی-تخیلی', 'ترسناک', 'عاشقانه', 'انیمیشن'];
const years = ['همه', '2024', '2023', '2022', '2020-2021', '2010-2019', '2000-2009', 'قبل از 2000'];
const qualities = ['همه', '4K', '1080p', '720p', '480p'];
const ratings = ['همه', '۹+', '۸+', '۷+', '۶+'];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genre: 'همه',
    year: 'همه',
    quality: 'همه',
    rating: 'همه',
  });

  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      // Search query
      if (searchQuery && !movie.title.includes(searchQuery)) {
        return false;
      }
      
      // Genre filter
      if (filters.genre !== 'همه' && movie.genre !== filters.genre) {
        return false;
      }
      
      // Quality filter
      if (filters.quality !== 'همه' && movie.quality !== filters.quality) {
        return false;
      }
      
      // Rating filter
      if (filters.rating !== 'همه') {
        const minRating = parseInt(filters.rating.replace('+', '').replace('۹', '9').replace('۸', '8').replace('۷', '7').replace('۶', '6'));
        if (movie.rating < minRating) {
          return false;
        }
      }
      
      return true;
    });
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      genre: 'همه',
      year: 'همه',
      quality: 'همه',
      rating: 'همه',
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== 'همه') || searchQuery;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">جستجوی پیشرفته</h1>
            <p className="text-xl text-muted-foreground">
              فیلم مورد نظرتان را با فیلترهای پیشرفته پیدا کنید
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="relative">
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="نام فیلم یا سریال را جستجو کنید..."
                className="w-full pr-14 pl-4 py-4 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-8">
            <Button
              variant="cinema-ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'بستن فیلترها' : 'نمایش فیلترها'}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="mr-2 text-destructive hover:text-destructive"
              >
                پاک کردن فیلترها
              </Button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="glass-strong rounded-2xl p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Genre */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Film className="w-4 h-4 text-primary" />
                      ژانر
                    </label>
                    <select
                      value={filters.genre}
                      onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none"
                    >
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      سال انتشار
                    </label>
                    <select
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quality */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Film className="w-4 h-4 text-primary" />
                      کیفیت
                    </label>
                    <select
                      value={filters.quality}
                      onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none"
                    >
                      {qualities.map(quality => (
                        <option key={quality} value={quality}>{quality}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      امتیاز IMDB
                    </label>
                    <select
                      value={filters.rating}
                      onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none"
                    >
                      {ratings.map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              {filteredMovies.length} نتیجه پیدا شد
            </p>
          </div>

          {/* Movies Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MovieCard
                    title={movie.title}
                    year={movie.year}
                    rating={movie.rating.toString()}
                    genre={movie.genre}
                    image={movie.image}
                    quality={movie.quality}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">نتیجه‌ای یافت نشد</h3>
              <p className="text-muted-foreground">
                فیلترها را تغییر دهید یا عبارت جستجو را اصلاح کنید
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
