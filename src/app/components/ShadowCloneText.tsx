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
  const baseTextColor = gradient 
    ? `text-transparent bg-clip-text bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`
    : "";

  return <span className={`${className} ${baseTextColor}`}>{children}</span>;
}
