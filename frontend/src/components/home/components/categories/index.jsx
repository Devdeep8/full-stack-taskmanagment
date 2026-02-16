"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCategories } from "../../hooks/useCategories";

export default function CategoriesTab() {
  const { categories, loading, error } = useCategories();
  const pathname = usePathname();

  if (loading) return null;
  if (error) return null;

  return (
    <div className=" max-w-7xl mx-auto mt-4">
      <div className="flex gap-4 px-4 py-3  no-scrollbar">
        
        {/* ✅ Home Tab */}
        <Link
          href="/"
          className={`
            px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200
            ${
              pathname === "/"
                ? "bg-linear-to-r from-pink-600 to-purple-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }
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
                px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${
                  isActive
                    ? "bg-linear-to-r bg-alert to-background text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }
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
