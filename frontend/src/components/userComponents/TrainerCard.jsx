import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const TrainerCard = ({ trainer }) => {
  const navigate = useNavigate();

  const handleNavigateToTrainer = (trainerId) => {
    navigate(`/user-trainer-view/${trainerId}`);
  };

  return (
    <Card className="max-w-[17rem]  overflow-hidden  m-2 bg-black">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none h-"
      >
        <img src={trainer.imageUrl} alt="Trainer" />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="white">
          {trainer.firstName} {trainer.lastName}
        </Typography>
        <Typography variant="lead" color="white" className="mt-3 font-normal">
          Level: {trainer.qualifications}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-center">
        <button
          onClick={() => handleNavigateToTrainer(trainer._id)}
          className="px-4 py-2 bg-white text-black rounded-lg w-full"
        >
          {" "}
          View Profile
        </button>
      </CardFooter>
    </Card>
  );
};

export default TrainerCard;
