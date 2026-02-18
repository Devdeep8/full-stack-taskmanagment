import { GetCategories } from "@/services/get-services";
import GamesFilter from "./components/filter";
import GamesList from "./components/games";

export default  async function PlayCompoenet(){
    const res = await GetCategories({page : 1 , limit : 10})
    const categories = res.data.data
    return (
        <div className=" flex flex-col justify-center items-center max-w-7xl w-full mx-auto"> 
            <GamesFilter categories={categories} />
            <GamesList/>
        </div>
    )
}