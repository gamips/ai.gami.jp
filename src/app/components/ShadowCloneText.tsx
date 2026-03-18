import { motion } from "motion/react";
import { useMemo, useState, useEffect, useRef } from "react";

interface ShadowCloneTextProps {
  children: string;
  className?: string;
  gradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  delay?: number;
}

export function ShadowCloneText({ 
  children, 
  className = "", 
  gradient = false,
  gradientFrom = "cyan-500",
  gradientTo = "blue-500",
  delay = 0,
}: ShadowCloneTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Generate random shadow clones data for each character
  const generateClones = (charCount: number) => {
    return Array.from({ length: charCount }, () => {
      const cloneCount = Math.floor(Math.random() * 5) + 4; // 4-8 clones per character
      return Array.from({ length: cloneCount }, () => ({
        x: Math.random() * 60 - 30, // -30 to 30
        y: Math.random() * 60 - 30, // -30 to 30
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.3 + 0.4, // 0.4 to 0.7
        opacity: [0, Math.random() * 0.3 + 0.7, Math.random() * 0.4 + 0.4, Math.random() * 0.3 + 0.2, 0], // varying peak opacity
      }));
    });
  };

  const chars = useMemo(() => children.split(''), [children]);
  const clones = useMemo(() => generateClones(chars.length), [chars.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  const baseTextColor = gradient 
    ? `text-transparent bg-clip-text bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`
    : "";

  const strokeColor = gradient ? "rgb(6, 182, 212)" : "currentColor";

  return (
    <span ref={ref} className={`relative ${className}`}>
      {isVisible ? (
        <motion.span
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay }}
        >
          {chars.map((char, charIndex) => (
            <span key={charIndex} className="relative inline-block">
              {/* Shadow clones for each character - outline only */}
              {clones[charIndex].map((clone, cloneIndex) => (
                <motion.span
                  key={cloneIndex}
                  className={`absolute inset-0 ${gradient ? '' : 'shadow-clone'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: clone.opacity }}
                  transition={{ duration: clone.duration, delay: delay + clone.delay }}
                  style={{ 
                    transform: `translate(${clone.x}px, ${clone.y}px)`,
                    ...(gradient ? {
                      WebkitTextStroke: '2px',
                      WebkitTextStrokeColor: strokeColor,
                      WebkitTextFillColor: 'transparent',
                      color: 'transparent'
                    } : {})
                  }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Main character - filled, appears last */}
              <motion.span
                className={`relative z-10 ${baseTextColor}`}
                style={gradient ? { WebkitTextFillColor: "transparent" } : {}}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ duration: 0.4, delay: delay + 0.3 + charIndex * 0.05 }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      ) : (
        <span className="opacity-0">{children}</span>
      )}
    </span>
  );
}
