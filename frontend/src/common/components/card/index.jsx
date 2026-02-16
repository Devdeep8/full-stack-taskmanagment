"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Play } from "lucide-react";
import { cn } from "@/utils";

export default function GameCard({
  image,
  title,
  provider,
  isNew = false,
  isFavorite = false,
  onPlay,
  onFavorite,
  index
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onFavorite?.(!favorite);
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    onPlay?.();
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayClick}
    >
      {/* Card Container */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden transition-all duration-300",
          "border-2 border-transparent",
          
        )}
      >
        <span>
            {index}
        </span>
        {/* Game Image */}
        <div className="relative aspect-3/4 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className={cn(
              "object-cover transition-all duration-300",
              isHovered ? "brightness-50 scale-110" : "brightness-100"
            )}
          />

          {/* NEW Badge */}
          {isNew && (
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-linear-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NEW
              </span>
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "absolute top-3 right-3 z-20 p-2 rounded-lg transition-all duration-300",
              favorite
                ? "bg-pink-500 text-white scale-110"
                : "bg-purple-600/80 text-white hover:bg-purple-500",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
          >
            <Heart
              className={cn("w-5 h-5", favorite && "fill-current")}
            />
          </button>

          {/* Play Button (Hover State) */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center z-10 transition-all duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <button
              onClick={handlePlayClick}
              className="bg-green-500 hover:bg-green-400 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
            >
              <Play className="w-8 h-8 fill-current" />
            </button>
          </div>

          {/* Gradient Overlay on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-5" />
          )}
        </div>

        {/* Game Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/90 via-black/70 to-transparent z-10">
          <h3 className="text-white font-bold text-lg leading-tight mb-1">
            {title}
          </h3>
          <p className="text-white/70 text-sm">{provider}</p>
        </div>
      </div>
    </div>
  );
}