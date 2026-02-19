import CategoriesGamesGrid from "@/components/games/categories";
import GameDetail from "@/components/games/game";
import { GetCategory, GetCategoryGame } from "@/services/get-services";

export async function generateMetadata({ params }) {
  let { slug } = await params;

  let categorySlug;
  let gameSlug;

  if (Array.isArray(slug)) {
    categorySlug = slug[0];
    gameSlug = slug[1];
  } else {
    categorySlug = slug;
  }

  // If it's a game page
  if (categorySlug && gameSlug) {
    const mainIdentifier = `${categorySlug}/${gameSlug}`;
    const res = await GetCategoryGame(mainIdentifier);
    const game = res?.data;

    if (!game) {
      return { title: "Game Not Found" }
    }

    return {
      title: game.name,                          // "Aviator | Dara Casino"
      description: game.description || `Play ${game.name} on Dara Casino`,
      openGraph: {
        title: game.name,
        description: game.description || `Play ${game.name} on Dara Casino`,
        images: game.thumbnail ? [{ url: game.thumbnail }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: game.name,
        images: game.thumbnail ? [game.thumbnail] : [],
      },
    };
  }

  // If it's a category page
  const res = await GetCategory(categorySlug, {
    page: 1,
    limit: 20,
    games: true,
    status: "active",
  });
  const category = res?.data;

  return {
    title: category?.name || categorySlug,       // "Slots | Dara Casino"
    description: category?.description || `Browse ${categorySlug} games on Dara Casino`,
    openGraph: {
      title: category?.name || categorySlug,
      description: category?.description || `Browse ${categorySlug} games on Dara Casino`,
      images: category?.image ? [{ url: category.image }] : [],
    },
  };
}

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


  
