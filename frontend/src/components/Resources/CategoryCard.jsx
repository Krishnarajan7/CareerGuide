import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const CategoryCard = ({ category, onSelect }) => (
  <motion.div
    whileHover={{ 
      y: "-8px", 
      scale: 1.02 
    }}
    whileTap={{ scale: 0.98 }}
    transition={{ 
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.3 
    }}
    className="w-full"
  >
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-primary/50 h-[280px] relative overflow-hidden md:h-[300px] lg:h-[320px]"
      onClick={() => onSelect(category.slug)}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardContent className="p-4 md:p-6 text-center relative z-10 flex flex-col justify-between h-full">
        <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg group-hover:shadow-primary/20`}>
          <category.icon className={`h-6 w-6 md:h-8 md:w-8 ${category.iconColor}`} strokeWidth={2} />
        </div>
        <div className="flex-1 flex items-center justify-center px-2">
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {category.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground group-hover:text-muted-foreground/80 leading-relaxed line-clamp-3 px-1">
              {category.subtitle}
            </p>
          </div>
        </div>
        <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500 mt-2 md:mt-4 mx-auto`}></div>
      </CardContent>
    </Card>
  </motion.div>
);

export default CategoryCard;