import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    credentials: "include",
  }),
  tagTypes: ["Games"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "auth/me",
      transformResponse: (res) => res.data,
    }),

    // ✅ Games API
    getGames: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        categoryId = "",
        sortBy = "createdAt",
        order = "desc",
      } = {}) => ({
        url: "games",
        params: { page, limit, search, categoryId ,sortBy, order },
      }),
      transformResponse: (res) => res.data, // { games: [], total, page, totalPages }
      providesTags: ["Games"],
    }),
  }),
});

export const { useGetUserQuery, useGetGamesQuery } = api;
