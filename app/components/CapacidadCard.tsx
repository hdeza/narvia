import Image from "next/image";
import React from "react";

interface CapacidadCardProps {
  iconSmall: { src: string; alt: string };
  imageMain: { src: string; alt: string };
  title: string;
  description: string;
  className?: string;
  hFull?: boolean;
}

const CapacidadCard: React.FC<CapacidadCardProps> = ({
  iconSmall,
  imageMain,
  title,
  description,
  className = "",
  hFull = false,
}) => (
  <article
    className={`relative p-[1px] rounded-lg bg-gradient-to-b from-[#801AE5] to-[#09CE69] ${className}`}
  >
    <div className={`bg-[#0C0D14]/90 rounded-lg p-6${hFull ? " h-full" : ""}`}>
      <div className="inline-flex items-center justify-center p-2 rounded-full border-2 border-[#09CE69] bg-[#09CE69]/10">
        <Image src={iconSmall.src} alt={iconSmall.alt} width={25} height={25} />
      </div>
      <Image
        src={imageMain.src}
        alt={imageMain.alt}
        width={100}
        height={100}
        className="mx-auto"
      />
      <h3 className="pt-4 pb-1">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </article>
);

export default CapacidadCard;
