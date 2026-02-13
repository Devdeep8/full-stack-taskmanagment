import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
console.log(baseApiUrl);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "auth/me",
      transformResponse: (res) => res.data,
    }),
  }),
});

export const { useGetUserQuery } = api;
