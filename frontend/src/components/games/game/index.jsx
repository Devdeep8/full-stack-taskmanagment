"use client"
import Image from "next/image";

export default function GameDetail({ game }) {
  
    
  return (
    <div className="text-white max-w-7xl mx-auto">
      <div className="relative w-full h-100">
        <Image
          src={game.bannerUrl || game.imageUrl}
          alt={game.name}
          fill
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-background/50 " />

        <div className="absolute bottom-10 left-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{game.name}</h1>

          <div className="flex gap-3 text-sm">
            <span className="px-3 py-1 bg-  rounded-full">RTP {game.rtp}%</span>

            <span className="px-3 py-1  rounded-full">{game.provider}</span>

            {game.isFeatured && (
              <span className="px-3 py-1 bg-primary  text-black rounded-full">
                Featured
              </span>
            )}
          </div>

          <button onClick={() => console.log(game.id, game.slug)} className="flex items-center justify-center basis-0 bg-stress-2 text-background rounded-md shadow-[0px_0px_13px_0px_hsl(120_100%_58%_/0.78)] mx-2 px-6 py-2 text-center text-xl font-bold hover:brightness-120">
            ▶ Play Now
          </button>
        </div>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="max-w-7xl mx-auto  py-12 grid md:grid-cols-3 ">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">About This Game</h2>

          <p className="text-gray-400 leading-relaxed">
            {game.description || "No description available."}
          </p>

          {game.tags && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary  text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="bg-primary  rounded-xl p-6 space-y-4 h-full">
          <h3 className="text-lg font-semibold">Game Info</h3>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Provider</span>
            <span>{game.provider}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">RTP</span>
            <span>{game.rtp}%</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Status</span>
            <span className="text-green-500 capitalize">{game.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
