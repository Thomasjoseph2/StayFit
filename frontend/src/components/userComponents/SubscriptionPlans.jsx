import React, { useState, useEffect } from 'react';
import { useGetUserPlansMutation } from '../../slices/usersApiSlice';
import { useCreateOrderMutation } from '../../slices/usersApiSlice';
import { useVerifyPaymentMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [order,setOrder]=useState('')
  const [getPlans] = useGetUserPlansMutation();
  const [createOrder]=useCreateOrderMutation();
  const [verifyPayment]=useVerifyPaymentMutation();

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const response = await getPlans().unwrap();
      setPlans(response);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };
  const verifypayment =async (response) => {
   const result=await verifyPayment(response).unwrap()
  };
//   const handlePaymentSuccess = () => {
//     // Handle payment success, e.g., show a success message to the user
//     toast.success('Payment successful! Thank you for subscribing!');
//   };

//   const handlePaymentFailure = () => {
//     // Handle payment failure, e.g., show an error message to the user
//     toast.error('Payment failed. Please try again later.');
//   };
  const initiatePayment = async (price) => {
    console.log(price);
    try {
      const response = await createOrder({price:price}).unwrap();
      setOrder(response);
      const options = {
        key: "rzp_test_4VSqO0TCBFvtCE", 
        amount: order.amount, 
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler:verifypayment,
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    // rzp1.on('payment.failed', function (response){
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
    //         alert(response.error.reason);
    //         alert(response.error.metadata.order_id);
    //         alert(response.error.metadata.payment_id);
    // });
    
    } catch (error) {
      console.error(error);
      toast.error('Failed to create order. Please try again later.');
    }
  };



  return (
    <div>
      <section className="bg-gray-900 dark:bg-gray-900 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mt-14 " >
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-red-700 bg-opacity-75 rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white"
              >
                <h3 className="mb-4 text-2xl font-semibold text-white">{plan.plan}</h3>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-4xl font-extrabold text-yellow-800">${plan.price}</span>
                  <span className="text-white dark:text-gray-400">/month</span>
                </div>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{plan.description}</p>

                <button id="rzp-button1"  onClick={() => initiatePayment(plan.price)} className='text-white bg-yellow-900 rounded mt-3'>Subscribe</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPlans;
