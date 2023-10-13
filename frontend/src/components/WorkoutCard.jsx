import React from 'react'
import forearm from "../assets/best-forearm.jpg"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
  } from "@material-tailwind/react";

const WorkoutCard = () => {
    return (

        <Card className="max-w-[20rem] overflow-hidden mt-1 ">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src={forearm}
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
            Forearm Exercises to Do
            </Typography>
            <Typography variant="lead" color="gray" className="mt-3 font-normal">
              Because it&apos;s about motivating the doers. Because I&apos;m here to
              follow my dreams and inspire others.
            </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center -space-x-3">
              <Tooltip content="Natali Craig">
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="natali craig"
                  src={forearm}
                  className="border-2 border-white hover:z-10"
                />
              </Tooltip>
              <Tooltip content="Tania Andrew">
                <Avatar
                  size="sm"
                  variant="circular"
                  alt="tania andrew"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  className="border-2 border-white hover:z-10"
                />
              </Tooltip>
            </div>
            <Typography className="font-normal">January 10</Typography>
          </CardFooter>
        </Card>
      );
}

export default WorkoutCard
