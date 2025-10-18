import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

const LoadingOverlay = ({ message = "Preparing your resources..." }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-40"
  >
    <div className="text-center">
      <div className="relative">
        <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-primary/20 rounded-full animate-ping"></div>
      </div>
      <p className="text-lg font-medium text-foreground">{message}</p>
      <p className="text-sm text-muted-foreground mt-2">This may take a few moments...</p>
    </div>
  </motion.div>
);

export default LoadingOverlay;