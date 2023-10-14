import { Link, useRouteError } from "react-router-dom";

const ErrorPage=()=>{
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div id="error-page">
          <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
          <p className="text-xl text-white">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-3xl text-white">
            {error.statusText || error.message}
          </p>
          <div className="mt-4"> 
            <Link
              to="/"
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage
