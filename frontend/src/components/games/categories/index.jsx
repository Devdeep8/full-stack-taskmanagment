import Card from "@/common/components/card";

export default function CategoriesGamesGrid({ categoriesGames }) {
    const games = categoriesGames.games
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Category Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">{categoriesGames?.name}</h1>
          <p className="text-gray-400">Slug: {categoriesGames?.slug}</p>
        </div>

        {/* Games Grid */}
        {games.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Games</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {games.map((game) => (
                <Card
                  key={game.id}
                  image={game.icon || game.image}
                  title={game.name}
                  className="w-60"
                  category={categoriesGames.slug}
                  slug={game.slug}
                />
              ))}
            </div>
          </div>
        )}

        {games.length === 0 && (
          <p className="text-gray-500">No games found in this category.</p>
        )}
      </div>
    </>
  );
}
