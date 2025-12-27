import { motion } from "framer-motion";
import { Film, Instagram, Twitter, Youtube, Send, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Instagram, href: "#", label: "اینستاگرام" },
  { icon: Twitter, href: "#", label: "توییتر" },
  { icon: Youtube, href: "#", label: "یوتیوب" },
  { icon: Send, href: "#", label: "تلگرام" },
];

const footerLinks = [
  {
    title: "دسترسی سریع",
    links: ["فیلم‌ها", "سریال‌ها", "انیمیشن", "مستند", "تماشای آنلاین"],
  },
  {
    title: "ژانرها",
    links: ["اکشن", "عاشقانه", "ترسناک", "کمدی", "علمی-تخیلی"],
  },
  {
    title: "راهنما",
    links: ["درباره ما", "تماس با ما", "قوانین", "حریم خصوصی", "سوالات متداول"],
  },
];

export const Footer = () => {
  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            از جدیدترین فیلم‌ها <span className="text-gradient">باخبر شوید</span>
          </h3>
          <p className="text-muted-foreground mb-6">
            با عضویت در خبرنامه، اولین نفری باشید که از انتشار فیلم‌های جدید مطلع می‌شوید
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید..."
              className="flex-1 max-w-md px-5 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
            />
            <Button variant="cinema" size="lg">
              عضویت
            </Button>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
                <Film className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">سینما پلاس</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              مرجع دانلود فیلم و سریال با کیفیت بالا و لینک مستقیم
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 py-6 border-t border-border/50"
        >
          <a href="tel:+98" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            ۰۲۱-۱۲۳۴۵۶۷۸
          </a>
          <a href="mailto:info@cinemaplus.ir" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            info@cinemaplus.ir
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-6 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground">
            © ۱۴۰۳ سینما پلاس. تمامی حقوق محفوظ است.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
