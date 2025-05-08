"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapacidadCardProps {
  iconSmall: { src: string; alt: string };
  imageMain: { src: string; alt: string };
  title: string;
  description: string;
  className?: string;
  hFull?: boolean;
  index?: number;
}

const CapacidadCard: React.FC<CapacidadCardProps> = ({
  iconSmall,
  imageMain,
  title,
  description,
  className = "",
  hFull = false,
  index = 0,
}) => {
  // References for animations
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Create a staggered animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%", // Start animation when the top of the card reaches 85% from the top of viewport
        toggleActions: "play none none none",
      },
      defaults: { ease: "power3.out" },
    });

    // Initial state - hidden and with a slight offset
    gsap.set(cardRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
    });

    // Card reveal animation with slight delay based on index
    tl.to(cardRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: index * 0.15, // Stagger effect based on card index
    });

    // Icon animation
    tl.fromTo(
      iconRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      "-=0.4"
    );

    // Main image animation
    tl.fromTo(
      imageRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    );

    // Title animation
    tl.fromTo(
      titleRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      "-=0.4"
    );

    // Description animation
    tl.fromTo(
      descriptionRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
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
      className={`relative p-[1px] rounded-lg bg-gradient-to-b from-[#801AE5] to-[#09CE69] ${className} opacity-0`} // Start with opacity 0
    >
      <div
        className={`bg-[#0C0D14]/90 rounded-lg p-6${hFull ? " h-full" : ""}`}
      >
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
        <Image
          ref={imageRef}
          src={imageMain.src}
          alt={imageMain.alt}
          width={100}
          height={100}
          className="mx-auto"
        />
        <h2 ref={titleRef} className="pt-4 pb-1">
          {title}
        </h2>
        <p ref={descriptionRef} className="text-gray-400">
          {description}
        </p>
      </div>
    </article>
  );
};

export default CapacidadCard;
