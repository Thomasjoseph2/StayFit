import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useGetSalesMutation } from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { set } from "mongoose";
function AdminHomePage() {

  const [salesByMonth, setSalesByMonth] = useState([]);
  const [totalSale, setTotalSale] = useState();
  const [user, setUser] = useState(0);
  const [getSales]=useGetSalesMutation()
  const [trainer,setTrainer]=useState(0)
  const [currentYearSales,setCurrentYearSales]=useState(0)

  useEffect(()=>{
     fetchData();
  },[])

  const fetchData = async () => {
    try {
      const response = await getSales().unwrap();
      console.log(response);
      setSalesByMonth(response.result[0].monthlySales);
      setTotalSale(response.result[0].totalAllTimeSales)
      setCurrentYearSales(response.result[0].totalCurrentYearSales)
      setUser(response.noOfUsers)
      setTrainer(response.noOfTrainers)
     
    } catch (error) {
      console.error("Error fetching sales data", error);
      toast.error("Error fetching sales data");
    }
  };

  Chart.register(CategoryScale);


  const data = {
    labels: salesByMonth.map((item) => item._id.month),
    datasets: [
      {
        label: "Monthly Sales",
        data: salesByMonth.map((item) => item.totalMonthlySales),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <section className="container h-fit overflow-y-hidden">
      <div className="flex justify-between p-16 flex-col md:flex-row  ">
        <div className="bg-blue-600 h-16 lg:h-24 md:h-24 w-full ml-3 rounded-lg mt-2 p-3">
          <div className="card w-full ">
            <div className="card-content">
              <p className="card-title">Total Users</p>
              <p className="card-para">{user}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 h-16 lg:h-24 w-full ml-3 md:h-24 rounded-lg mt-2 p-3">
          <div className="card">
            <div className="card-content">
              <p className="card-title">Total Trainers</p>
              <p className="card-para">{trainer}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 h-16 lg:h-24 w-full ml-3 md:h-24 rounded-lg mt-2 p-3">
          <div className="card">
            <div className="card-content">
              <p className="card-title">Total Sales</p>
              <p className="card-para">₹ {totalSale}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 h-16 lg:h-24 w-full ml-3 md:h-24 rounded-lg mt-2 p-3">
          <div className="card">
            <div className="card-content">
              <p className="card-title">Current year Sales</p>
              <p className="card-para">₹{currentYearSales}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex  px-12 h-96 md:justify-between ">
        <div className="md:w-full md:p-5 lg:w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
}

export default AdminHomePage;
