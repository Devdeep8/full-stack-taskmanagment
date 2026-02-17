export default function GameCarouselLoading() {
  return (
    <div className=" max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mt-6 animate-pulse ">
        <div className="h-7 w-56 bg-primary rounded-md" />

        <div className="flex gap-0.5">
          <div className="h-10 w-12 bg-slider/60 rounded-tl-lg rounded-bl-lg" />
          <div className="h-10 w-12 bg-slider/60 rounded-tr-lg rounded-br-lg" />
        </div>
      </div>

      {/* Carousel Skeleton */}
      <div className="flex mt-6 gap-6 overflow-hidden animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center mr-4">
            
            {/* Big Rank Number */}
            <div className="h-45 w-20 bg-primary rounded-md -mr-6" />

            {/* Card Skeleton */}
            <div className="w-55">
              <div className="h-70 bg-primary rounded-xl" />
              <div className="mt-3 h-4 w-3/4 bg-primary rounded" />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
