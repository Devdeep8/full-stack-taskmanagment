"use client";

import { useEffect, useState } from "react";
import { GetTop10Games } from "@/services/get-services";

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);

        const res = await GetTop10Games();
        console.log(res)

        // Assuming backend returns { data, meta }
        setGames(res.data.data);
        setMeta(res.data.meta);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []); // 🔥

  return { games, meta, loading, error };
};
