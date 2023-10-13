import React from "react";
import UserNavbar from "./components/UserNavbar";
import UserBody from "./components/UserBody";
import WorkoutCard from "./components/WorkoutCard";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="app bg-black flex flex-col h-screen">
      <UserNavbar />
      <UserBody />
      <div className="flex flex-wrap justify-center p-4 bg-black">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 mt-14">
          <WorkoutCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4  mt-14">
          <WorkoutCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 mt-14">
          <WorkoutCard />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 mt-14">
          <WorkoutCard />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
