import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'نام باید حداقل ۲ کاراکتر باشد').max(100),
  email: z.string().email('ایمیل معتبر نیست').max(255),
  subject: z.string().min(2, 'موضوع باید حداقل ۲ کاراکتر باشد').max(200),
  message: z.string().min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد').max(2000),
});

const contactInfo = [
  { icon: Mail, title: 'ایمیل', value: 'support@cinemaplus.ir' },
  { icon: Phone, title: 'تلفن', value: '۰۲۱-۱۲۳۴۵۶۷۸' },
  { icon: MapPin, title: 'آدرس', value: 'تهران، خیابان ولیعصر' },
  { icon: Clock, title: 'ساعت کاری', value: '۲۴ ساعته / ۷ روز هفته' },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const validateForm = () => {
    try {
      contactSchema.parse(formData);
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
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) throw error;

      setSubmitted(true);
      toast.success('پیام شما با موفقیت ارسال شد');
    } catch {
      toast.error('خطا در ارسال پیام');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">تماس با ما</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              سوال، پیشنهاد یا انتقادی دارید؟ ما همیشه آماده شنیدن نظرات شما هستیم
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-8">راه‌های ارتباطی</h2>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 glass rounded-xl"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.title}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</h3>
                <div className="flex gap-4">
                  {['Instagram', 'Telegram', 'Twitter', 'YouTube'].map((social) => (
                    <motion.button
                      key={social}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="glass-strong rounded-2xl p-8 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">پیام شما ارسال شد!</h3>
                  <p className="text-muted-foreground mb-6">
                    با تشکر از تماس شما. تیم پشتیبانی در اسرع وقت پاسخ خواهد داد.
                  </p>
                  <Button variant="cinema" onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}>
                    ارسال پیام جدید
                  </Button>
                </motion.div>
              ) : (
                <div className="glass-strong rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">ارسال پیام</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">نام شما</label>
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
                        <label className="text-sm font-medium">ایمیل</label>
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

                    <div className="space-y-2">
                      <label className="text-sm font-medium">موضوع</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                        placeholder="موضوع پیام"
                      />
                      {errors.subject && <p className="text-destructive text-sm">{errors.subject}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">پیام</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none h-40"
                        placeholder="پیام خود را بنویسید..."
                      />
                      {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
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
                          ارسال پیام
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
