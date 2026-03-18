import { motion } from "motion/react";

export function HumanoidIllustration() {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background circle */}
      <circle cx="400" cy="400" r="350" fill="#f0f9ff" opacity="0.5" />

      {/* Robot/Humanoid figure */}
      <g>
        {/* Head */}
        <motion.rect
          x="340"
          y="200"
          width="120"
          height="120"
          rx="20"
          fill="#06b6d4"
          initial={{ y: 195 }}
          animate={{ y: [195, 205, 195] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Eyes */}
        <motion.circle
          cx="370"
          cy="240"
          r="8"
          fill="#ffffff"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="430"
          cy="240"
          r="8"
          fill="#ffffff"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Antenna */}
        <line x1="400" y1="200" x2="400" y2="170" stroke="#06b6d4" strokeWidth="4" />
        <circle cx="400" cy="165" r="8" fill="#0ea5e9" />

        {/* Body */}
        <rect x="330" y="340" width="140" height="180" rx="15" fill="#0891b2" />
        
        {/* Chest panel */}
        <rect x="360" y="370" width="80" height="60" rx="8" fill="#ecfeff" opacity="0.3" />
        
        {/* Display/Screen on chest */}
        <motion.g
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <rect x="370" y="380" width="60" height="8" rx="4" fill="#06b6d4" />
          <rect x="370" y="395" width="45" height="8" rx="4" fill="#06b6d4" />
          <rect x="370" y="410" width="50" height="8" rx="4" fill="#06b6d4" />
        </motion.g>

        {/* Left arm */}
        <motion.g
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ transformOrigin: "310px 360px" }}
        >
          <rect x="270" y="350" width="50" height="140" rx="25" fill="#0891b2" />
          <circle cx="295" cy="505" r="20" fill="#06b6d4" />
        </motion.g>

        {/* Right arm */}
        <motion.g
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ transformOrigin: "490px 360px" }}
        >
          <rect x="480" y="350" width="50" height="140" rx="25" fill="#0891b2" />
          <circle cx="505" cy="505" r="20" fill="#06b6d4" />
        </motion.g>

        {/* Left leg */}
        <rect x="350" y="530" width="45" height="120" rx="22" fill="#0891b2" />
        <rect x="345" y="650" width="55" height="30" rx="15" fill="#06b6d4" />

        {/* Right leg */}
        <rect x="405" y="530" width="45" height="120" rx="22" fill="#0891b2" />
        <rect x="400" y="650" width="55" height="30" rx="15" fill="#06b6d4" />
      </g>

      {/* Floating data elements */}
      <motion.g
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
      >
        <rect x="200" y="250" width="80" height="60" rx="8" fill="#e0f2fe" stroke="#06b6d4" strokeWidth="2" />
        <line x1="220" y1="270" x2="260" y2="270" stroke="#06b6d4" strokeWidth="3" />
        <line x1="220" y1="285" x2="250" y2="285" stroke="#06b6d4" strokeWidth="3" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        <circle cx="580" cy="280" r="40" fill="#e0f2fe" stroke="#06b6d4" strokeWidth="2" />
        <path d="M 560 280 L 580 260 L 600 280 L 580 300 Z" fill="#06b6d4" />
      </motion.g>

      {/* Gears */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "180px 450px" }}
      >
        <circle cx="180" cy="450" r="35" fill="none" stroke="#06b6d4" strokeWidth="3" />
        <circle cx="180" cy="450" r="20" fill="#06b6d4" />
        <rect x="175" y="415" width="10" height="70" fill="#06b6d4" />
        <rect x="145" y="445" width="70" height="10" fill="#06b6d4" />
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "620px 480px" }}
      >
        <circle cx="620" cy="480" r="30" fill="none" stroke="#0ea5e9" strokeWidth="3" />
        <circle cx="620" cy="480" r="15" fill="#0ea5e9" />
        <rect x="616" y="450" width="8" height="60" fill="#0ea5e9" />
        <rect x="590" y="476" width="60" height="8" fill="#0ea5e9" />
      </motion.g>

      {/* Graph/Chart */}
      <motion.g
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "240px 600px" }}
      >
        <rect x="180" y="560" width="120" height="80" rx="8" fill="#e0f2fe" stroke="#06b6d4" strokeWidth="2" />
        <polyline points="200,620 220,600 240,610 260,585 280,595" fill="none" stroke="#06b6d4" strokeWidth="3" />
        <line x1="190" y1="630" x2="190" y2="570" stroke="#94a3b8" strokeWidth="1" />
        <line x1="190" y1="630" x2="285" y2="630" stroke="#94a3b8" strokeWidth="1" />
      </motion.g>

      {/* Search/Magnifier */}
      <motion.g
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <circle cx="550" cy="600" r="30" fill="none" stroke="#06b6d4" strokeWidth="4" />
        <line x1="572" y1="622" x2="595" y2="645" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
      </motion.g>

      {/* Document/File */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        <rect x="520" y="160" width="70" height="90" rx="5" fill="#e0f2fe" stroke="#06b6d4" strokeWidth="2" />
        <line x1="535" y1="180" x2="575" y2="180" stroke="#06b6d4" strokeWidth="2" />
        <line x1="535" y1="200" x2="575" y2="200" stroke="#06b6d4" strokeWidth="2" />
        <line x1="535" y1="220" x2="565" y2="220" stroke="#06b6d4" strokeWidth="2" />
      </motion.g>

      {/* Connection lines */}
      <motion.line
        x1="295"
        y1="490"
        x2="240"
        y2="600"
        stroke="#06b6d4"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 20] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.line
        x1="505"
        y1="490"
        x2="550"
        y2="600"
        stroke="#06b6d4"
        strokeWidth="2"
        strokeDasharray="5,5"
        animate={{ strokeDashoffset: [0, 20] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
