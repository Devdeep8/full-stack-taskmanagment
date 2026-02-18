"use client";
import GameGrid from "@/components/home/components/free-to-play-games";
import GameCarousel from "@/components/home/components/top-week-carasual";
import GamesCoverflow from "./components/coverflow-carasual";

export default function HomeComponents({games}) {
  return (
    <div className=" ">
      <GameCarousel games={games.slice(0, 10)} />
      <GameGrid games={games} />
      <GamesCoverflow />

    </div>
  );
}
