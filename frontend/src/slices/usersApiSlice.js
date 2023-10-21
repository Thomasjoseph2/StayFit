import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout:builder.mutation({
      query:()=>({
        url:`${USERS_URL}/logout`,
        method:'POST'
      })
    }),
     getTrainers: builder.mutation({
      query: () => ({
        url: `${TRAINER_URL}/trainers`,
        method: "GET",
      }),
    }),

  }),


});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useGetTrainersMutation}=usersApiSlice;