/* eslint-disable @next/next/no-img-element */
"use client"
export default function ProfileHeader({
  name = "Devdeep",
  username = "DEVA",
  imageUrl = "https://devdeep.dev/_next/image?url=%2Fimages%2Fdev.jpg&w=256&q=100",
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-5 rounded-2xl ">
      
      <div className="relative w-36 h-36 rounded-full overflow-hidden  flex items-center justify-center ">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold ">
            {name?.[0] || "U"}
          </span>
        )}
      </div>

      <div className="flex flex-col text-center">

        <h3 className="text-4xl font-bold capitalize leading-tight">
          {name}
        </h3>

        <p className="text-sm ">
          User ID: <span className="font-medium ">{username}</span>
        </p>
      </div>
    </div>
  );
}
