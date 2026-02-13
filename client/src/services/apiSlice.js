import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseApiUrl = `${import.meta.env.VITE_API_URL}/api/v1`

export const api = createApi({
    reducerPath : "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getUser : builder.query({
            query: () => "auth/me",
            transformResponse : (res) => res.data
        })
    })
})

export const {useGetUserQuery} = api