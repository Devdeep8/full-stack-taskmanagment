import CategoriesGamesGrid from "@/components/games/categories";
import GameDetail from "@/components/games/game";
import { GetCategory, GetCategoryGame } from "@/services/get-services";

export default async function Page({ params }) {
  let { slug } = await params;

  if (!slug) return <div>No category specified</div>;

  let categorySlug;
  let gameSlug;

  if (Array.isArray(slug)) {
    categorySlug = slug[0];
    gameSlug = slug[1];
  } else {
    categorySlug = slug;
  }

  if (!categorySlug) return <div>No valid category specified</div>;

  if (categorySlug && gameSlug) {
    const mainIdentifier = `${categorySlug}/${gameSlug}`;
    const res = await GetCategoryGame(mainIdentifier);

    const game = res?.data;

    if (!game) {
      return <div className="text-white p-10">Game not found</div>;
    }

    return <GameDetail game={game} />;
  }

  const res = await GetCategory(categorySlug, {
    page: 1,
    limit: 20,
    games: true,
    status: "active",
  });

  const category = res?.data;

  return <CategoriesGamesGrid categoriesGames={category} />;
}
