import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const SubGroupCard = ({ subgroup = {}, onSelect = () => {} }) => (
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
      className="group cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary/30 h-[160px] md:h-[180px] lg:h-[200px] relative overflow-hidden"
      onClick={() => subgroup?.slug && onSelect(subgroup.slug)}
    >
      {/* Subtle hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

      <CardContent className="p-3 md:p-4 text-center relative z-10 flex flex-col justify-between h-full">
        {/* Icon container with fallback */}
        <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {subgroup?.icon ? (
            <subgroup.icon
              className="h-5 w-5 md:h-6 md:w-6 text-primary"
              strokeWidth={2}
            />
          ) : (
            <span className="text-[10px] text-muted-foreground">No Icon</span>
          )}
        </div>

        {/* Title and Description */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h4 className="font-semibold mb-1 text-sm md:text-base line-clamp-1">
              {subgroup?.title || "Untitled"}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {subgroup?.description || "No description available."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default SubGroupCard;
