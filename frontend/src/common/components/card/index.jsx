import Image from "next/image";
import { Play, Heart } from "lucide-react";

export default function Card({
  image,
  title,
  isNew = false,
  onPlay,
  onLike,
}) {
  return (
    <div className="shadow w-full h-full relative mx-4 max-w-36 group cursor-pointer overflow-hidden rounded-lg">
      
      {/* Image */}
      <Image
        src={image}
        alt={title}
        className="object-cover rounded-lg"
        width={260}
        height={350}
      />

      {/* 🔴 NEW Badge */}
      {isNew && (
        <div className="absolute top-2 left-2 -skew-x-12 rounded-[3px] text-sm shadow-md flex items-center bg-red-600 px-2 transition-all group-hover:-translate-x-20 duration-200 ease-in-out">
          <span className="font-semibold text-white text-xs">NEW</span>
        </div>
      )}

      {/* 🔵 Bottom Title */}
      <div className="absolute bottom-2 w-full flex justify-center text-[0.6rem] text-white transition-all group-hover:translate-y-7 duration-200 ease-in-out">
        <span>{title}</span>
      </div>

      {/* 🟢 Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 hidden group-hover:flex flex-col items-center justify-center gap-3 transition-all duration-300">
        
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
