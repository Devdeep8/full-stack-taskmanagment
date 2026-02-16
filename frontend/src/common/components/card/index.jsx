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
    <div className="shadow w-full  relative   max-w-36 group cursor-pointer  overflow-hidden rounded-lg">
      {/* Image */}
      <div className="w-40 h-56">

      <Image
        src={image}
        alt={title}
        className="object-cover rounded-lg group-hover:scale-110 group-hover:duration-150 transition-all group-hover:ease-in-out"
        fill
        />

        </div>
      {/* 🔴 NEW Badge */}
      {isNew && (
        <div className="absolute top-2 left-2 -skew-x-12 rounded-[3px] text-sm shadow-md flex items-center bg-red-600 px-2 transition-all group-hover:-translate-x-20 duration-200 ease-in-out">
          <span className="font-semibold text-white text-xs">NEW</span>
        </div>
      )}

      {/* 🔵 Bottom Title */}
      <div className="absolute bottom-0 w-full flex justify-center text-[0.6rem] text-white transition-all group-hover:translate-y-7 duration-200 ease-in-out">
        <span>{title}</span>
      </div>

      {/* 🟢 Hover Overlay */}
      <div className="absolute inset-0 bg-background/80  hidden group-hover:flex flex-col items-center justify-center gap-3 transition-all duration-300">
        {/* Play Button */}
        <button
          onClick={onPlay}
          className="bg-green-500 text-white p-3 rounded-full hover:scale-110 transition"
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
