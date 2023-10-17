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
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),

    users: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
      }),
    }),
    blockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-user`,
        method: "POST",
        body: data,
      }),
    }),
    unblockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock-user`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updateUser`,
        method: "PUT",
        body: data,
      }),
    }),
    AddTrainer: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-trainer`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useUsersMutation,
  useBlockUserMutation,
  useUpdateUserMutation,
  useUnblockUserMutation,
  useAddTrainerMutation
} = adminApiSlice;
