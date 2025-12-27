import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Film, Tv, Star, Clock, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "خانه", icon: Home, href: "/" },
  { name: "فیلم‌ها", icon: Film, href: "/categories" },
  { name: "سریال‌ها", icon: Tv, href: "#series" },
  { name: "برترین‌ها", icon: Star, href: "#top" },
  { name: "به‌زودی", icon: Clock, href: "#soon" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow">
              <Film className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-gradient">سینما پلاس</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className="w-48 md:w-64 px-4 py-2 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="cinema-ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button variant="cinema" size="lg" className="hidden md:flex">
              عضویت / ورود
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="cinema-ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </motion.a>
                ))}
                <Button variant="cinema" size="lg" className="w-full mt-4">
                  عضویت / ورود
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
