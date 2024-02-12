import { apiSlice } from "../../api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `/product`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Product"], // provideTags are used for updating cache
    }),

    getProductById: builder.query({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),

    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProductById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    createProduct: builder.mutation({
      query: (credentials) => ({
        url: "/product",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

// auto generated hooks for getUser query (GET)
export const {
  useGetProductQuery,
  useCreateProductMutation,
  useDeleteProductByIdMutation,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
} = productApiSlice;
