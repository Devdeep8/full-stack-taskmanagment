import HomeComponents from "@/components/home";

import { GetTop10Games } from "@/services/get-services";

export default async function Home() {
      const res = await GetTop10Games({ page: 1, limit: 20 })
      const games  = res.data.data
  return (
    <div className=" ">
      
      <HomeComponents games={games}/>

    </div>
  );
}
