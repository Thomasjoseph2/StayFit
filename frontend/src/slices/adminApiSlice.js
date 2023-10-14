import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout:builder.mutation({
      query:()=>({
        url:`${ADMIN_URL}/logout`,
        method:'POST'
      })
    }),
   
    users:builder.mutation({
      query:()=>({
        url:`${ADMIN_URL}/users`,
        method:'GET'
      })
    }),
    deleteUser:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/delete`,
        method:'POST',
        body: data,
      })
    }),
    updateUser:builder.mutation({
      query:(data)=>({
        url:`${USERS_URL}/updateUser`,
        method:'PUT',
        body:data
      })
    })

  }),


});

export const {useAdminLoginMutation,useAdminLogoutMutation,useUsersMutation,useDeleteUserMutation,useUpdateUserMutation}=adminApiSlice;