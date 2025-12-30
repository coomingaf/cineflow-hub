import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Camera, Save, Mail, Calendar, Edit3, 
  Heart, Film, MessageSquare, LogOut, Loader2 
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useFavorites } from '@/hooks/useFavorites';
import { supabase } from '@/integrations/supabase/client';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading, updateProfile, uploadAvatar } = useProfile();
  const { favorites } = useFavorites();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile]);

  useEffect(() => {
    const fetchReviewsCount = async () => {
      if (!user) return;
      const { count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setReviewsCount(count || 0);
    };
    fetchReviewsCount();
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    await updateProfile({ username });
    setSaving(false);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    setUploading(true);
    await uploadAvatar(file);
    setUploading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    { icon: Heart, label: 'علاقه‌مندی‌ها', value: favorites.length, color: 'text-red-500' },
    { icon: MessageSquare, label: 'نظرات', value: reviewsCount, color: 'text-blue-500' },
    { icon: Film, label: 'تماشا شده', value: 0, color: 'text-cinema-gold' },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Profile Header */}
            <div className="relative mb-8">
              {/* Cover Background */}
              <div className="h-48 rounded-t-3xl bg-gradient-to-br from-primary via-cinema-gold to-accent overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Profile Info Card */}
              <div className="relative -mt-20 mx-4 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div 
                      onClick={handleAvatarClick}
                      className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl cursor-pointer group"
                    >
                      {profile?.avatar_url ? (
                        <img 
                          src={profile.avatar_url} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <User className="w-16 h-16 text-primary-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {uploading ? (
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        ) : (
                          <Camera className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-right">
                    {isEditing ? (
                      <div className="flex flex-col gap-3 max-w-sm mx-auto md:mx-0">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="نام کاربری"
                          className="px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <Button 
                            variant="cinema" 
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="flex-1 gap-2"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            ذخیره
                          </Button>
                          <Button 
                            variant="cinema-ghost" 
                            onClick={() => setIsEditing(false)}
                          >
                            انصراف
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                          <h1 className="text-2xl font-bold">
                            {profile?.username || 'کاربر'}
                          </h1>
                          <button 
                            onClick={() => setIsEditing(true)}
                            className="p-1 rounded-lg hover:bg-muted transition-colors"
                          >
                            <Edit3 className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-1 text-muted-foreground">
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              عضویت: {new Date(profile?.created_at || '').toLocaleDateString('fa-IR')}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="cinema-ghost" 
                      onClick={handleSignOut}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      خروج
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorites Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  فیلم‌های مورد علاقه
                </h2>
                <Button 
                  variant="cinema-ghost" 
                  onClick={() => navigate('/favorites')}
                >
                  مشاهده همه
                </Button>
              </div>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {favorites.slice(0, 4).map((fav) => (
                    <div 
                      key={fav.id}
                      className="relative rounded-xl overflow-hidden aspect-[2/3] group cursor-pointer"
                    >
                      {fav.movie_image ? (
                        <img 
                          src={fav.movie_image} 
                          alt={fav.movie_title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Film className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-white font-medium line-clamp-2">{fav.movie_title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>هنوز فیلمی به علاقه‌مندی‌ها اضافه نکرده‌اید</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;