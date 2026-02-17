import Image from "next/image";
import { Play, Heart } from "lucide-react";

export default function Card({
  image = "https://wbgame.daracasino.com/GameIcon/AceWin/5716.webp",
  title,
  isNew = false,
  onPlay,
  onLike,
}) {
  return (
    <div className="shadow w-full  relative    group cursor-pointer  overflow-hidden rounded-lg">
      {/* Image */}
      <div className="relative w-40 aspect-4/5 overflow-hidden rounded-2xl">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {isNew && (
        <div className="absolute top-2 left-2 -skew-x-12 rounded-[3px] text-sm shadow-md flex items-center bg-red-600 px-2 transition-all group-hover:-translate-x-20 duration-200 ease-in-out">
          <span className="font-semibold text-white text-xs">NEW</span>
        </div>
      )}

      <div className="absolute bottom-0 w-full flex justify-center text-[0.6rem] transition-all group-hover:translate-y-7 duration-200 ease-in-out">
        <span>{title}</span>
      </div>

      <div className="absolute inset-0 bg-background/80  hidden group-hover:flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <button
          onClick={onPlay}
          className="bg-stress-2 p-3 rounded-full hover:scale-110 transition"
        >
          <Play size={18} />
        </button>

        {/* Heart Button */}
        <button
          onClick={onLike}
          className="bg-[#7f31ff] border border-transparent absolute top-[17%] px-1.5 w-10 rounded-tl-md rounded-bl-md flex justify-center items-center right-0 h-10 transition hover:bg-purple-700"
        >
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
}
