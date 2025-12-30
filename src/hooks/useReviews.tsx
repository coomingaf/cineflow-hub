import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface Review {
  id: string;
  user_id: string;
  movie_id: string;
  rating: number;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
  profile?: {
    username: string | null;
    avatar_url: string | null;
  };
}

export const useReviews = (movieId: string) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review | null>(null);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('movie_id', movieId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles for each review
      const reviewsWithProfiles = await Promise.all(
        (data || []).map(async (review) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username, avatar_url')
            .eq('user_id', review.user_id)
            .maybeSingle();

          return {
            ...review,
            profile: profileData || { username: null, avatar_url: null },
          };
        })
      );

      setReviews(reviewsWithProfiles);

      // Find user's review
      if (user) {
        const myReview = reviewsWithProfiles.find(r => r.user_id === user.id);
        setUserReview(myReview || null);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (rating: number, content: string) => {
    if (!user) {
      toast.error('برای ثبت نظر باید وارد شوید');
      return { error: new Error('Not authenticated') };
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          movie_id: movieId,
          rating,
          content,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('نظر شما با موفقیت ثبت شد');
      await fetchReviews();
      return { error: null, data };
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('شما قبلاً برای این فیلم نظر ثبت کرده‌اید');
      } else {
        toast.error('خطا در ثبت نظر');
      }
      return { error };
    }
  };

  const updateReview = async (reviewId: string, rating: number, content: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { error } = await supabase
        .from('reviews')
        .update({ rating, content })
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('نظر شما بروزرسانی شد');
      await fetchReviews();
      return { error: null };
    } catch (error: any) {
      toast.error('خطا در بروزرسانی نظر');
      return { error };
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('نظر شما حذف شد');
      setUserReview(null);
      await fetchReviews();
      return { error: null };
    } catch (error: any) {
      toast.error('خطا در حذف نظر');
      return { error };
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId, user]);

  return {
    reviews,
    loading,
    userReview,
    addReview,
    updateReview,
    deleteReview,
    refetch: fetchReviews,
  };
};