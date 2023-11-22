import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,

  } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const WorkoutCard = ({key,image, dietType, category,trainer ,description}) => {
    return (
         
        <Card key={key} className="max-w-[20rem] overflow-hidden mt-1 m-2  bg-black">
          <Link to={'/diets'}>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0"
          >
            <img
              src={image}
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
           { category}
            </Typography>
            <Typography variant="h5" color="blue-gray">
           { dietType}
            </Typography>
            <Typography variant="lead" color="gray" className="mt-3 font-normal">
              Click Here to view all the diets...
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <Typography className="font-normal">{trainer}</Typography>
          </CardFooter>
          </Link>
        </Card>
      );
}

export default WorkoutCard
