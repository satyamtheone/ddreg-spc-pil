import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface CardData {
  title: string;
  icon: string;
  iconBgColor: string;
  value: string;
  stats: string;
  statsColor?: string;
  isTrendingUp?: boolean;
}

interface CardsProps {
  cards: CardData[];
}

export const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-4 gap-3.5">
      {cards.map((card, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="space-y-0.5">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-medium">{card.value}</div>
              <div
                className="flex items-center justify-center rounded-lg p-3"
                style={{
                  backgroundColor: card.iconBgColor,
                }}
              >
                <Image
                  src={`/dashboard/cards/${card.icon}`}
                  alt={card.title}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-sm text-smtext-theme-secondary">
              {card.title}
            </div>
            <div className="flex items-center gap-1">
              {(card.isTrendingUp ?? true) ? (
                <TrendingUp
                  className="w-4 h-4"
                  style={{ color: card.statsColor }}
                />
              ) : (
                <TrendingDown
                  className="w-4 h-4"
                  style={{ color: card.statsColor }}
                />
              )}
              <span
                className="text-xs font-medium"
                style={{ color: card.statsColor }}
              >
                {card.stats}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
