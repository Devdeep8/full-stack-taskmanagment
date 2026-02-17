"use client";

import Card from "@/common/components/card";

export default function GameGrid({ games }) {
  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between mt-6">
        <h1 className="text-2xl font-semibold">
          Free To Play
        </h1>
      </div>

      {/* Horizontal Scroll */}
      <div className="mt-6 overflow-x-auto no-scrollbar carousel">
        <div className="grid grid-rows-2 grid-flow-col gap-6 w-max ">
          
          {games.map((game) => (
            <Card
              key={game.id}
              className="w-52 "
              image={game.imageUrl}
              title={game.name}
              isNew={game.tags?.includes("new")}
              onPlay={() => console.log("Play", game.id)}
              onLike={() => console.log("Like", game.id)}
              
            />
          ))}

        </div>
      </div>

    </div>
  );
}
