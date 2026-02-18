"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCategories } from "../../hooks/useCategories";
// import { Home } from "lucide-react";

export default function CategoriesTab() {
  const { categories, loading, error } = useCategories();
  const pathname = usePathname();

  return (
    <div className=" bg-background py-2">
      <div className=" lg:max-w-7xl  overflow-x-scroll lg:overflow-hidden scrollbar-hide  mx-auto mt-4">
        <div className="flex gap-4 px-4 py-3 items-center  sm:text-sm  no-scrollbar">
          {/* ✅ Home Tab */}
          <Link
            href="/"
            className={`
            px-3 py-1.5 bg-category font-semibold flex justify-center items-center gap-2
            rounded-md
            ${pathname == "/" ? "bg-category/50 text-stress-2" : ""}
            `}
          >
            Home
          </Link>

          {/* ✅ Categories */}
          {categories?.map((category) => {
            const isActive = pathname === `/games/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/games/${category.slug}`}
                className={`
              px-3 py-1.5 bg-category rounded-md shrink-0 text-sm  font-semibold
              ${isActive ? "bg-category/50 text-stress-2" : ""}
              `}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
