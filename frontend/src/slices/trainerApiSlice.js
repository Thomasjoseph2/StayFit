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
    trainerLogout: builder.mutation({
      query: () => ({
        url: `${TRAINER_URL}/logout`,
        method: "POST",
      }),
    }),

    users: builder.mutation({
      query: () => ({
        url: `${TRAINER_URL}/users`,
        method: "GET",
      }),
    }),
    getProfile: builder.mutation({
      query: (trainerId) => ({
        url: `${TRAINER_URL}/getProfile/${trainerId}`, // Assuming your endpoint accepts the trainer's ID in the URL
        method: "GET",
      }),
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/addPost`,
        method: "POST",
        body: data,
      }),
    }),
    getPosts: builder.mutation({
      query: (trainerId) => ({
        url: `${TRAINER_URL}/getPosts/${trainerId}`, // Assuming your endpoint accepts the trainer's ID in the URL
        method: "GET",
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/addVideo`,
        method: "POST",
        body: data,
      }),
    }),
    getVideos: builder.mutation({
      query: (trainerId) => ({
        url: `${TRAINER_URL}/getVideos/${trainerId}`, // Assuming your endpoint accepts the trainer's ID in the URL
        method: "GET",
      }),
    }),
  }),
});

export const {
 useTrainerLoginMutation,
 useTrainerLogoutMutation,
 useUsersMutation,
 useGetProfileMutation,
 useAddPostMutation,
 useGetPostsMutation,
 useAddVideoMutation,
 useGetVideosMutation
} = trainerApiSlice;
