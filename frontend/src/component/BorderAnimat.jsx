function AnimatedBorder({ children }) {
  return (
    <div className="relative rounded-2xl p-[2px] overflow-hidden">
      
     
      <div
        className="
          absolute inset-0 rounded-2xl
          bg-[conic-gradient(from_0deg,#22d3ee,#a855f7,#22d3ee)]
          animate-[spin_10s_linear_infinite]
        "
      />

      {/* INNER CONTENT */}
      <div className="relative rounded-2xl bg-[#101A2E]/95 backdrop-blur-xl p-8">
        {children}
      </div>
    </div>
  );
}

export default AnimatedBorder;
