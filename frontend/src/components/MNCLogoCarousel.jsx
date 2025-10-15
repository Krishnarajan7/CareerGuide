"use client";
import { motion } from "framer-motion";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { companyLogos } from "@/components/CompanyLogos";

const InfiniteSliderHorizontal = ({ items, reverse = false }) => {
  const duplicatedItems = [...items, ...items];

  return (
    <motion.div
      className="overflow-hidden py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"], // <-- reverse scroll direction
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 mx-2 sm:mx-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            whileHover={{ scale: 1.1, opacity: 1 }}
            initial={{ opacity: 0.7 }}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};


const MNCLogoCarousel = ({ refProp }) => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-muted/20">
      <div
        ref={refProp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate"
      >
        <motion.div
          className="text-center mb-6 md:mb-8 lg:mb-10"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <GradientHeading size="lg" className="mb-4">
            Get Internships from <span className="gradient-text">Top MNCs</span>
          </GradientHeading>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Partnering with industry leaders to provide unparalleled opportunities
            for your growth.
          </p>
        </motion.div>
        <div className="space-y-6 md:space-y-8">
          {/* Top row: left to right */}
          <InfiniteSliderHorizontal items={companyLogos} reverse={false} />
          {/* Bottom row: right to left (opposite) */}
          <InfiniteSliderHorizontal items={companyLogos} reverse={true} />
        </div>
      </div>
    </section>
  );
};

export default MNCLogoCarousel;
