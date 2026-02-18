/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGames , setGamesLoading} from "@/store/reducer";
import { useGetGamesQuery } from "@/services/apiSlice";
import useDebounce from "@/common/hooks/useDebounce";

const LIMITS = [10, 20, 50];

export default function GamesFilter({ categories = [] }) {
  const dispatch = useDispatch();

  // All filters live here locally
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    categoryId: "",
    sortBy: "createdAt",
    order: "desc",
  });

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500, 3);
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
      page: 1, // reset to first page on search
    }));
  }, [debouncedSearch]);

  // RTK Query — refetches automatically when filters change
  const { data, isLoading, isFetching, isError } = useGetGamesQuery(filters);

  useEffect(() => {
  dispatch(setGamesLoading(isLoading || isFetching));
}, [isLoading, isFetching]);

  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      dispatch(setGames(data.data)); // ← data.data is the games array
    }
  }, [data]);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  return (
    <div className="flex flex-wrap gap-3 p-4  rounded-lg shadow">
      {/* Search */}
      <input
        type="text"
        placeholder="Search games..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="border rounded px-3 py-2 w-60"
      />

      {/* Category */}
      <select
        value={filters.categoryId ?? ""}
        onChange={(e) => handleChange("categoryId", e.target.value || null)}
        className="border rounded px-3 py-2 bg-alert"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sortBy}
        onChange={(e) => handleChange("sortBy", e.target.value)}
        className="border rounded px-3 py-2  bg-alert"
      >
        <option value="createdAt">Newest</option>
        <option value="name">Name</option>
        <option value="rtp">rtp</option>
      </select>

      {/* Order */}
      <select
        value={filters.order}
        onChange={(e) => handleChange("order", e.target.value)}
        className="border rounded px-3 py-2  bg-alert"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>

      {/* Limit */}
      <select
        value={filters.limit}
        onChange={(e) => handleChange("limit", Number(e.target.value))}
        className="border rounded px-3 py-2  bg-alert"
      >
        {LIMITS.map((l) => (
          <option key={l} value={l}>
            Show {l}
          </option>
        ))}
      </select>

      {/* Status */}
      {isFetching && (
        <span className="text-sm text-gray-400 self-center">Updating...</span>
      )}
      {isError && (
        <span className="text-sm text-red-400 self-center">Failed to load</span>
      )}

      {/* Reset */}
      <button
        onClick={() => {
          setFilters({
            page: 1,
            limit: 10,
            search: "",
            categoryId: "",
            sortBy: "createdAt",
            order: "desc",
          });
          setSearchInput("");
        }}
        className="border rounded px-4 py-2 bg-gray-100 hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}
