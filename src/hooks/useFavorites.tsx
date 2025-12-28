import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Favorite {
  id: string;
  movie_id: string;
  movie_title: string;
  movie_image: string | null;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching favorites:', error);
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const addFavorite = async (movieId: string, movieTitle: string, movieImage?: string) => {
    if (!user) {
      toast.error('برای افزودن به علاقه‌مندی‌ها باید وارد شوید');
      return false;
    }

    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: user.id,
        movie_id: movieId,
        movie_title: movieTitle,
        movie_image: movieImage || null
      });

    if (error) {
      if (error.code === '23505') {
        toast.info('این فیلم قبلاً به علاقه‌مندی‌ها اضافه شده');
      } else {
        toast.error('خطا در افزودن به علاقه‌مندی‌ها');
      }
      return false;
    }

    toast.success('به علاقه‌مندی‌ها اضافه شد');
    await fetchFavorites();
    return true;
  };

  const removeFavorite = async (movieId: string) => {
    if (!user) return false;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', movieId);

    if (error) {
      toast.error('خطا در حذف از علاقه‌مندی‌ها');
      return false;
    }

    toast.success('از علاقه‌مندی‌ها حذف شد');
    await fetchFavorites();
    return true;
  };

  const isFavorite = (movieId: string) => {
    return favorites.some(f => f.movie_id === movieId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: fetchFavorites
  };
};
