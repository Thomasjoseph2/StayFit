import { useEffect, useState } from "react";
import { useGetUserConferencesMutation } from "../../slices/usersApiSlice";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LiveList = () => {
  const [lives, setLives] = useState([]);
  const [getLives] = useGetUserConferencesMutation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLives();
  }, []);

  const fetchLives = async () => {
    try {
      const lives = await getLives().unwrap();
      setLives(lives);
      console.log(lives, "lives");
    } catch (error) {
      console.log(error);
      toast.error("Can't fetch lives");
    }
  };

  const handleNavigate = (liveId) => {
    navigate(`/user/video-conference/${liveId}`);
  };

  return (
    <>
      <div className="mt-20 mb-20  flex flex-wrap justify-center items-center">
        {lives?.length === 0 ? (
          <p className="text-white text-3xl h-screen justify-center items-center flex">No lives listed for you....</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-20">
            {lives.map((trainer) =>
              trainer.lives.map((live) => {
                const liveDateTime = new Date(live.date + " " + live.time);
                const isLiveExpired = liveDateTime < new Date();

                return (
                  <div key={live._id} className="">
                    <Card className="mt-6 w-80 mx-2 mb-2 ml-3">
                      <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                          {live.title}
                        </Typography>
                        <Typography>
                          Date: {new Date(live.date).toLocaleDateString()} Time:{" "}
                          {live.time}
                        </Typography>
                        <Typography>
                          Trainer: {trainer.trainerName}
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0">
                        {isLiveExpired ? (
                          <Button disabled className="w-full">
                            Expired
                          </Button>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => handleNavigate(live.randomId)}
                          >
                            Click Here to join conference
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LiveList;
