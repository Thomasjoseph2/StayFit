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
    trainers: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/trainers`,
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
    getAdminVideos: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/get-videos`,
        method: "GET",
      }),
    }),
    approveVideo: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/approve-video`,
        method: "POST",
        body: data,
      }),
    }),
   rejectVideo: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/reject-video`,
        method: "POST",
        body: data,
      }),
    }),
    getAdminDiets: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/get-diets`,
        method: "GET",
      }),
    }),
    approveDiet: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/approve-diet`,
        method: "POST",
        body: data,
      }),
    }),
   rejectDiet: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/reject-diet`,
        method: "POST",
        body: data,
      }),
    }),
    AddPlans: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-plans`,
        method: "POST",
        body: data,
      }),
    }),
    getAdminPlans: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/get-plans`,
        method: "GET",
      }),
    }),
    getSubscriptions: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/get-subscriptions`,
        method: "GET",
      }),
    }),
    blockTrainer: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-trainer`,
        method: "POST",
        body: data,
      }),
    }),
    unblockTrainer: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unblock-trainer`,
        method: "POST",
        body: data,
      }),
    }),
    unlistPlan: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/unlist-plan`,
        method: "POST",
        body: data,
      }),
    }),
    activatePlans: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/activate-plan`,
        method: "POST",
        body: data,
      }),
    }),
    getSales: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/get-sales`,
        method: "GET",
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
  useAddTrainerMutation,
  useGetAdminVideosMutation,
  useApproveVideoMutation,
  useRejectVideoMutation,
  useGetAdminDietsMutation,
  useApproveDietMutation,
  useRejectDietMutation,
  useAddPlansMutation,
  useGetAdminPlansMutation,
  useGetSubscriptionsMutation,
  useBlockTrainerMutation,
  useUnblockTrainerMutation,
  useUnlistPlanMutation,
useActivatePlansMutation,
useGetSalesMutation
} = adminApiSlice;
