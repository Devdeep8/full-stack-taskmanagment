"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useCategories } from "../../hooks/useCategories";
// import { Home } from "lucide-react";

export default function CategoriesTab({categories}) {
  // const { categories, loading, error } = useCategories();
  const pathname = usePathname();


  return (
    <div className=" max-w-7xl mx-auto mt-4">
      <div className="flex gap-4 px-4 py-3 items-center  no-scrollbar">
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
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`
               px-3 py-1.5 bg-category rounded-md font-semibold
               ${isActive ? "bg-category/50 text-stress-2" : ""}
              `}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
