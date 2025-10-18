import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SubjectCard = ({ subject = {}, onSelect = () => {} }) => (
  <motion.div
    whileHover={{ y: "-4px", scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 17,
      duration: 0.2,
    }}
    className="w-full"
  >
    <Card
      className="group cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-secondary/30 h-[120px] md:h-[140px] lg:h-[160px] relative overflow-hidden"
      onClick={() => subject?.slug && onSelect(subject.slug)}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

      <CardContent className="p-3 md:p-4 text-center relative z-10 flex flex-col justify-between h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h4 className="font-semibold mb-1 text-sm md:text-base line-clamp-1">
              {subject?.title || "Untitled"}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {subject?.description || "No description available."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default SubjectCard;
