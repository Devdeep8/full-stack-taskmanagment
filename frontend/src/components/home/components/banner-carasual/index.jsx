import BaseCarousel from "@/common/components/carasual";
import Image from "next/image";

const bannerImages = [
  "https://daracasino.com/_nuxt/img/banner1-1.ae9666b.jpg",
  "https://daracasino.com/_nuxt/img/banner1-2.210c129.jpg",
  "https://daracasino.com/_nuxt/img/banner1-3.9ed1e68.jpg",
];

export default function BannerCarousel() {
  return (
    <BaseCarousel className="   ">
        <div className=" flex mx-auto mt-4">

      {bannerImages.map((imgSrc, index) => (
          <div key={index} className="lg:min-w-1/3 md:min-w-1/2 mx-auto min-w-full h-full relative px-4">
          <div className=" w-full h-full rounded-xl overflow-hidden">
            <Image src={imgSrc} alt="" width={800} height={450}  className="object-cover" />
          </div>
        </div>
      ))}
      </div>
    </BaseCarousel>
  );
}
