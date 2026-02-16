"use client";

import { useGames } from "@/components/home/hooks/useGames";
import Card from "@/common/components/card";
import BaseCarousel from "@/common/components/carasual";

export default function GameCarousel() {
  const { games, loading, error } = useGames();

  if (loading) {
    return (
      <BaseCarousel className="py-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="min-w-35">
            <div className="bg-gray-800 rounded-lg animate-pulse">
              <div className="aspect-video bg-gray-700 rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-700 rounded w-20" />
                  <div className="h-8 bg-gray-700 rounded w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </BaseCarousel>
    );
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        Error loading games: {error}
      </div>
    );
  }

  return (
    <BaseCarousel className="">
      {games.map((game, index) => (
        <div key={game.id} className="flex justify-center items-center mr-4">
          <div
            className=" text-[180px] -mr-8 font-extrabold text-background
    [text-shadow:0_0_4px_#f4b3b3,0_0_8px_#ff467a,0_0_12px_#ff157b,0_0_16px_#ff0045]"
          >
            {index + 1}
          </div>
          <Card
            image={game.imageUrl}
            title={game.name}
            isNew={game.tags?.includes("new")}
            onPlay={() => console.log("Play", game.id)}
            onLike={() => console.log("Like", game.id)}
          />
        </div>
      ))}
    </BaseCarousel>
  );
}
