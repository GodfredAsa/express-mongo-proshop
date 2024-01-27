import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const usersApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: USERS_URL, 
                method: 'POST',
                body: data
            }),
            keepUnusedDataFor: 5
        }),

       
    })
})

// naming convention of mutation 
// login => use + Login + Mutation === useLoginMutation
export const { useLoginMutation } = usersApiSlice;