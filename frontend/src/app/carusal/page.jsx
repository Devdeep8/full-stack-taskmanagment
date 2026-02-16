/* eslint-disable @next/next/no-img-element */
import Carousel from "@/common/components/carasual/my-test";
import Image from "next/image";

export default function page() {
  return (
    <div className=" max-w-7xl mx-auto max-h-96 ">
      <Carousel>
        <img src="/assets/png/auth.png" alt="placeholder" className="object-cover" />
        <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
        <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
      </Carousel>
    </div>
  );
}
