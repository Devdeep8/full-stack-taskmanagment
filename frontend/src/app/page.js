import HomeComponents from "@/components/home";
import { baseApiUrl } from "@/services/apiSlice";

import { GetTop10Games } from "@/services/get-services";

export default async function Home() {
  const res = await GetTop10Games({ page: 1, limit: 20 });
  const games = res.data.data;

  const ressr  = await fetch(`${baseApiUrl}/games?page=1&limit=30` , {
    next: {revalidate : 60}
  }) 
  const data = await ressr.json()
  console.log('data :>> ', data.data.data);
  return (
    <div className=" ">
      <HomeComponents games={data.data.data} />
    </div>
  );
}
