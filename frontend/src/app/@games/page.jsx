import GameCarousel from "@/components/home/components/top-week-carasual"
import { GetTop10Games } from "@/services/get-services"

export default async function GamesSlot() {
    const res = await GetTop10Games({ page: 1, limit: 10 })
    const games  = res.data.data
  return (
    <div className=" max-w-7xl mx-auto">
        <GameCarousel games={games}/>
    </div>
  )
}
