import Card from "@/common/components/card";
import { GetCategory } from "@/services/get-services";

export default async function Page({ params }) {
  let { slug } = await params;

  if (!slug) return <div>No category specified</div>;

  // Catch-all route returns an array; sanitize to take the first valid slug
  slug = Array.isArray(slug) ? slug.find((s) => s && !s.startsWith(".")) : slug;

  if (!slug) return <div>No valid category specified</div>;

  // Call the GetCategory service
  const res = await GetCategory(slug, {
    page: 1,
    limit: 20,
    games: true, // include games
    search: "", // game name search
    status: "active", // game status filter
  });

  console.log("Category response:", res.data);

  return (
    <div className="flex  flex-col items-start gap-4 p-4 max-w-7xl mx-auto">

      {res.data ? (
        <div className=" ">


          {res.data.games?.length > 0 && (
            <div className=" grid grid-cols-5 gap-8">

              {res.data.games.map((game) => (
                  <div key={game.id}>
                  <Card
                    image={game.imageUrl}
                    title={game.name}
                    isNew={game.tags?.includes("new")}
                    
                    className={"w-56"}
                    />
                </div>
              ))}
              </div>
          )}
        </div>
      ) : (
        <p>No category or games found</p>
      )}
    </div>
  );
}
