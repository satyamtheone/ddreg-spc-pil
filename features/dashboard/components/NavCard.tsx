import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface NavCardData {
  title: string;
  icon: string;
  link: string;
  iconBgColor: string;
}

interface NavCardsProps {
  navCards: NavCardData[];
}

const NavCard: React.FC<{ card: NavCardData }> = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={card.link}
      className="flex items-center justify-center border shadow-sm rounded-xl p-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? card.iconBgColor : "white",
        transition: "background-color 0.2s ease",
      }}
    >
      <div
        className="w-full flex flex-col items-center gap-1.5 border-2 border-dashed p-3 rounded-lg"
        style={{
          borderColor: hovered ? "rgba(255,255,255,0.44)" : "#17BDD3",
          transition: "border-color 0.2s ease",
        }}
      >
        <div
          className="rounded-lg p-3 w-fit relative"
          style={{ backgroundColor: card.iconBgColor }}
        >
          {hovered && (
            <div
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
            />
          )}
          <Image
            src={`/dashboard/nav-cards/${card.icon}`}
            alt={card.title}
            width={20}
            height={20}
            className="object-contain relative z-10"
          />
        </div>
        <div
          className="text-sm text-theme-secondary"
          style={{
            color: hovered ? "white" : "",
            transition: "color 0.2s ease",
          }}
        >
          {card.title}
        </div>
      </div>
    </Link>
  );
};

export const NavCards: React.FC<NavCardsProps> = ({ navCards }) => {
  return (
    <div className="space-y-2">
      {navCards.map((card, index) => (
        <NavCard key={index} card={card} />
      ))}
    </div>
  );
};
