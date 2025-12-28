import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Send, User, Mail, Calendar, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { z } from 'zod';

const requestSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').max(100),
  email: z.string().email('ایمیل معتبر نیست').max(255),
  movieTitle: z.string().min(2, 'نام فیلم باید حداقل ۲ کاراکتر باشد').max(200),
  movieYear: z.string().max(10).optional(),
  description: z.string().max(1000).optional(),
});

const RequestMovie = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    movieTitle: '',
    movieYear: '',
    description: '',
  });

  const validateForm = () => {
    try {
      requestSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { error } = await supabase
        .from('movie_requests')
        .insert({
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          movie_title: formData.movieTitle,
          movie_year: formData.movieYear || null,
          description: formData.description || null,
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success('درخواست شما با موفقیت ثبت شد');
    } catch {
      toast.error('خطا در ثبت درخواست');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">درخواست ثبت شد!</h1>
              <p className="text-muted-foreground mb-8">
                با تشکر از درخواست شما. تیم ما در اسرع وقت فیلم مورد نظر را بررسی و اضافه خواهد کرد.
              </p>
              <Button variant="cinema" size="lg" onClick={() => setSubmitted(false)}>
                ثبت درخواست جدید
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 glow">
              <Film className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">درخواست فیلم</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              فیلم یا سریال مورد نظرتان را پیدا نکردید؟ درخواست دهید تا اضافه کنیم!
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-strong rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      نام شما
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="نام و نام خانوادگی"
                    />
                    {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      ایمیل
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Film className="w-4 h-4 text-primary" />
                      نام فیلم / سریال
                    </label>
                    <input
                      type="text"
                      value={formData.movieTitle}
                      onChange={(e) => setFormData({ ...formData, movieTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="مثال: Inception"
                    />
                    {errors.movieTitle && <p className="text-destructive text-sm">{errors.movieTitle}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      سال انتشار (اختیاری)
                    </label>
                    <input
                      type="text"
                      value={formData.movieYear}
                      onChange={(e) => setFormData({ ...formData, movieYear: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                      placeholder="مثال: 2010"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    توضیحات (اختیاری)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none h-32"
                    placeholder="اگر اطلاعات بیشتری دارید اینجا بنویسید..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="cinema"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-pulse">در حال ارسال...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 ml-2" />
                      ارسال درخواست
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RequestMovie;
