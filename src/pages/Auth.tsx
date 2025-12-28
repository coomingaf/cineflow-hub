import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const signUpSchema = z.object({
  username: z.string().min(3, 'نام کاربری باید حداقل ۳ کاراکتر باشد').max(50),
  email: z.string().email('ایمیل معتبر نیست').max(255),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد').max(100),
});

const signInSchema = z.object({
  email: z.string().email('ایمیل معتبر نیست').max(255),
  password: z.string().min(1, 'رمز عبور الزامی است').max(100),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      if (isLogin) {
        signInSchema.parse({ email: formData.email, password: formData.password });
      } else {
        signUpSchema.parse(formData);
      }
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
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('ایمیل یا رمز عبور اشتباه است');
          } else {
            toast.error('خطا در ورود به سیستم');
          }
        } else {
          toast.success('خوش آمدید!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.username);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('این ایمیل قبلاً ثبت شده است');
          } else {
            toast.error('خطا در ثبت‌نام');
          }
        } else {
          toast.success('ثبت‌نام موفقیت‌آمیز! خوش آمدید');
          navigate('/');
        }
      }
    } catch {
      toast.error('خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow mb-4">
            <Film className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">سینما پلاس</h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? 'به حساب خود وارد شوید' : 'یک حساب جدید بسازید'}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">نام کاربری</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full pr-11 pl-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                    placeholder="نام کاربری شما"
                  />
                </div>
                {errors.username && <p className="text-destructive text-sm">{errors.username}</p>}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pr-11 pl-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pr-11 pl-12 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              variant="cinema"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">در حال پردازش...</span>
              ) : (
                <>
                  {isLogin ? 'ورود' : 'ثبت‌نام'}
                  <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? 'حساب ندارید؟' : 'حساب دارید؟'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-primary hover:underline mr-2"
              >
                {isLogin ? 'ثبت‌نام کنید' : 'وارد شوید'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <a
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به صفحه اصلی
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;
