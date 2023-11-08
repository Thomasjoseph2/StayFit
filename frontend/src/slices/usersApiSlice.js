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
    googleLogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google-login`,
        method: "post",
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
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getTrainers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/trainers`,
        method: "GET",
      }),
    }),
    getTrainer: builder.mutation({
      query: (trainerId) => ({
        url: `${USERS_URL}/getTrainer/${trainerId}`,
        method: "GET",
      }),
    }),
    getUserVideos: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-user-videos`,
        method: "GET",
      }),
    }),
    getUserProfile: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/get-userprofile/${userId}`,
        method: "GET",
      }),
    }),
    addProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-profile-image`,
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-profile`,
        method: "POST",
        body: data,
      }),
    }),
    getUserDiets: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-user-diets`,
        method: "GET",
      }),
    }),
    getUserDiets: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-user-diets`,
        method: "GET",
      }),
    }),
    otpVerification: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/otp-verification`,
        method: "POST",
        body: data,
      }),
    }),
    getUserPlans: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/get-user-plans`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/create-order`,
        method: "POST",
        body: data,
      }),
    }),
   verifyPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verify-payment`,
        method: "POST",
        body: data,
      }),
    }),
    addPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-payment`,
        method: "POST",
        body: data,
      }),
    }),
    addPayment: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/add-payment`,
        method: "POST",
        body: data,
      }),
    }),
    checkPlanStatus: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/check-plan-status`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetTrainersMutation,
  useGetTrainerMutation,
  useGetUserVideosMutation,
  useGetUserProfileMutation,
  useAddProfileImageMutation,
  useGoogleLoginMutation,
  useUpdateProfileMutation,
  useGetUserDietsMutation,
  useOtpVerificationMutation,
  useGetUserPlansMutation,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useAddPaymentMutation,
  useCheckPlanStatusMutation
} = usersApiSlice;
