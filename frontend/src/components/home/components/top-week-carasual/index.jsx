"use client";

import GameCard from "@/common/components/card";

export default function GameGrid() {
  const games = [
    {
      id: 1,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "MUMMY MIA",
      provider: "AceWin",
      isNew: true,
      isFavorite: false,
    },
    {
      id: 2,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Dragon's Treasure",
      provider: "PragmaticPlay",
      isNew: false,
      isFavorite: true,
    },
    {
      id: 3,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Lucky Spins",
      provider: "NetEnt",
      isNew: true,
      isFavorite: false,
    },
    {
      id: 4,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Mega Fortune",
      provider: "Evolution",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 5,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Book of Ra",
      provider: "Novomatic",
      isNew: false,
      isFavorite: true,
    },
    {
      id: 6,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Starburst",
      provider: "NetEnt",
      isNew: true,
      isFavorite: false,
    },
    {
      id: 7,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Gonzo's Quest",
      provider: "NetEnt",
      isNew: false,
      isFavorite: false,
    },
    {
      id: 8,
      image: "https://wbgame.daracasino.com/GameIcon/AceWin/1002.webp",
      title: "Sweet Bonanza",
      provider: "PragmaticPlay",
      isNew: true,
      isFavorite: true,
    },
  ];

  const handlePlay = (game) => {
    console.log("Playing:", game.title);
    // Navigate to game page or open game modal
  };

  const handleFavorite = (game, isFavorite) => {
    console.log(`${game.title} favorite:`, isFavorite);
    // Update favorite status in database/state
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">Popular Games</h2>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {games.map((game , index) => {
            console.log(index +1)
            return (
          <GameCard
            key={game.id}
            image={game.image}
            title={game.title}
            provider={game.provider}
            isNew={game.isNew}
            isFavorite={game.isFavorite}
            onPlay={() => handlePlay(game)}
            onFavorite={(isFav) => handleFavorite(game, isFav)}
            index={index + 1}
          />
        )})}
      </div>
    </div>
  );
}