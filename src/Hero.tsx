import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';
// This assumes the user will upload '1786759176751.jpg' to the 'src/assets/images' folder.
import heroBg from '../assets/images/30490.png';
import { Compass, ArrowDown } from 'lucide-react';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Translate values for different layers (parallax)
  const bgX = useTransform(smoothMouseX, [-1, 1], ['-2%', '2%']);
  const bgY = useTransform(smoothMouseY, [-1, 1], ['-2%', '2%']);
  
  const glowX = useTransform(smoothMouseX, [-1, 1], ['-15px', '15px']);
  const glowY = useTransform(smoothMouseY, [-1, 1], ['-15px', '15px']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="hero" className="relative w-full flex flex-col items-start justify-start pt-2 sm:pt-4 md:pt-6 overflow-hidden">
      {/* Hero Parallax Stage */}
      <div className="relative w-full min-h-[480px] sm:min-h-[580px] md:min-h-[680px] lg:min-h-[760px] h-[68vh] sm:h-[76vh] md:h-[88vh] lg:h-[92vh] flex flex-col items-start justify-center overflow-hidden cursor-crosshair">
        {/* Top Text Content - Left aligned with clear separation above the banner logo */}
        <div className="z-20 absolute top-[5%] sm:top-[6%] md:top-[8%] lg:top-[10%] inset-x-0 w-full px-6 sm:px-8 md:px-12 2xl:px-16 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[1.1] sm:leading-[1.08] text-left"
          >
            SMARTER SYSTEMS.<br />
            MAXIMUM LEVERAGE.<br />
            <span className="text-[#ffe0c2] drop-shadow-[0_0_25px_rgba(255,150,50,0.4)]">PEAK CAPABILITY.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-200 max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl font-light leading-relaxed mt-3 sm:mt-4 drop-shadow-md text-left"
          >
            An innovation foundry dedicated to engineering high-leverage tools that eliminate friction and expand human potential.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 sm:mt-6 pointer-events-auto"
          >
            <a
              href="#portfolio"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#FF5A1F] hover:bg-[#e04e18] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(255,90,31,0.4)] hover:shadow-[0_0_30px_rgba(255,90,31,0.6)] flex items-center gap-2"
            >
              <span>Explore the Ecosystem</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <a
              href="#about"
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#131B2A]/90 hover:bg-[#1f2b40] border border-[#2c3545] hover:border-[#FF5A1F]/50 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-md"
            >
              <span>About the Foundry</span>
            </a>
          </motion.div>
        </div>

        {/* Abstract Background Image with Parallax, breathing animation, and CSS sharpening */}
        <div className="absolute inset-0 z-0 top-[34%] sm:top-[28%] md:top-[22%] lg:top-[16%]">
          <motion.div 
            className="absolute inset-0 bg-[length:140%_auto] sm:bg-[length:125%_auto] md:bg-[length:115%_auto] lg:bg-cover bg-center bg-no-repeat opacity-95 contrast-[1.25] saturate-[1.3]"
            animate={{
              scale: [1.01, 1.05],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{ 
              backgroundImage: `url(${heroBg})`,
              x: bgX,
              y: bgY
            }}
          >
            {/* Gradient overlays to ensure clean transition at the top and bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/20 to-[#030508]" />
          </motion.div>
          
          {/* Artificial Glow Overlays to make the baked-in center logo POP */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ x: glowX, y: glowY }}
          >
             <motion.div 
               animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.3, 0.9] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-[#3ce1ff]/30 blur-[28px] sm:blur-[38px] md:blur-[45px] rounded-full mix-blend-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
             />
             <motion.div 
               animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.1, 0.8] }} 
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#ff9632]/35 blur-[22px] sm:blur-[30px] md:blur-[35px] rounded-full mix-blend-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
             />
          </motion.div>
        </div>
      </div>

      {/* Core Vision Script Block - Placed comfortably below banner, no enclosing card box, stretched across page */}
      <div id="core-vision" className="w-full pt-10 sm:pt-14 md:pt-20 pb-12 sm:pb-16 px-6 sm:px-8 md:px-12 2xl:px-16 z-20 scroll-mt-20 sm:scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start text-left space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Core Vision</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
              PUSHING MODERN CAPABILITY <span className="text-[#FF5A1F]">FORWARD.</span>
            </h2>
            
            <div className="space-y-4 max-w-6xl">
              <p className="text-slate-100 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed tracking-normal">
                3volve Innovations operates on a fundamental truth: optimization should never be bottlenecked by fragmented tools, repetitive workflows, or manual friction.
              </p>
              <p className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed tracking-normal">
                We identify complex operational, cognitive, and biological challenges and engineer dedicated, high-precision engines to solve them. By refusing to stay in a single lane, we treat every problem as an opportunity to push human capability forward—giving ambitious individuals maximum leverage over their biology, mind, and execution.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
