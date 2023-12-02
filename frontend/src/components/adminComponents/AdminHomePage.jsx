import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {
  useGetSalesMutation,
  useGetCustomDateDataMutation,
} from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
function AdminHomePage() {
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [totalSale, setTotalSale] = useState();
  const [user, setUser] = useState(0);
  const [trainer, setTrainer] = useState(0);
  const [currentYearSales, setCurrentYearSales] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [customSales, setCustomSales] = useState(null);

  const [getSales] = useGetSalesMutation();
  const [getCustomSales] = useGetCustomDateDataMutation();

  useEffect(() => {
    fetchData();
  }, []);

  const handleGetSales = async () => {
    if(!startDate || !endDate){
      toast.error('enter valid date range')
      return;
    }
    if(startDate>endDate){
      toast.error('start date must be less than end date')
      return;
    }
    try {
      const customSales = await getCustomSales({ startDate, endDate }).unwrap();
      setCustomSales(customSales.customSales)
    } catch (error) {
      console.error("Error fetching custom sales data", error);
      toast.error("Error fetching custom sales data");
    }
  };

  const fetchData = async () => {
    try {
      const response = await getSales().unwrap();
      setSalesByMonth(response.result[0].monthlySales);
      setTotalSale(response.result[0].totalAllTimeSales);
      setCurrentYearSales(response.result[0].totalCurrentYearSales);
      setUser(response.noOfUsers);
      setTrainer(response.noOfTrainers);
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
        position: "top",
      },
    },
  };

  return (
    <section className="container h-fit overflow-y-hidden">
      <div className="flex justify-between p-10 flex-col md:flex-row  ">
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
      <div className="flex justify-between ml-14 mr-14 md:flex-row ">
        <div className="bg-blue-600 h-auto w-full md:w-full ml-3 mt-2 p-2 rounded-lg">
          <div className="card">
            <div className="card-content">
              <p className="card-title">Date Range</p>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-center">
                <div>
                  <label className="text-white">Start Date:</label>
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mb-4 p-2 w-full border rounded border-black"
                    type="date"
                    max={new Date().toISOString().split("T")[0]} 
                    required
                  />
                </div>
                <div>
                  <label className="text-white ">End Date:</label>
                  <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mb-4 p-2 w-full border rounded border-black"
                    type="date"
                    max={new Date().toISOString().split("T")[0]} // Set min date to today
                    required
                  />
                </div>
                <button
                  className="bg-blue-500 text-white p-2 rounded "
                  onClick={handleGetSales}
                >
                  Get Sales
                </button>
                {customSales && (
                  <div>
                    <input type="text" className="h-10 mt-1 rounded-lg text-center" value={ `₹ ${customSales}`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex px-12 h-96 md:justify-between mt-4">
        <div className="md:w-full md:p-5 lg:w-full ">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
}

export default AdminHomePage;
