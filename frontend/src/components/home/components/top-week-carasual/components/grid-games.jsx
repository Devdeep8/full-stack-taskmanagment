"use client";

import Card from "./Card";

export default function GameGrid({ games = [] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {games.map((game) => (
        <Card
          key={game.id}
          image={game.imageUrl}
          title={game.name}
          isNew={game.tags?.includes("new")}
          onPlay={() => console.log("Play", game.id)}
          onLike={() => console.log("Like", game.id)}
        />
      ))}
    </div>
  );
}
