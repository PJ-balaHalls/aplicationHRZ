"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Accessibility, X } from "lucide-react";
import { AccessibilityDrawer } from "./accessibility-drawer";

export function AccessibilityTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    const screenWidth = window.innerWidth;
    const currentX = info.point.x;
    
    // Calcula snap para a lateral mais próxima (Margem de 24px)
    const targetX = currentX > screenWidth / 2 ? 0 : -(screenWidth - 80);

    controls.start({
      x: targetX,
      transition: { type: "spring", stiffness: 400, damping: 30 }
    });
  };

  if (!mounted || !isVisible) return null;

  return (
    <>
      <motion.div
        drag
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={controls}
        initial={{ x: 0 }}
        style={{ position: "fixed", bottom: 40, right: 24, zIndex: 100 }}
        className="flex flex-col items-end gap-2 cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
              className="bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] p-1.5 rounded-full hover:text-[var(--color-hrz-red)] transition-all shadow-sm"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-[var(--color-background)] border-2 border-[var(--color-border)] text-[var(--color-text-primary)] p-4 rounded-full shadow-2xl flex items-center justify-center hover:border-[var(--color-hrz-red)] transition-all"
        >
          <Accessibility size={22} strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      <AccessibilityDrawer isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}