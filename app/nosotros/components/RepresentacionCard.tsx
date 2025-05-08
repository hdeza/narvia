import Image from "next/image";
import React from "react";

interface CapacidadCardProps {
  iconSmall: { src: string; alt: string };
  title: string;
  description: string;
  className?: string;
  hFull?: boolean;
}

const RepresentacionCard: React.FC<CapacidadCardProps> = ({
  iconSmall,
  title,
  description,
  className = "",
}) => (
  <article
    className={`relative p-[1px] rounded-lg border-1 border-gray-400 h-full ${className}`}
  >
    <div className="bg-[#0C0D14]/30 rounded-lg p-6 h-full flex flex-col">
      <div className="mb-4">
        <div className="inline-flex items-center justify-center p-2 rounded-full border-2 border-[#09CE69] bg-[#09CE69]/10">
          <Image
            src={iconSmall.src}
            alt={iconSmall.alt}
            width={25}
            height={25}
          />
        </div>
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  </article>
);

export default RepresentacionCard;
