import React from "react";

// Reusable section header matching site Navigation styles
const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClass = align === "left" ? "text-left items-start" : align === "right" ? "text-right items-end" : "text-center items-center";
  return (
    <div className={`w-full flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary mb-3">
          {eyebrow}
        </span>
      )}
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="mt-3 max-w-3xl text-sm md:text-base text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;


