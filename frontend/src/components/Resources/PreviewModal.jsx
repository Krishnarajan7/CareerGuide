import { Button } from "@/components/ui/button";
import { X, Eye, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PreviewModal = ({ previewItem, onClose, getPdfPath }) => (
  <AnimatePresence>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // Do not close on outside click
        }
      }}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {previewItem.subject} - {previewItem.year} ({previewItem.category})
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <iframe
            src={getPdfPath(previewItem)}
            className="w-full h-[60vh] border"
            title={`${previewItem.subject} ${previewItem.year} PDF Preview`}
          />
        </div>
        <div className="p-6 border-t flex gap-4 justify-end">
          <Button
            variant="outline"
            onClick={() => {
              window.open(getPdfPath(previewItem), '_blank');
            }}
          >
            <Eye className="h-4 w-4 mr-2" strokeWidth={2} />
            View Full Size
          </Button>
          <a
            href={getPdfPath(previewItem)}
            download={`${previewItem.category}-${previewItem.subject}-${previewItem.year}.pdf`}
          >
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" strokeWidth={2} />
              Download PDF
            </Button>
          </a>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default PreviewModal;