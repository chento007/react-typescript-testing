import { apiSlice } from "../../api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/product`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Product"], // provideTags are used for updating cache
    }),
  }),
});

// auto generated hooks for getUser query (GET)
export const { useGetProductQuery } = productApiSlice;