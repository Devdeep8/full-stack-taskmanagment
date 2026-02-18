"use client";
import Card from "@/common/components/card";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function GamesList() {
  const { games, gamesLoading } = useSelector((state) => state.userTask);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!gamesLoading) {
      // ✅ Keep skeleton visible for at least 800ms
      const timer = setTimeout(() => setShowSkeleton(false), 800);
      return () => clearTimeout(timer);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSkeleton(true); // reset when loading starts again
    }
  }, [gamesLoading]);

  if (showSkeleton) return <GamesSkeleton />;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {games.length === 0 ? (
          <p className="col-span-full text-center py-10">No games found.</p>
        ) : (
          games.map((game) => (
            <div key={game.id}>
              <Card
                image={game.imageUrl}
                title={game.name}
                isNew={game.tags?.includes("new")}
                onPlay={() => console.log("Play", game.id)}
                onLike={() => console.log("Like", game.id)}
                className={"w-44"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function GamesSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="rounded-lg overflow-hidden animate-pulse">
          <div className="w-44 h-32 bg-gray-200 rounded-lg" />
          <div className="p-2 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}