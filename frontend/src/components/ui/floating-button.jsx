import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

const list = {
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, staggerDirection: -1 }
  },
  hidden: {
    opacity: 0,
    transition: { when: 'afterChildren', staggerChildren: 0.1 }
  }
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 5 }
};

const btn = {
  visible: { rotate: '45deg' },
  hidden: { rotate: 0 }
};

function FloatingButton({
  className,
  children,
  triggerContent,
  triggerAriaLabel = 'Toggle floating actions'
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const triggerId = 'floating-button-trigger-' + Math.random().toString(36).substr(2, 9);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      ref={ref}
      className="flex flex-col items-center relative"
      onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
    >
      <AnimatePresence>
        <motion.ul
          className="flex flex-col items-center absolute bottom-14 gap-2"
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={list}
          aria-labelledby={triggerId}
        >
          {children}
        </motion.ul>
      </AnimatePresence>

      <motion.button
        variants={btn}
        animate={isOpen ? 'visible' : 'hidden'}
        onClick={() => setIsOpen(!isOpen)}
        id={triggerId}
        type="button"
        aria-label={triggerAriaLabel}
        aria-expanded={isOpen}
        className={className}
      >
        {triggerContent}
      </motion.button>
    </div>
  );
}

function FloatingButtonItem({ children, ariaLabel, href, onClick }) {
  return (
    <motion.li variants={item}>
      {href ? (
        <a
          href={href}
          aria-label={ariaLabel}
          className="h-12 w-12 rounded-full flex items-center justify-center text-white/80 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          aria-label={ariaLabel}
          onClick={onClick}
          className="h-12 w-12 rounded-full flex items-center justify-center text-white/80 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {children}
        </button>
      )}
    </motion.li>
  );
}

export { FloatingButton, FloatingButtonItem };
