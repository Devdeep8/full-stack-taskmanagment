"use client";

import { useEffect, useState } from "react";
import { GetCategories } from "@/services/get-services";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        setLoading(true);

        const res = await GetCategories();

        setCategories(res.data.data);
        setMeta(res.meta);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchcategories();
  }, []);

  return { categories, meta, loading, error };
};
