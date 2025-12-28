import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useNavigate, Link } from 'react-router-dom';

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const { favorites, loading, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl">در حال بارگذاری...</div>
      </div>
    );
  }

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
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 glow">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">علاقه‌مندی‌ها</h1>
            <p className="text-xl text-muted-foreground">
              فیلم‌ها و سریال‌هایی که ذخیره کرده‌اید
            </p>
          </motion.div>

          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Film className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">لیست علاقه‌مندی‌ها خالی است</h2>
              <p className="text-muted-foreground mb-8">
                فیلم‌ها و سریال‌های مورد علاقه‌تان را اضافه کنید
              </p>
              <Button variant="cinema" size="lg" asChild>
                <Link to="/categories">مشاهده فیلم‌ها</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/movie/${favorite.movie_id}`}>
                    <div className="movie-card aspect-[2/3] rounded-xl overflow-hidden relative">
                      <img
                        src={favorite.movie_image || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400'}
                        alt={favorite.movie_title}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFavorite(favorite.movie_id);
                        }}
                        className="absolute top-3 left-3 w-10 h-10 rounded-full bg-destructive/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                      >
                        <Trash2 className="w-5 h-5 text-white" />
                      </button>
                      
                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-lg">{favorite.movie_title}</h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
