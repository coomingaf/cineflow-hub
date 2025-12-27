import { motion } from "framer-motion";
import { Play, Star, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  title: string;
  year: string;
  rating: string;
  genre: string;
  image: string;
  quality?: string;
  index?: number;
}

export const MovieCard = ({
  title,
  year,
  rating,
  genre,
  image,
  quality = "1080p",
  index = 0,
}: MovieCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group movie-card cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quality Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-bold">
            {quality}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md glass">
          <Star className="w-3 h-3 text-cinema-gold fill-cinema-gold" />
          <span className="text-xs font-bold">{rating}</span>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full bg-primary flex items-center justify-center glow cursor-pointer"
          >
            <Play className="w-7 h-7 text-primary-foreground mr-[-2px]" />
          </motion.div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="cinema-ghost" size="icon" className="h-10 w-10">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="cinema-ghost" size="icon" className="h-10 w-10">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{year}</span>
          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
          <span className="text-primary">{genre}</span>
        </div>
      </div>
    </motion.div>
  );
};
