import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import { motion } from "framer-motion";

const YearPaperButton = ({ year, subject, category, onView }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ 
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.2 
    }}
  >
    <Button
      variant="outline"
      size="sm"
      className="flex items-center justify-between w-full mb-2 group"
      onClick={(e) => {
        e.stopPropagation();
        onView({ category, subject: subject.title, year });
      }}
    >
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-2" strokeWidth={2} />
        {year} Question Paper
      </div>
      <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" strokeWidth={2} />
    </Button>
  </motion.div>
);

export default YearPaperButton;