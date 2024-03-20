import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IItemid, IRepoEntry } from "../types/types";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<IRepoEntry, void>({
      query: () => `/posts`,
    }),
    getPost: build.query<IItemid, string>({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export default apiSlice;
export const { useGetAllPostsQuery, useLazyGetPostQuery } = apiSlice;
