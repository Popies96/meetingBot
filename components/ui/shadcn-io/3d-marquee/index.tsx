"use client";
import { motion } from "motion/react";
import React from "react";

export type ThreeDMarqueeProps = {
  images: string[];
  className?: string;
};

const cn = (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" ");

export const ThreeDMarquee = ({ images, className }: ThreeDMarqueeProps) => {
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "relative mx-auto block h-[600px] overflow-hidden bg-black max-sm:h-100",
        className,
      )}
    >
      {/* Atmospheric background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }} 
      />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none" />

      <div className="flex size-full items-center justify-center">
        <div className="size-[1720px] shrink-0 scale-75 sm:scale-90 lg:scale-125">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative group" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                    
                    <motion.img
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      className="relative aspect-[970/700] rounded-lg object-cover border border-white/10 group-hover:border-blue-400/50 shadow-2xl shadow-black/50 group-hover:shadow-blue-500/20 transition-all duration-300"
                      width={970}
                      height={700}
                    />
                    
                    {/* Subtle reflection effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export type GridLineHorizontalProps = {
  className?: string;
  offset?: string;
};

const GridLineHorizontal = ({ className, offset }: GridLineHorizontalProps) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(59, 130, 246, 0.3)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(59, 130, 246, 0.3)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

export type GridLineVerticalProps = {
  className?: string;
  offset?: string;
};

const GridLineVertical = ({ className, offset }: GridLineVerticalProps) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(59, 130, 246, 0.3)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(59, 130, 246, 0.3)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

// Demo component
export default function Demo() {
  const demoImages = [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo--552664730-f46854efd67b?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=970&h=700&fit=crop",
  ];

  return <ThreeDMarquee images={demoImages} />;
}