import { motion } from "framer-motion";
import { Zap, Heart, Ghost, Laugh, Sword, Sparkles } from "lucide-react";

const genres = [
  { name: "اکشن", icon: Zap, color: "from-red-500 to-orange-500", count: "۳۲۴ فیلم" },
  { name: "عاشقانه", icon: Heart, color: "from-pink-500 to-rose-500", count: "۱۸۷ فیلم" },
  { name: "ترسناک", icon: Ghost, color: "from-purple-500 to-violet-600", count: "۱۵۲ فیلم" },
  { name: "کمدی", icon: Laugh, color: "from-yellow-500 to-amber-500", count: "۲۴۵ فیلم" },
  { name: "جنگی", icon: Sword, color: "from-green-500 to-emerald-600", count: "۱۱۸ فیلم" },
  { name: "انیمیشن", icon: Sparkles, color: "from-cyan-500 to-blue-500", count: "۲۰۹ فیلم" },
];

export const GenreSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            دسته‌بندی <span className="text-gradient">ژانرها</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            بر اساس سلیقه خود، بهترین فیلم‌ها و سریال‌ها را پیدا کنید
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-500">
                {/* Gradient Glow on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${genre.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${genre.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <genre.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Info */}
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-muted-foreground">{genre.count}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
