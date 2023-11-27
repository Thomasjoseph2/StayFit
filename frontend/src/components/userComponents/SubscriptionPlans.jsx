import React, { useState, useEffect } from "react";
import { useGetUserPlansMutation } from "../../slices/usersApiSlice";
import { useCreateOrderMutation } from "../../slices/usersApiSlice";
import { useVerifyPaymentMutation } from "../../slices/usersApiSlice";
import { useCheckPlanStatusMutation } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../slices/authSlice";
import logo from "../../assets/fitnesss.png";
const SubscriptionPlans = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [plans, setPlans] = useState([]);
  const [price, setPrice] = useState("");
  const [plan, setPlan] = useState("");
  const [getPlans] = useGetUserPlansMutation();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [checkStatus] = useCheckPlanStatusMutation();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const response = await getPlans().unwrap();
      setPlans(response);

    } catch (error) {
      if (error.status === 401) {
        toast.error("you are not authorized to access the page");
        dispatch(logout());
        navigate("/login");
      }else{
        console.error(error);
        toast.error("Something went wrong");
      }

    }
  };

  const checkPlanStatus = async (plan) => {
    try {
      const planStatus = await checkStatus({ userId: userInfo._id }).unwrap();
      if (planStatus.status === false) {
        initiatePayment(plan);
      } else {
        toast.error("already a plan exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const verifypayment = async (response, planId, plan, price, duration) => {
    const result = await verifyPayment({
      ...response,
      plan,
      planId,
      price,
      duration,
      userId: userInfo._id,
      user_name: userInfo.name,
    }).unwrap();

    if (result.success === true) {
      toast.success(result.message);
      dispatch(setCredentials({ ...userInfo, subscription: result.user.subscription_status }));
      navigate("/profile");
    } else if (result.success === false) {
      toast.error(result.message);
    }
  };

  const initiatePayment = async (plan) => {
    try {
      const response = await createOrder({ price: plan.price }).unwrap();
      setPlan(plan);

      const options = {
        key: "rzp_test_4VSqO0TCBFvtCE",
        amount: price * 100,
        currency: "INR",
        name: "Stay fit",
        description: "Test Transaction",
        image: { logo },
        order_id: response.id,
        handler: (paymentResponse) =>
          verifypayment(
            paymentResponse,
            plan._id,
            plan.plan,
            plan.price,
            plan.duration
          ),
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on("payment.failed", function (response) {
        toast.error(response.error.description);
        toast.error(response.error.reason);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create order. Please try again later.");
    }
  };

  return (
    <div>
      <section className="bg-gray-900 dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-14 ">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-red-700 bg-opacity-75 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {plan.plan}
                </h3>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-4xl font-extrabold text-yellow-800">
                    ${plan.price}
                  </span>
                  <span className="text-white dark:text-gray-400">/month</span>
                </div>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  {plan.description}
                </p>

                <button
                  id="rzp-button1"
                  onClick={() => {
                    checkPlanStatus(plan);
                    // initiatePayment(plan);
                  }}
                  className="text-white bg-yellow-900 rounded mt-3"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;
