import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ()=> ({
                url: PRODUCTS_URL, 
            }),
            keepUnusedDataFor: 5
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url:`${PRODUCTS_URL}/${productId}` 
            }),
            keepUnusedDataFor: 5
        }),

        createProduct: builder.mutation({
            query: ({
                url: PRODUCTS_URL,
                method: 'POST'
            }),
            // prevents the data from being cached.
            invalidatesTags: ['Products'],
            keepUnusedDataFor: 5
        })
    })
})

// naming convention of query 
// getProducts => use + getProducts + Query === useGetProductsQuery
// if its a mutation the Query changes to Mutation 
export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } = productsApiSlice;