import React,{useState} from 'react';
import forearm from "../../assets/best-forearm.jpg";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

import { useGetTrainersMutation } from '../../slices/usersApiSlice';




const TrainerCard = () => {
    return (
        <Card className="max-w-[17rem]  overflow-hidden  m-2 bg-black  ">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none h-"
            >
                <img  
                    src={forearm}
                    alt="ui/ux review check"

                />
            </CardHeader>
            <CardBody>
                <Typography variant="h4" color="white">
                    Sreejith ks
                </Typography>
                <Typography variant="lead" color="white" className="mt-3 font-normal">
                    Level:level 3
                </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-center">
                <button className='px-4 py-2 bg-white text-black rounded-lg w-full'>View Profile</button>
            </CardFooter>
        </Card>
    );
};

export default TrainerCard;
