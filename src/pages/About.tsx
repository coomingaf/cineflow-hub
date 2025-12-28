import { motion } from 'framer-motion';
import { Film, Users, Award, Heart, Shield, Zap, Globe, Headphones } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const features = [
  {
    icon: Zap,
    title: 'سرعت بالا',
    description: 'سرورهای پرسرعت برای دانلود و پخش بدون وقفه'
  },
  {
    icon: Shield,
    title: 'امنیت کامل',
    description: 'رمزنگاری پیشرفته برای حفاظت از اطلاعات شما'
  },
  {
    icon: Globe,
    title: 'دسترسی جهانی',
    description: 'پخش و دانلود از هر نقطه جهان'
  },
  {
    icon: Headphones,
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم پشتیبانی همیشه در دسترس شما'
  },
];

const stats = [
  { value: '۵۰,۰۰۰+', label: 'فیلم و سریال' },
  { value: '۲ میلیون+', label: 'کاربر فعال' },
  { value: '۹۸٪', label: 'رضایت کاربران' },
  { value: '۵ سال', label: 'تجربه' },
];

const team = [
  { name: 'علی محمدی', role: 'مدیرعامل', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
  { name: 'سارا احمدی', role: 'مدیر فنی', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  { name: 'محمد حسینی', role: 'طراح ارشد', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
  { name: 'نیلوفر کریمی', role: 'مدیر محتوا', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 glow">
              <Film className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">درباره سینما پلاس</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              سینما پلاس از سال ۱۳۹۸ با هدف ارائه بهترین و جدیدترین فیلم‌ها و سریال‌های جهان 
              با کیفیت بالا و زیرنویس فارسی به علاقه‌مندان سینما خدمت می‌کند. ما متعهد به 
              ارائه بهترین تجربه تماشای آنلاین هستیم.
            </p>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">چرا سینما پلاس؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ما با ارائه خدمات متمایز، تجربه‌ای بی‌نظیر از تماشای فیلم را برای شما فراهم می‌کنیم
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center group hover:bg-primary/5 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-4 mb-20">
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl font-bold">ماموریت ما</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  ماموریت ما در سینما پلاس، ارائه دسترسی آسان و با کیفیت به بهترین محتوای سینمایی جهان 
                  برای تمام کاربران فارسی‌زبان است. ما معتقدیم که همه باید بتوانند از لذت تماشای 
                  فیلم‌های باکیفیت بهره‌مند شوند.
                </p>
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-accent" />
                  <h2 className="text-3xl font-bold">چشم‌انداز ما</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  تبدیل شدن به بزرگترین و محبوب‌ترین پلتفرم پخش و دانلود فیلم در خاورمیانه 
                  با ارائه محتوای متنوع، کیفیت بالا و تجربه کاربری بی‌نظیر.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="aspect-video rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800"
                    alt="Cinema"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">تیم ما</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              افراد پرشور و متخصصی که سینما پلاس را می‌سازند
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
