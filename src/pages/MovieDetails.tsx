import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Play, Download, Star, Clock, Calendar, Heart, Share2, 
  ChevronLeft, MessageCircle, ThumbsUp, Send, ArrowRight, User, Trash2, Loader2
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useReviews } from "@/hooks/useReviews";
import { useFavorites } from "@/hooks/useFavorites";

import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";

const movieData = {
  id: "1",
  title: "اوپنهایمر",
  englishTitle: "Oppenheimer",
  year: "2023",
  rating: "8.9",
  duration: "180 دقیقه",
  genre: ["درام", "تاریخی", "بیوگرافی"],
  director: "کریستوفر نولان",
  country: "آمریکا",
  language: "انگلیسی",
  quality: "BluRay 1080p",
  image: movie1,
  trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
  plot: "داستان جی. رابرت اوپنهایمر، فیزیکدان نظری آمریکایی که نقش کلیدی در توسعه اولین سلاح‌های هسته‌ای به عنوان بخشی از پروژه منهتن داشت. این فیلم زندگی، کار و تأثیر او را بر تاریخ بشریت بررسی می‌کند. نولان با استفاده از تکنیک‌های سینمایی منحصر به فرد خود، داستانی پیچیده و عمیق از یک دانشمند که با عواقب اختراع خود دست و پنجه نرم می‌کند، روایت می‌کند.",
  cast: [
    { name: "کیلین مورفی", role: "جی. رابرت اوپنهایمر", image: movie1 },
    { name: "امیلی بلانت", role: "کیتی اوپنهایمر", image: movie2 },
    { name: "مت دیمون", role: "لزلی گروز", image: movie3 },
    { name: "رابرت داونی جونیور", role: "لوئیس استراوس", image: movie4 },
  ],
  downloads: [
    { quality: "BluRay 1080p", size: "2.5 GB", encoder: "YIFY" },
    { quality: "BluRay 720p", size: "1.2 GB", encoder: "YIFY" },
    { quality: "BluRay 480p", size: "650 MB", encoder: "YIFY" },
    { quality: "WEB-DL 1080p", size: "3.8 GB", encoder: "SPARKS" },
    { quality: "4K UHD", size: "15 GB", encoder: "TERMINAL" },
  ],
  similarMovies: [
    { title: "دانکرک", year: "2017", rating: "7.8", genre: "جنگی", image: movie2, quality: "BluRay" },
    { title: "اینترستلار", year: "2014", rating: "8.6", genre: "علمی-تخیلی", image: movie3, quality: "BluRay" },
    { title: "تنت", year: "2020", rating: "7.3", genre: "اکشن", image: movie4, quality: "WEB-DL" },
  ]
};

const MovieDetails = () => {
  const { id } = useParams();
  const movieId = id || "1";
  
  const { user } = useAuth();
  const { reviews, loading: reviewsLoading, userReview, addReview, deleteReview } = useReviews(movieId);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [showTrailer, setShowTrailer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isLiked = isFavorite(movieId);

  const handleToggleFavorite = async () => {
    if (isLiked) {
      await removeFavorite(movieId);
    } else {
      await addFavorite(movieId, movieData.title, movieData.image);
    }
  };

  const handleSubmitReview = async () => {
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    await addReview(newRating, newComment);
    setNewComment("");
    setNewRating(5);
    setSubmitting(false);
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteReview(reviewId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'امروز';
    if (diffDays === 1) return 'دیروز';
    if (diffDays < 7) return `${diffDays} روز پیش`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
    return `${Math.floor(diffDays / 30)} ماه پیش`;
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <section className="relative pt-20 min-h-[70vh]">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img 
            src={movieData.image} 
            alt={movieData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-12">
          {/* Back Button */}
          <Link to="/categories">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
              <span>بازگشت به لیست فیلم‌ها</span>
            </motion.div>
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0"
            >
              <div className="relative w-64 md:w-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 group">
                <img 
                  src={movieData.image} 
                  alt={movieData.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <motion.div 
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center transition-opacity cursor-pointer"
                  onClick={() => setShowTrailer(true)}
                >
                  <div className="w-20 h-20 rounded-full bg-cinema-gold flex items-center justify-center">
                    <Play className="w-10 h-10 text-black fill-black" />
                  </div>
                </motion.div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-cinema-gold text-black text-sm font-bold">
                  {movieData.quality}
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {movieData.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{movieData.englishTitle}</p>

              {/* Rating & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-cinema-gold/20 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-cinema-gold fill-cinema-gold" />
                  <span className="text-cinema-gold font-bold text-lg">{movieData.rating}</span>
                  <span className="text-muted-foreground text-sm">/ 10</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{movieData.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>{movieData.year}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movieData.genre.map((g) => (
                  <span key={g} className="px-4 py-2 rounded-xl bg-card/50 border border-border/50 text-sm">
                    {g}
                  </span>
                ))}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  <p className="text-muted-foreground text-sm mb-1">کارگردان</p>
                  <p className="text-foreground font-medium">{movieData.director}</p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  <p className="text-muted-foreground text-sm mb-1">کشور</p>
                  <p className="text-foreground font-medium">{movieData.country}</p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  <p className="text-muted-foreground text-sm mb-1">زبان</p>
                  <p className="text-foreground font-medium">{movieData.language}</p>
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  <p className="text-muted-foreground text-sm mb-1">کیفیت</p>
                  <p className="text-foreground font-medium">{movieData.quality}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="cinema" 
                  size="lg" 
                  className="gap-2"
                  onClick={() => setShowTrailer(true)}
                >
                  <Play className="w-5 h-5" />
                  پخش تریلر
                </Button>
                <Button variant="cinema-outline" size="lg" className="gap-2">
                  <Download className="w-5 h-5" />
                  دانلود فیلم
                </Button>
                <Button 
                  variant="cinema-ghost" 
                  size="icon"
                  onClick={handleToggleFavorite}
                  className={isLiked ? "text-red-500" : ""}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="cinema-ghost" size="icon">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      {showTrailer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowTrailer(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={movieData.trailer}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </motion.div>
          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-8 right-8 text-white hover:text-cinema-gold transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </motion.div>
      )}

      {/* Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="story" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-1 mb-8">
              <TabsTrigger value="story" className="flex-1 data-[state=active]:bg-cinema-gold data-[state=active]:text-black rounded-lg">
                داستان
              </TabsTrigger>
              <TabsTrigger value="cast" className="flex-1 data-[state=active]:bg-cinema-gold data-[state=active]:text-black rounded-lg">
                بازیگران
              </TabsTrigger>
              <TabsTrigger value="download" className="flex-1 data-[state=active]:bg-cinema-gold data-[state=active]:text-black rounded-lg">
                دانلود
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 data-[state=active]:bg-cinema-gold data-[state=active]:text-black rounded-lg">
                نظرات ({reviews.length})
              </TabsTrigger>
            </TabsList>

            {/* Story Tab */}
            <TabsContent value="story">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-1 h-8 bg-cinema-gold rounded-full" />
                    خلاصه داستان
                  </h3>
                  <p className="text-muted-foreground leading-8 text-lg">{movieData.plot}</p>
                </div>
              </motion.div>
            </TabsContent>

            {/* Cast Tab */}
            <TabsContent value="cast">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
              >
                {movieData.cast.map((actor, index) => (
                  <motion.div
                    key={actor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-4 text-center group hover:border-cinema-gold/50 transition-all"
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border group-hover:border-cinema-gold transition-colors">
                      <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-foreground font-semibold mb-1">{actor.name}</h4>
                    <p className="text-muted-foreground text-sm">{actor.role}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Download Tab */}
            <TabsContent value="download">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto space-y-4"
              >
                {movieData.downloads.map((dl, index) => (
                  <motion.div
                    key={dl.quality}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-5 hover:border-cinema-gold/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-cinema-gold/20 flex items-center justify-center group-hover:bg-cinema-gold/30 transition-colors">
                        <Download className="w-6 h-6 text-cinema-gold" />
                      </div>
                      <div>
                        <h4 className="text-foreground font-semibold">{dl.quality}</h4>
                        <p className="text-muted-foreground text-sm">{dl.encoder} • {dl.size}</p>
                      </div>
                    </div>
                    <Button variant="cinema" className="gap-2">
                      <Download className="w-4 h-4" />
                      دانلود
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                {/* Add Comment */}
                {user ? (
                  !userReview && (
                    <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-6 mb-8">
                      <h4 className="text-foreground font-semibold mb-4 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-cinema-gold" />
                        نظر خود را بنویسید
                      </h4>
                      
                      {/* Rating Selection */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-muted-foreground text-sm">امتیاز شما:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewRating(star)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-6 h-6 ${star <= newRating ? "text-cinema-gold fill-cinema-gold" : "text-muted-foreground"}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="نظرتان درباره این فیلم چیست؟"
                          className="flex-1 bg-background/50 border border-border/50 rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cinema-gold/50 resize-none h-24"
                        />
                        <Button 
                          variant="cinema" 
                          size="icon" 
                          className="self-end"
                          onClick={handleSubmitReview}
                          disabled={submitting || !newComment.trim()}
                        >
                          {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <Send className="w-5 h-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-6 mb-8 text-center">
                    <p className="text-muted-foreground mb-4">برای ثبت نظر باید وارد حساب کاربری شوید</p>
                    <Button variant="cinema" asChild>
                      <Link to="/auth">ورود / ثبت نام</Link>
                    </Button>
                  </div>
                )}

                {/* Comments List */}
                {reviewsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-card/30 backdrop-blur-sm border rounded-2xl p-6 ${
                          review.user_id === user?.id ? 'border-cinema-gold/50' : 'border-border/30'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              {review.profile?.avatar_url ? (
                                <img src={review.profile.avatar_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-6 h-6 text-primary-foreground" />
                              )}
                            </div>
                            <div>
                              <h5 className="text-foreground font-semibold">
                                {review.profile?.username || 'کاربر'}
                                {review.user_id === user?.id && (
                                  <span className="text-cinema-gold text-sm mr-2">(شما)</span>
                                )}
                              </h5>
                              <p className="text-muted-foreground text-sm">{formatDate(review.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "text-cinema-gold fill-cinema-gold" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                            {review.user_id === user?.id && (
                              <button 
                                onClick={() => handleDeleteReview(review.id)}
                                className="p-1 rounded-lg hover:bg-destructive/20 text-destructive transition-colors mr-2"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-7">{review.content}</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/30">
                          <button className="flex items-center gap-2 text-muted-foreground hover:text-cinema-gold transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{review.likes}</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>هنوز نظری ثبت نشده است. اولین نفری باشید که نظر می‌دهید!</p>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Similar Movies */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-cinema-gold rounded-full" />
            فیلم‌های مشابه
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movieData.similarMovies.map((movie, index) => (
              <MovieCard key={movie.title} {...movie} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MovieDetails;