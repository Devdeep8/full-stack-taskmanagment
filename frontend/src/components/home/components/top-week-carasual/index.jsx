"use client";

// import { useGames } from "@/components/home/hooks/useGames";
import Card from "@/common/components/card";
import BaseCarousel from "@/common/components/carasual";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GameCarousel({ games }) {
  // const { games, loading, error } = useGames({ page: 1, limit: 10 });

  return (
    <div className=" max-w-7xl mx-auto">
      <div className=" flex justify-between mt-6">
        <h1 className=" text-2xl font-semibold ">TOP OF THE WEEK</h1>
        <div className=" flex gap-0.5 text-white/50">
          <button className="   font-extrabold rounded-tl-lg rounded-bl-lg  bg-slider">
            <ChevronLeft size={40} height={40} strokeWidth={2} className="" />
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
              key={game.id}
              className="w-44"
              image={game.imageUrl}
              title={game.name}
              category={game.category.slug}
              slug={game.slug}
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
