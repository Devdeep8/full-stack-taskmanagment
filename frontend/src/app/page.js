import GameGrid from "@/components/home/components/free-to-play-games";
import GameCarousel from "@/components/home/components/top-week-carasual";
import { GetTop10Games } from "@/services/get-services";

export default async function Home() {
      const res = await GetTop10Games({ page: 1, limit: 20 })
      const games  = res.data.data
  return (
    <div className=" ">
      <GameCarousel games={games.slice(0, 10)}/>
      <GameGrid games={ games} /> 
    </div>
  );
}
