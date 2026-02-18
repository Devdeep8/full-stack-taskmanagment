"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { useGames } from "@/components/home/hooks/useGames";
import Card from "@/common/components/card";

function GamesCoverflow() {
  const { games, loading } = useGames({page : 1 , limit : 20});

  if (loading) {
    return <div className="text-white text-center py-20">Loading games...</div>;
  }

  return (
    <div className=" max-w-7xl w-full mx-auto py-16">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        loop={true}
        centeredSlides={true}
        slidesPerView="auto"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          slideShadows: false,
        }}
        className=""
      >
        {games.map((game) => (
          <SwiperSlide key={game.id} className="w-64!">
            <Card
              image={game.icon || game.image}
              title={game.name}
              isNew={game.isNew}
              onPlay={() => console.log("Play", game.name)}
              onLike={() => console.log("Like", game.name)}
              className={"w-60"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function Page() {
  return <GamesCoverflow />;
}
