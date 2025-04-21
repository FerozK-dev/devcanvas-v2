import { Link } from "react-router-dom";

function AuthSide({link}) {

  return (
    <section className="py-10 md:py-16 w-1/5 sm:w-1/5 md:w-3/5">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="justify-items-center">
          <h2 className="font-normal text-white text-4xl md:text-7xl leading-none mb-4 md:mb-8 hidden md:block text-center">Welcome To DevCanvas</h2>
          {/* className="font-normal text-white text-4xl md:text-7xl leading-none mb-8" */}
          <h4 className="font-medium text-white text-lg md:text-4xl uppercase mb-4 md:mb-8 hidden md:block text-center">Build Your Dream Portfolio!</h4>

          <p className="font-normal text-white text-md md:text-xl mb-6 md:mb-16 hidden md:block text-center">Are you a passionate web developer but don't have time to build a portfolio website? Let us help you!</p>

          <Link to={link}>
            <button className="hidden md:block text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-7 py-3 md:px-9 md:py-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ease-linear duration-200"
            >
              {link === '/login' ? "Log in" : "Sign up"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AuthSide
