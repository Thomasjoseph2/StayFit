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
    deletePost: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/deletePost`,
        method: "POST",
        body: data,
      }),
    }),
    deleteVideo: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/deleteVideo`,
        method: "POST",
        body: data,
      }),
    }),
    addDiet: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/add-diet`,
        method: "POST",
        body: data,
      }),
    }),
    getDiets: builder.mutation({
      query: (trainerId) => ({
        url: `${TRAINER_URL}/get-diets/${trainerId}`, 
        method: "GET",
      }),
    }),
    deleteDiet: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/delete-diet`,
        method: "POST",
        body: data,
      }),
    }),
    addTrainerProfileImage: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/add-trainer-profile-image`,
        method: "POST",
        body: data,
      }),
    }),
    updateTrainerProfile: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/update-trainer-profile`,
        method: "POST",
        body: data,
      }),
    }),
    updateDiet: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/update-diet`,
        method: "POST",
        body: data,
      }),
    }),
    getTrainerRooms: builder.mutation({
      query: (trainerId) => ({
        url: `${TRAINER_URL}/get-trainer-rooms/${trainerId}`,
        method: "GET",
      }),
    }),
    getTrainerMessages: builder.mutation({
      query: (roomId) => ({
        url: `${TRAINER_URL}/get-room-messages/${roomId}`,
        method: "GET",
      }),
    }),
    sendTrainerMessage: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/send-message`,
        method: "POST",
        body: data,
      }),
    }),
    getTrainerIndividualRoom: builder.mutation({
      query: (data) => ({
        url: `${TRAINER_URL}/get-or-create-trainer-room`,
        method: "POST",
        body: data,
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
 useGetVideosMutation,
 useDeletePostMutation,
 useDeleteVideoMutation,
 useAddDietMutation,
 useGetDietsMutation,
 useDeleteDietMutation,
 useAddTrainerProfileImageMutation,
 useUpdateTrainerProfileMutation,
 useUpdateDietMutation,
 useGetTrainerRoomsMutation,
 useGetTrainerMessagesMutation,
 useSendTrainerMessageMutation,
 useGetTrainerIndividualRoomMutation

} = trainerApiSlice;
