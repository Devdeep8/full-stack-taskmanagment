import HomeComponents from "@/components/home";
import { baseApiUrl } from "@/services/apiSlice";

export default async function Home() {
  const ressr = await fetch(`${baseApiUrl}/games?page=1&limit=30`, {
    cache : "no-store",
  });
  const data = await ressr.json();
  return (
    <div className=" ">
      <HomeComponents games={data.data.data} />
    </div>
  );
}
