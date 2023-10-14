import { apiSlice } from "./apiSlice";

const TRAINER_URL = "/api/trainer";

export const trainerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    trainerLogin: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    trainerLogout:builder.mutation({
      query:()=>({
        url:`${TRAINER_URL}/logout`,
        method:'POST'
      })
    }),
   
    users:builder.mutation({
      query:()=>({
        url:`${TRAINER_URL}/trainerHome`,
        method:'GET'
      })
    }),

  }),


});

export const {useTrainerLoginMutation,useTrainerLogoutMutation}=trainerApiSlice;