"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LineasNegocioProps {
  iconSmall: { src: string; alt: string };
  title: string;
  description: string;
  className?: string;
  hFull?: boolean;
  index?: number;
}

const LineasNegocio: React.FC<LineasNegocioProps> = ({
  iconSmall,
  title,
  description,
  className = "",
  index = 0,
}) => {
  // References for animations
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Create animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

    // Initial state - hidden with offset
    gsap.set(cardRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
    });

    // Card reveal animation with staggered delay
    tl.to(cardRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: index * 0.1, // Lighter stagger for more items
    });

    // Icon animation
    tl.fromTo(
      iconRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      "-=0.4"
    );

    // Title and description container animation
    tl.fromTo(
      [titleRef.current, descriptionRef.current],
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      "-=0.3"
    );

    // Cleanup
    return () => {
      tl.kill();
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`relative p-[1px] rounded-lg border-1 border-gray-400 ${className} opacity-0`}
    >
      <div className="bg-[#0C0D14]/30 rounded-lg p-6 h-full flex flex-col justify-between">
        <div>
          <div
            ref={iconRef}
            className="inline-flex items-center justify-center p-2 rounded-full border-2 border-[#09CE69] bg-[#09CE69]/10"
          >
            <Image
              src={iconSmall.src}
              alt={iconSmall.alt}
              width={25}
              height={25}
            />
          </div>
        </div>
        <div>
          <h2 ref={titleRef} className="pt-4 pb-1 font-bold">
            {title}
          </h2>
          <p ref={descriptionRef} className="text-gray-400 text-sm">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default LineasNegocio;
