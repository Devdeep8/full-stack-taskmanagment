"use client";

import { useGames } from "@/components/home/hooks/useGames";
import Card from "@/common/components/card";
import BaseCarousel from "@/common/components/carasual";
import { ChevronLeft , ChevronRight } from "lucide-react";

export default function GameCarousel() {
  const { games, loading, error } = useGames({ page: 1, limit: 10 });

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
    <div>
      <div className=" flex justify-between mt-6">
        <h1 className=" text-2xl font-semibold ">
         TOP OF THE WEEK
        </h1>
        <div className=" flex gap-0.5 text-white/50">
          <button  className="   font-extrabold rounded-tl-lg rounded-bl-lg  bg-slider">
          <ChevronLeft size={40} height={40} strokeWidth={2} className=""/>
          </button>
          <button className="font-extrabold rounded-tr-lg rounded-br-lg bg-slider"> 
           <ChevronRight size={40} height={40} strokeWidth={2} />
          </button>
        </div>
      </div>
    <BaseCarousel className="">
      {games.map((game, index) => (
        <div key={game.id} className="flex justify-center items-center mr-4">
          <div
            className=" text-[180px] -mr-8 font-extrabold text-background
    [text-shadow:0_0_2px_#f4b3b3,0_0_4px_#ff467a,0_0_4px_#ff157b,0_0_4px_#ff0045]"
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
      </div>
  );
}
