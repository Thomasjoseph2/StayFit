import React, { useEffect, useState } from "react";
import {
  useAddLiveMutation,
  useGetLivesMutation,
  useDeleteLiveMutation,
} from "../../slices/trainerApiSlice";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListLives = () => {
  const { trainerInfo } = useSelector((state) => state.trainerAuth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [lives, setLives] = useState([]);
  const [refresher, setRefresher] = useState(false);

  const [addLive] = useAddLiveMutation();
  const [getLives] = useGetLivesMutation();
  const [deleteLive] = useDeleteLiveMutation();
  const navigate = useNavigate();
  useEffect(() => {
    fetchLives();
  }, [refresher]);

  const fetchLives = async () => {
    try {
      const trainerId = trainerInfo._id;
      const lives = await getLives(trainerId).unwrap();
      setLives(lives);
    } catch (error) {
      console.log(error);
      toast.error("cant fetch lives");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const randomId = await generateRandomId();
      const selectedDateTime = new Date(`${date}T${time}`);
      const currentDateTime = new Date();

      if (selectedDateTime < currentDateTime) {
        setError("Please select a future date and time.");
        return;
      }

      const live = {
        title,
        date,
        time,
        randomId,
        trainer: trainerInfo._id,
        trainerName: trainerInfo.name,
      };

      const response = await addLive({ live })
        .unwrap()
        .then(() => {
          setDate("");
          setTime("");
          setTitle("");
          handleCloseModal();
          setRefresher((prev) => !prev);
          toast.success("conference setted successfully");
        });
    } catch (error) {
      console.log(error, "conference page");
      toast.error("something went wrong");
    }
  };
  const generateRandomId = async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const idLength = 10;
    let randomId = "";
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
    return randomId;
  };
  const handleNavigate = (liveId) => {
    console.log("camehere", liveId);
    navigate(`/trainer/video-conference/${liveId}`);
  };

  const deleteLives = async (liveId) => {
    const trainerId = trainerInfo._id;
    await deleteLive({ trainerId, liveId })
      .unwrap()
      .then((response) => {
        setRefresher((prev) => !prev);
        toast.success(response.message);
      })
      .catch((err) => {
        console.log(err);
        toast.err("deletion failed");
      });
  };

  return (
    <>
      <div className="mt-20 mb-20 container ml-14 flex flex-wrap">
        <div>
          <button
            className="bg-blue-700 rounded p-2 mt-5 "
            onClick={handleOpenModal}
          >
            Add new Conference
          </button>
        </div>
        {lives.length === 0 ? (
          <div className="text-white text-center text-2xl w-full h-96 mt-10">
            You haven't uploaded any conferences.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-20">
            {lives.map((live) => (
              <div key={live._id} className="">
                <Card className="mt-6 w-80 mx-2 mb-2 ml-3">
                  <Button
                    onClick={() => deleteLives(live._id)}
                    className=" m-2 w-24  text-center bg-red-800 ml-auto mr-6"
                  >
                    delete
                  </Button>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {live.title}
                    </Typography>
                    <Typography>
                      Date: {new Date(live.date).toLocaleDateString()} Time:
                      {live.time}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    {live.expired === "true" ? (
                      <Button className="w-full bg-red-900">
                        Conference Expired
                      </Button>
                    ) : live.expired === "started" ? (
                      <Button
                        className="w-full bg-blue-600"
                        onClick={() => handleNavigate(live.randomId)}
                      >
                        Enter Conference
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => handleNavigate(live.randomId)}
                      >
                        Click Here to Join Conference
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add New conference</h2>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data bg-black "
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                className="mb-4 p-2 w-full border rounded border-black "
                rows="4"
                required
              />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Enter title..."
                className="mb-4 p-2 w-full border rounded border-black"
                type="date"
                min={new Date().toISOString().split("T")[0]} // Set min date to today
                required
              />
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter title..."
                className="mb-4 p-2 w-full border rounded border-black"
                type="time"
                min={new Date().toLocaleTimeString("en-US", { hour12: true })}
                required
              />

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-900 text-white hover:bg-red-500 px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCloseModal}
                  className="ml-2 text-gray-800 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListLives;
